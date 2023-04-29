import { FC, useState, useEffect, FormEvent, Children } from "react";
import axios from "axios";

import { CardComment, CardParticipant } from "../components/Cards";
import Layout from "../components/Layout";
import { Spinner } from "../components/Loading";
import Swal from "../utils/swal";
import { ModalPayment, InputPayment, RadioBank } from "../components/Modals";
import withReactContent from "sweetalert2-react-content";

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
  comment: string;
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

  return (
    <Layout>
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
            {/* action button */}

            <div
              data-theme="mytheme"
              className="bg-inherit card-actions justify-end"
            >
              <button className="btn btn-primary w-32 tracking-wider text-white">
                Bayar
              </button>
              <button className="btn btn-outline w-32 btn-primary tracking-wider text-white">
                Invoice
              </button>
            </div>
          </div>
        </div>
        {/* Transaction section */}

        <div className="w-[80%] h-[90%] p-5 gap-2 flex flex-col justify-center items-center border-2 border-[#427385] rounded-2xl">
          <p className="font-['Lexend_Deca'] text-lg text-white">
            Detail Transaksi
          </p>
          <div className="w-[60%] h-full flex items-center bg-[#224957] p-5 rounded-2xl text-white">
            <table className="border-collapse w-full">
              <tbody>
                <tr className="border-slate-600 border">
                  <td className="w-[20%] p-2">Date</td>
                  <td className="">: </td>
                </tr>
                <tr className="border-slate-600 border">
                  <td className="w-[20%] p-2">Event</td>
                  <td className="">: </td>
                </tr>
                <tr className="border-slate-600 border">
                  <td className="w-[20%] p-2">Pemesan</td>
                  <td className="">: </td>
                </tr>
                <tr className="border-slate-600 border">
                  <td className="w-[20%] p-2">Status</td>
                  <td className="">: </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="font-['Lexend_Deca'] text-lg text-white">
            Detail Tiket
          </p>
          <div className="w-[60%] h-full flex items-center bg-[#224957] p-5 rounded-2xl text-white">
            <table className="border-collapse w-full">
              <tbody>
                <tr className="border-slate-600 border">
                  <td className="w-[20%] p-2">Jumlah Tiket 1</td>
                  <td className="">: </td>
                </tr>
                <tr className="border-slate-600 border">
                  <td className="w-[20%] p-2">Jumlah Tiket 2</td>
                  <td className="">: </td>
                </tr>
                <tr className="border-slate-600 border">
                  <td className="w-[20%] p-2">Jumlah dibayar</td>
                  <td className="">: </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailEvent;
