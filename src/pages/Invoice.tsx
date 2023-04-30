import { FC, useState, useEffect, FormEvent, Children, useRef } from "react";
import withReactContent from "sweetalert2-react-content";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";
import axios from "axios";

import Layout from "../components/Layout";
import { Spinner } from "../components/Loading";
import Swal from "../utils/swal";

interface DetailPaymentType {
  invoice_date: string;
  event_name: string;
  host_name: string;
  status: string;
  total_price: number;
  va_number: string;
}

interface DetailTicketType {
  quantity: number;
  price: string;
  ticket_name: string;
}

const DetailEvent: FC = () => {
  const [payment, setPayment] = useState<Partial<DetailPaymentType>>({});
  const [ticket, setTicket] = useState<Partial<DetailTicketType[]>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const MySwal = withReactContent(Swal);
  const conponentPDF = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    //fetch untuk param, untuk tau id event username
    await axios
      .get(
        "https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/payment/1"
      )
      .then((response) => {
        const { data } = response.data;
        const { tickets } = data;
        setPayment(data);
        setTicket(tickets);
        // console.log(payment);
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
          className=" bg-inherit w-[70%] h-[90%] items-center justify-between flex "
        >
          <p className="font-['Lexend_Deca'] text-2xl text-white">INVOICE</p>
          <button
            onClick={generatePDF}
            className="btn w-32 btn-primary tracking-wider text-white"
          >
            <FaPrint />
            &nbsp; Print
          </button>
        </div>
        <div className="w-[70%] h-[90%] p-5   flex justify-center border-2 border-[#427385] rounded-2xl">
          <div
            ref={conponentPDF}
            className="bg-white w-full flex-col gap-2 p-5 flex items-center rounded-xl"
          >
            <p className="font-['Lexend_Deca'] text-xl  text-slate-800">
              Detail Transaksi
            </p>
            <hr />
            <p className="font-['Lexend_Deca'] text-lg text-slate-800 self-start">
              Detail Event
            </p>

            <table className="border-collapse w-full text-slate-800">
              <tbody>
                <tr className="border-slate-600 border">
                  <td className="w-[25%] p-2">Date</td>
                  <td className="">: {payment.invoice_date}</td>
                </tr>
                <tr className="border-slate-600 border">
                  <td className="w-[25%] p-2">Event</td>
                  <td className="">: {payment.event_name}</td>
                </tr>
                <tr className="border-slate-600 border">
                  <td className="w-[25%] p-2">Pemesan</td>
                  <td className="">: {}</td>
                </tr>
                <tr className="border-slate-600 border">
                  <td className="w-[25%] p-2">Status</td>
                  <td className="">: {payment.status}</td>
                </tr>
              </tbody>
            </table>

            <p className="font-['Lexend_Deca'] text-lg text-slate-800 self-start">
              Detail Tiket
            </p>

            <table className="border-collapse w-full text-slate-800">
              <tbody>
                {ticket.map((t, idx) => {
                  return (
                    <tr className="border-slate-600 border">
                      <td className="w-[25%] p-2">Tiket {t?.ticket_name}</td>
                      <td className="">: {t?.quantity} tiket</td>
                    </tr>
                  );
                })}
                <tr className="border-slate-600 border">
                  <td className="w-[25%] p-2">Jumlah dibayar</td>
                  <td className="">
                    : Rp{payment.total_price?.toLocaleString(["ban", "id"])},-{" "}
                  </td>
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
