import { FC, useState, useEffect, FormEvent, Children } from "react";
import axios from "axios";

import { CardComment, CardParticipant } from "../components/Cards";
import Layout from "../components/Layout";
import { Spinner } from "../components/Loading";
import Swal from "../utils/swal";
import { ModalPayment, InputPayment, RadioBank } from "../components/Modals";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

interface DetailCapType {
  name: string;
  date: string;
  host_name: string;
  is_paid: boolean;
  quota: number;
  location: string;
  details: string;
}

interface DetailParticipantsType {
  id: number;
  user_name: string;
  pictures: string;
}

interface DetailTicketType {
  quota: number;
  price: string;
  ticket_name: string;
}

interface DetailCommentType {
  comment: string;
  id: number;
  pictures: string;
  user_name: string;
}

interface objPostType {
  comment?: string;
  id: number;
}

interface objReservType {
  id: number;
  phone: string;
}

const DetailEvent: FC = () => {
  const MySwal = withReactContent(Swal);

  const [datas, setDatas] = useState<Partial<DetailCapType>>({});
  const [participant, setParticipant] = useState<DetailParticipantsType[]>([]);
  const [ticket, setTicket] = useState<Partial<DetailTicketType[]>>([]);
  const [getComment, setGetComment] = useState<DetailCommentType[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [payIsDisabled, setpayIsDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [isHosted, setIsHosted] = useState<boolean>(false);
  const navigate = useNavigate();

  const [objPost, setObjPost] = useState<objPostType>({
    comment: "",
    id: 0,
  });

  const [objReserv, setObjReserv] = useState<objReservType>({
    phone: "",
    id: 0,
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
    //fetch untuk param, untuk tau id event
    await axios
      .get(
        "https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/events/2"
      )
      .then((response) => {
        const { data } = response.data;
        const { participants, tickets, comments } = data;
        setDatas(data);
        setParticipant(participants);
        setTicket(tickets);
        setGetComment(comments);

        console.log(datas);
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
      .post(
        "https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/comments",
        objPost
      )
      .then((response) => {
        const { data, message } = response.data;
        console.log(objPost);
        MySwal.fire({
          title: "Success",
          text: message,
          icon: "success",
          showCancelButton: false,
        }).then((result) => {});
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
        objReserv
      )
      .then((response) => {
        const { data, message } = response.data;
        console.log(objReserv);
        MySwal.fire({
          title: "Success",
          text: message,
          icon: "success",
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/event/params/payment");
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
                    name="Ticket Name"
                    id={`input-ticket-quota ${idx}`}
                    defaultValue={0}
                    placeholder="jumlah tiket yang anda inginkan"
                  />
                );
              })}
              <InputPayment
                name="Nomer Telepon"
                id="input-ticket-validation-number"
                type="number"
                placeholder="+62 ..."
                onChange={(event) =>
                  setObjReserv({ ...objReserv, phone: event.target.value })
                }
              />
            </div>
            <p className="px-4 mt-3">Metode Pembayaran</p>
            <div className="grid grid-cols-2 gap-3 px-4">
              <RadioBank id="bca" />
              <RadioBank id="bri" />
              <RadioBank id="mandiri" />
              <RadioBank id="bni" />
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
            {isHosted ? (
              <div
                data-theme="mytheme"
                className="bg-inherit card-actions justify-end"
              >
                <button className="btn btn-outline w-32 btn-primary tracking-wider text-white">
                  Delete
                </button>
                <button className="btn btn-primary w-32 tracking-wider text-white">
                  Edit
                </button>
                <button className="btn btn-primary w-32 tracking-wider text-white">
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
              onSubmit={(event) => handlePost(event)}
            >
              <textarea
                placeholder="Comment here"
                className="textarea textarea-bordered bg-inherit w-full "
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
