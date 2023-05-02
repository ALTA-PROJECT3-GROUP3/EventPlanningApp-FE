import React from "react";

import image from "/defaultImg.png";
import Layout from "../components/Layout";

const EditEvent = () => {
  return (
    <Layout>
      <h1 className="w-[80%] text-3xl font-extrabold text-[#20df7f] mt-10 mb-4">
        Edit Event
      </h1>

      <div className="mb-12 flex border-4 border-[#427385] rounded-xl w-4/5 h-full">
        <div className="flex-none w-64 h-64 ms-12 mt-12">
          <figure>
            <img src={image} alt="Movie" className="w-64 h-64" />
          </figure>
          <input
            type="file"
            className="file-input w-[16.6rem] bg-[#224957] text-white mt-5"
          />
        </div>
        <div className="grow h-full mt-12">
          <form className="flex flex-col justify-center items-center">
            <div className="flex flex-col w-11/12 gap-5">
              <input
                type="text"
                placeholder="Event Name"
                className="input w-full text-white bg-[#224957] font-semibold"
              />
              <input
                type="text"
                placeholder="Hosted Name"
                className="input w-full text-white bg-[#224957] font-semibold"
              />
              <input
                type="text"
                placeholder="Date"
                className="input w-full text-white bg-[#224957] font-semibold"
              />
              <input
                type="text"
                placeholder="Location"
                className="input w-full text-white bg-[#224957] font-semibold"
              />
              <input
                type="text"
                placeholder="Attandees Quota"
                className="input w-full text-white bg-[#224957] font-semibold"
              />
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered textarea-lg w-full text-white bg-[#224957] font-semibold"
              ></textarea>
            </div>
            <h1 className="text-2xl font-extrabold text-[#20df7f] mt-6 mb-4 w-11/12">
              Add Ticket
            </h1>
            <form className="flex flex-col w-11/12 gap-2">
              <div className="flex w-11/12 gap-2">
                <input
                  type="text"
                  placeholder="Regular"
                  className="input flex-none w-[30rem] h-14 text-white bg-[#224957] font-semibold"
                />
                <input
                  type="text"
                  placeholder="Quota"
                  className="input shrink w-36 h-14 text-white bg-[#224957] font-semibold"
                />
                <input
                  type="text"
                  placeholder="Price"
                  className="input flex-none w-[30rem] h-14 text-white bg-[#224957] font-semibold"
                />
                <button className="input flex-none w-14 h-14 tracking-wide text-white text-xl font-bold transition-colors duration-200 transform bg-[#f46953] rounded-xl shadow-xl hover:bg-red-500 focus:outline-none focus:bg-black-600">
                  -
                </button>
              </div>
              <div className="flex w-11/12 gap-2">
                <input
                  type="text"
                  placeholder="VIP"
                  className="input flex-none w-[30rem] h-14 text-white bg-[#224957] font-semibold"
                />
                <input
                  type="text"
                  placeholder="Quota"
                  className="input shrink w-36 h-14 text-white bg-[#224957] font-semibold"
                />
                <input
                  type="text"
                  placeholder="Price"
                  className="input flex-none w-[30rem] h-14 text-white bg-[#224957] font-semibold"
                />
                <button className="input flex-none w-14 h-14 tracking-wide text-white text-xl font-bold transition-colors duration-200 transform bg-[#f46953] rounded-xl shadow-xl hover:bg-red-500 focus:outline-none focus:bg-black-600">
                  -
                </button>
              </div>
              <button className="w-[10%] py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:bg-black-600">
                Add Ticket
              </button>
            </form>
            <div className="flex justify-end w-full my-12">
              <div className="flex flex-row gap-4">
                <button className="w-full px-12 py-5 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-xl shadow-2xl hover:bg-red-800 focus:outline-none focus:bg-black-600 text-xl">
                  Delete
                </button>
                <button className="w-full px-14 py-5 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-xl shadow-2xl hover:bg-green-800 focus:outline-none focus:bg-black-600 text-xl">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditEvent;
