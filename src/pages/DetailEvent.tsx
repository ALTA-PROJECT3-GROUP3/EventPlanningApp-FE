import { FC, useState, useEffect, FormEvent, Children } from "react";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import { CardComment, CardParticipant } from "../components/Cards";
import Layout from "../components/Layout";
import { Spinner } from "../components/Loading";
import Swal from "../utils/swal";
import {
  ModalPayment,
  InputPayment,
  AlterRadioBank,
} from "../components/Modals";
import {
  DetailCapType,
  DetailCommentType,
  DetailParticipantsType,
  DetailTicketType,
  objPostType,
  objReservType,
  objTicketType,
} from "../utils/types/detailEventType";

const DetailEvent: FC = () => {
  const [participant, setParticipant] = useState<DetailParticipantsType[]>([]);
  const [objTickets, setObjTickets] = useState<Partial<objTicketType[]>>([]);
  const [ticket, setTicket] = useState<Partial<DetailTicketType[]>>([]);
  const [getComment, setGetComment] = useState<DetailCommentType[]>([]);
  const [payIsDisabled, setpayIsDisabled] = useState<boolean>(false);
  const [datas, setDatas] = useState<Partial<DetailCapType>>({});
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const params = useParams();

  const [cookie] = useCookies(["token", "uname"]);
  const { event_id, host } = params;
  const [objReserv, setObjReserv] = useState<objReservType>({
    event_id: Number(event_id),
    phone_number: "",
    payment_method: "",
    bank: "",
    tickets: [],
  });
  const [objPost, setObjPost] = useState<objPostType>({
    comment: "",
    event_id: Number(event_id),
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const isEmpty = Object.values(objPost).every((val) => val !== "");
    setIsDisabled(!isEmpty);
  }, [objPost]);

  useEffect(() => {
    const isEmpty = Object.values(objReserv).every((val) => val !== "");
    setpayIsDisabled(!isEmpty);
  }, [objReserv]);

  async function fetchData() {
    await axios
      .get(
        `https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/events/${event_id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((response) => {
        const { data } = response.data;
        const { participants, tickets, comments } = data;
        setDatas(data);
        setParticipant(participants);
        setTicket(tickets);
        setGetComment(comments);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  const toFormatedDate = (unformated: any) => {
    const dated = new Date(unformated);
    const formatedDate = dated.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatedDate;
  };

  function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDisabled(true);
    axios
      .post("https://hobelcyatramandiri.my.id/comments", objPost, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((response) => {
        const { data, message } = response.data;
        console.log(objPost);
        MySwal.fire({
          title: "Success",
          text: message,
          icon: "success",
          showCancelButton: false,
        }).then((result) => {
          setObjPost({
            comment: "",
            event_id: Number(event_id),
          });
          fetchData();
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
          icon: "error",
        });
      })
      .finally(() => setIsDisabled(false));
  }

  function handleReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setpayIsDisabled(true);
    axios
      .post(
        "https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/reservations",
        objReserv,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((response) => {
        const { data, message } = response.data;
        MySwal.fire({
          title: "Success",
          text: message,
          icon: "success",
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/event/${event_id}/payment`);
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
          icon: "error",
        });
      })
      .finally(() => setpayIsDisabled(false));
  }

  const radioChangeHandler = (e: any) => {
    setObjReserv({
      ...objReserv,
      bank: e.target.value,
    });
  };

  function onChanged(event: any, index: any, num?: number) {
    const newValues = [...objTickets];
    newValues[index] = {
      ticket_id: num,
      quantity: Number(event.target.value),
      ticket_name: event.target.name,
    };
    setObjTickets(newValues);
    setObjReserv({
      ...objReserv,
      tickets: objTickets,
    });
  }

  const handleDeleteEvent = () => {
    MySwal.fire({
      title: "Delete Event",
      text: "Are you sure?",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://hobelcyatramandiri.my.id/events/${event_id}`, {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          })
          .then((response) => {
            const { message } = response.data;
            navigate(`/u/${cookie.uname}`);
          })
          .catch((error) => {
            const { data } = error.response;
            MySwal.fire({
              title: "Failed",
              text: data.message,
              showCancelButton: false,
              icon: "error",
            });
          });
      }
    });
  };

  const handleStart = () => {
    MySwal.fire({
      title: "Start Event?",
      text: "Are you sure?",
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsStarted(true);
      }
    });
  };

  return (
    <Layout>
      <ModalPayment>
        <div className="flex flex-col items-center gap-3">
          <p className="text-xl font-bold">PESAN TIKET</p>
          <p className="text-lg font-semibold">{datas.name}</p>
          <form
            className="w-full h-full flex flex-col gap-3"
            onSubmit={(event) => handleReservation(event)}
          >
            <div className="grid grid-cols-1 gap-3 px-4">
              {ticket.map((t, idx) => {
                return (
                  <InputPayment
                    key={idx}
                    name="Ticket Name"
                    defaultValue={0}
                    id={`input-ticket-quota ${idx}`}
                    placeholder="jumlah tiket yang anda inginkan"
                    onChange={(event) => {
                      onChanged(event, idx, t?.ticket_id);
                    }}
                    onBlur={(event) => {
                      onChanged(event, idx, t?.ticket_id);
                    }}
                  />
                );
              })}
              <InputPayment
                name="Nomer Telepon"
                id="input-ticket-validation-number"
                type="number"
                placeholder="+62 ..."
                onChange={(event) =>
                  setObjReserv({
                    ...objReserv,
                    phone_number: event.target.value,
                    payment_method: "bank_transfer",
                  })
                }
              />
            </div>

            <p className="px-4 mt-3">Metode Pembayaran</p>
            <div className="grid grid-cols-2 gap-3 px-4">
              <AlterRadioBank
                changed={radioChangeHandler}
                id="1"
                isSelected={objReserv.bank === "bca"}
                label="bca"
                value="bca"
                key="bca"
              />

              <AlterRadioBank
                changed={radioChangeHandler}
                id="2"
                isSelected={objReserv.bank === "bri"}
                label="bri"
                value="bri"
                key="bri"
              />
              <AlterRadioBank
                changed={radioChangeHandler}
                id="3"
                isSelected={objReserv.bank === "mandiri"}
                label="mandiri"
                value="mandiri"
                key="mandiri"
              />
              <AlterRadioBank
                changed={radioChangeHandler}
                id="4"
                isSelected={objReserv.bank === "bni"}
                label="bni"
                value="bni"
                key="bni"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-32 mx-auto mt-4 tracking-wider text-white"
              disabled={payIsDisabled}
            >
              PAYMENT
            </button>
          </form>
        </div>
      </ModalPayment>
      {/* ^^ -- modal -- ^^ */}
      <div className="max-h-fit gap-4 py-12 flex flex-col items-center w-full">
        <div className=" w-[80%] h-[90%] items-start ">
          <p className="font-['Lexend_Deca'] text-2xl text-white">
            {datas.name}
          </p>
          <p className="font-['Lexend_Deca'] text-md text-white">
            Hosted By: {datas.host_name}
          </p>
        </div>
        {/* Image & handle*/}
        <div className="w-[80%] h-[90%] p-5 gap-6 flex flex-col justify-center items-center border-2 border-[#427385] rounded-2xl">
          <div className="w-full h-full flex gap-8">
            <div className="w-[48%] bg-slate-200 rounded-2xl flex justify-center">
              <img
                className="w-[80%] h-auto aspect-square"
                src="/defaultImg.png"
                alt={`image ${datas.name}`}
              />
            </div>
            <div className="w-[50%]">
              <table className="border-collapse w-full">
                <tbody>
                  <tr>
                    <td className=" w-[20%]">Date</td>
                    <td className="">: {toFormatedDate(datas.date)}</td>
                  </tr>
                  <tr>
                    <td className=" w-[20%]">Location</td>
                    <td className="">: {datas.location}</td>
                  </tr>
                  <tr>
                    <td className=" w-[20%]">Quota</td>
                    <td className="">
                      : {participant.length} from {datas.quota} Attendees
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <table className="border-collapse w-full ">
                <p>Ticket</p>
                <tbody>
                  {ticket.map((t, idx) => {
                    return (
                      <tr>
                        <td className=" w-[20%]">{t?.ticket_name}</td>
                        <td className="">: Rp. {t?.price},-</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* detail & participants*/}
          <div className="w-full h-full ">
            <p className="font-['Lexend_Deca'] text-lg text-white">
              Description
            </p>
            <hr className="w-[40%] h-0.5 my-1 bg-[#20DF7F] border-0 rounded " />
            <p>{datas.details}</p>
          </div>
          <div className="w-full h-full ">
            <p className="font-['Lexend_Deca'] text-lg text-white">
              Participants
            </p>
            <hr className="w-[40%] h-0.5 my-1 bg-[#20DF7F] border-0 rounded " />
            <div className="w-full mt-2 grid gap-3 grid-cols-5 overflow-auto">
              {loading ? (
                <Spinner />
              ) : (
                participant.map((parti, idx) => {
                  return (
                    <CardParticipant
                      key={parti.id}
                      pictures={parti.pictures}
                      user_name={parti.user_name}
                    />
                  );
                })
              )}
            </div>
            {/* action button */}
            {host === "host" ? (
              <div
                data-theme="mytheme"
                className="bg-inherit card-actions justify-end"
              >
                <button
                  className="btn btn-outline w-32 btn-primary tracking-wider text-white"
                  onClick={() => {
                    handleDeleteEvent();
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary w-32 tracking-wider text-white"
                  onClick={() => {
                    navigate(`/u/${cookie.uname}/${event_id}/edit`);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleStart();
                  }}
                  disabled={isStarted}
                  className="btn btn-primary w-32 tracking-wider text-white"
                >
                  Start
                </button>
              </div>
            ) : (
              <div
                data-theme="mytheme"
                className="bg-inherit card-actions justify-end"
              >
                <label
                  htmlFor="my-modal-payment"
                  className="btn btn-primary w-32 tracking-wider  text-white"
                >
                  Join Event
                </label>
              </div>
            )}
          </div>
        </div>
        {/* Comment section */}
        <div className="w-[80%] h-[90%] p-5 gap-6 flex flex-col justify-center items-center border-2 border-[#427385] rounded-2xl">
          <div className="w-full h-full ">
            <p className="font-['Lexend_Deca'] text-lg text-white">
              Comment Section
            </p>
            <hr className="w-[40%] h-0.5 my-1 bg-[#20DF7F] border-0 rounded " />
            <form
              data-theme="mytheme"
              className="bg-inherit flex flex-col gap-3 mt-3"
              onSubmit={(event) => {
                handlePost(event);
              }}
            >
              <textarea
                placeholder="Comment here"
                className="textarea textarea-bordered bg-inherit w-full "
                value={objPost.comment}
                onChange={(event) =>
                  setObjPost({ ...objPost, comment: event.target.value })
                }
              />
              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary w-32 tracking-wider text-white"
                  disabled={isDisabled}
                >
                  Post
                </button>
              </div>
            </form>
          </div>
          {/* Comment get */}
          <hr className="w-[40%] h-px my-1 bg-[#20DF7F] border-0 rounded " />
          <div className="w-full grid grid-cols-1 overflow-auto">
            {loading ? (
              <Spinner />
            ) : (
              getComment.map((com, idx) => {
                return (
                  <CardComment
                    key={com.id}
                    pictures={com.pictures}
                    user_name={com.user_name}
                    comment={com.comment}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailEvent;
