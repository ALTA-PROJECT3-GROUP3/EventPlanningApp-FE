import { FC, useState, useEffect, FormEvent, Children, useRef } from "react";
import axios from "axios";

import { CardComment, CardParticipant } from "../components/Cards";
import Layout from "../components/Layout";
import { Spinner } from "../components/Loading";
import Swal from "../utils/swal";
import { ModalPayment, InputPayment, RadioBank } from "../components/Modals";
import withReactContent from "sweetalert2-react-content";

import { useReactToPrint } from "react-to-print";

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

  const conponentPDF = useRef(null);

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

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Invoice",
  });

  return (
    <Layout>
      <div className="max-h-fit gap-4 py-12 flex flex-col items-center w-full">
        {/* Transaction section */}
        <div
          data-theme="mytheme"
          className=" bg-inherit w-[80%] h-[90%] items-center justify-between flex "
        >
          <p className="font-['Lexend_Deca'] text-2xl text-white">INVOICE</p>
          <button
            onClick={generatePDF}
            className="btn w-32 btn-primary tracking-wider text-white"
          >
            Print
          </button>
        </div>
        <div className="w-[80%] h-[90%] p-5 gap-2 flex flex-col justify-center items-center border-2 border-[#427385] rounded-2xl">
          <p className="font-['Lexend_Deca'] text-lg text-white">
            Detail Transaksi
          </p>
          <div
            ref={conponentPDF}
            className="w-[60%] h-full flex items-center bg-[#224957] p-5 rounded-2xl text-white"
          >
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
