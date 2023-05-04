import { FC, useState, useEffect, FormEvent, Children } from "react";
import axios from "axios";

import { TabelTransaksi } from "../components/Cards";
import Layout from "../components/Layout";
import { Spinner } from "../components/Loading";
import Swal from "../utils/swal";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, useParams } from "react-router-dom";

interface DetailCapType {
  name: string;
  date: string;
  host_name: string;
  is_paid: boolean;
  quota: number;
  location: string;
  details: string;
  participants?: Array<DetailParticipantsType>;
}

interface DetailTicketType {
  quantity: number;
  quota: number;
  price: string;
  ticket_name: string;
}

interface DetailPaymentType {
  invoice_date: string;
  event_name: string;
  host_name: string;
  status: string;
  total_price: number;
  va_number: string;
}

interface DetailParticipantsType {
  id: number;
  user_name: string;
  pictures: string;
}

const DetailTransaksi: FC = () => {
  const MySwal = withReactContent(Swal);

  const [datas, setDatas] = useState<Partial<DetailCapType>>({});
  const [ticket, setTicket] = useState<Partial<DetailTicketType[]>>([]);
  const [payment, setPayment] = useState<Partial<DetailPaymentType>>({});
  const [getTicket, setGetTicket] = useState<Partial<DetailTicketType[]>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const navigate = useNavigate();
  const { event_id } = params;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await axios
      .get(
        `https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/events/${event_id}`
      )
      .then((response) => {
        const { data } = response.data;
        const { tickets } = data;
        setDatas(data);
        setTicket(tickets);

        // console.log(datas.participants);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => setLoading(false));

    await axios
      .get(
        `https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/payment/${event_id}`
      )
      .then((response) => {
        const { data } = response.data;
        const { tickets } = data;
        setPayment(data);
        setGetTicket(tickets);
        // console.log(data);
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
                      : {datas.participants?.length} from {datas.quota}{" "}
                      Attendees
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
              <button
                onClick={() => {
                  navigate(`/event/${event_id}/payment/invoice`);
                }}
                className="btn btn-outline w-32 btn-primary tracking-wider text-white"
              >
                Invoice
              </button>
            </div>
          </div>
        </div>
        {/* Transaction section */}

        <div className="w-[80%] h-[90%] p-5 gap-4 flex flex-col justify-center items-center border-2 border-[#427385] rounded-2xl">
          <p className="font-['Lexend_Deca'] text-lg text-white">
            Detail Transaksi
          </p>
          <TabelTransaksi name="Tanggal" data={payment.invoice_date} />
          <TabelTransaksi name="Event" data={payment.event_name} />
          <TabelTransaksi name="Pemesan" data={""} />
          <TabelTransaksi name="Status" data={payment.status} />
          <p className="font-['Lexend_Deca'] text-lg text-white">Tiket</p>
          {getTicket.map((t, idx) => {
            return (
              <TabelTransaksi
                name={`Tiket ${t?.ticket_name}`}
                data={`${t?.quantity} tiket`}
              />
            );
          })}
          <TabelTransaksi
            name="Jumlah dibayar"
            data={`Rp${payment.total_price?.toLocaleString(["ban", "id"])},-`}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DetailTransaksi;
