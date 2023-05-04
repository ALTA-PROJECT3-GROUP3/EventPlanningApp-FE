import { FC, useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { useCookies } from "react-cookie";
import axios from "axios";

import image from "/defaultImg.png";
import Layout from "../components/Layout";
import Swal from "../utils/swal";

interface EventType {
  name: string;
  host_name: string;
  description: string;
  date: string;
  location: string;
  is_paid: boolean;
  pictures: any;
  attendes_quota: string;
}

interface TicketType {
  Name: string;
  Quota: number;
  Price: number;
  EventID: number;
}

const EditEvent = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<EventType>>({});
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hostName, setHostName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [pictures, setPictures] = useState<string>("");
  const [quota, setQuota] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [cookie] = useCookies(["uname", "token"]);
  const MySwal = withReactContent(Swal);
  const usernamed = cookie.uname;
  const getToken = cookie.token;
  const { event_id } = useParams();
  const navigate = useNavigate();

  const [objTicket, setObjTicket] = useState<Partial<TicketType>>({
    Name: "",
    Quota: 0,
    Price: 0,
    EventID: Number(event_id),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get(`https://hobelcyatramandiri.my.id/events/${event_id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setDate(data.date);
        setName(data.name);
        setPictures(data.pictures);
        setLocation(data.location);
        setHostName(data.host_name);
        setDescription(data.description);
        setQuota(data.attendes_quota);
      })
      .catch((err) => {
        const { data } = err.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    axios
      .put(`https://hobelcyatramandiri.my.id/events/${event_id}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        setObjSubmit({});
        navigate(`/u/${usernamed}`);
      })
      .catch((err) => {
        const { data } = err.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleTicket = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const formData: any = new FormData();
    let key: keyof typeof objTicket;
    for (key in objTicket) {
      formData.append(key, objTicket[key]);
    }

    console.log(objTicket);
    axios
      .post("https://hobelcyatramandiri.my.id/tickets", formData, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        setObjSubmit({});
        navigate(`/u/${usernamed}`);
      })
      .catch((err) => {
        const { data } = err.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (value: string | File, key: keyof typeof objSubmit) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const handleChangeTicket = (value: string, key: keyof typeof objTicket) => {
    let temp: any = { ...objTicket };
    temp[key] = value;
    setObjTicket(temp);
  };

  return (
    <Layout>
      <h1 className="w-[80%] text-3xl font-extrabold text-[#20df7f] mt-10 mb-4">
        Edit Event
      </h1>

      <div className="mb-12 flex border-4 border-[#427385] rounded-xl w-4/5 h-full">
        <div className="flex-none bg-[#427385] w-64 h-64 ms-12 mt-12">
          <figure>
            <img src={pictures} alt={pictures} className="w-64 h-64" />
          </figure>
          <input
            form="My-event"
            type="file"
            className="file-input w-[16.6rem] bg-[#224957] text-white mt-5"
            onChange={(e) => {
              if (!e.currentTarget.files) {
                return;
              }
              setPictures(URL.createObjectURL(e.currentTarget.files[0]));
              handleChange(e.currentTarget.files[0], "pictures");
            }}
          />
        </div>
        <div className="grow h-full w-[60%] mt-12">
          <form
            id="My-event"
            className="flex flex-col justify-center items-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col w-11/12 gap-5">
              <input
                type="text"
                placeholder="Event Name"
                className="input w-full text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChange(e.target.value, "name")}
                defaultValue={name}
              />
              <input
                type="text"
                placeholder="Hosted Name"
                className="input w-full text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChange(e.target.value, "host_name")}
                defaultValue={hostName}
              />
              <input
                type="text"
                placeholder="Date"
                className="input w-full text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChange(e.target.value, "date")}
                defaultValue={date}
              />
              <input
                type="text"
                placeholder="Location"
                className="input w-full text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChange(e.target.value, "location")}
                defaultValue={location}
              />
              <input
                type="text"
                placeholder="Attandees Quota"
                className="input w-full text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChange(e.target.value, "attendes_quota")}
                defaultValue={quota}
              />
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered textarea-lg w-full text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChange(e.target.value, "description")}
                defaultValue={description}
              ></textarea>
            </div>
            <button
              id="btn-submit"
              type="submit"
              className="ms-[79%] w-[13%] py-5 my-12 tracking-wide text-white transition-colors duration-200 transform bg-green-600 disabled:bg-green-900 rounded-xl shadow-2xl hover:bg-green-800 focus:outline-none focus:bg-black-600 text-xl"
              disabled={loading}
            >
              Save
            </button>
          </form>
          <h1 className="text-2xl font-extrabold text-[#20df7f] ml-11 mt-6 mb-4 w-11/12">
            Add Ticket
          </h1>
          <form
            onSubmit={(e) => handleTicket(e)}
            className="flex flex-col justify-center items-center mb-16"
          >
            <div className="flex w-11/12 gap-5">
              <input
                type="text"
                placeholder="Ticket name"
                className="input flex-none w-[40%] h-14 text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChangeTicket(e.target.value, "Name")}
              />
              <input
                type="text"
                placeholder="Quota"
                className="input shrink w-[20%] h-14 text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChangeTicket(e.target.value, "Quota")}
              />
              <input
                type="text"
                placeholder="Price"
                className="input flex-none w-[30%] h-14 text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChangeTicket(e.target.value, "Price")}
              />
              <button
                id="btn-submit-ticket"
                type="submit"
                className="input flex-none w-[10%] h-14 tracking-wide text-white text-xl font-bold transition-colors duration-200 transform bg-[#f46953] rounded-xl shadow-xl hover:bg-red-500 focus:outline-none focus:bg-black-600"
              >
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditEvent;
