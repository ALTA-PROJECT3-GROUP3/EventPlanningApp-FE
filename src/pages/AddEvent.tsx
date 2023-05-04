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
  quota: string;
}

const AddEvent: FC = () => {
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
  const { username } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    console.log(formData);
    axios
      .post("https://hobelcyatramandiri.my.id/events", formData, {
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

  return (
    <Layout>
      <h1 className="w-[80%] text-3xl font-extrabold text-[#20df7f] mt-10 mb-4">
        Add Event
      </h1>

      <div className="mb-12 flex border-4 border-[#427385] rounded-xl w-4/5 h-full">
        <div className="flex-none bg-slate-500  w-64 h-64 ms-12 mt-12">
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
              />
              <input
                type="text"
                placeholder="Hosted Name"
                className="input w-full text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChange(e.target.value, "host_name")}
              />
              <input
                type="text"
                placeholder="Date mm-dd-yyyy"
                className="input w-full text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChange(e.target.value, "date")}
              />
              <input
                type="text"
                placeholder="Location"
                className="input w-full text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChange(e.target.value, "location")}
              />
              <input
                type="text"
                placeholder="Attandees Quota"
                className="input w-full text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChange(e.target.value, "quota")}
              />
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered textarea-lg w-full text-white bg-[#224957] font-semibold"
                onChange={(e) => handleChange(e.target.value, "description")}
              ></textarea>
            </div>
            <button
              id="btn-submit"
              type="submit"
              className="ms-[79%] w-[13%] py-5 my-12 tracking-wide text-white transition-colors duration-200 transform bg-green-600 disabled:bg-green-900 rounded-xl shadow-2xl hover:bg-green-800 focus:outline-none focus:bg-black-600 text-xl"
              disabled={loading}
            >
              Save Event
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddEvent;
