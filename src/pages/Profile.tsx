import React from "react";

import image from "/defaultImg.png";
import Layout from "../components/Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="max-h-[200vh] py-12 flex flex-col items-center w-full">
        <p className="font-['Lexend_Deca'] text-6xl text-white">Profile</p>
        <hr className="w-[60%] h-1 mx-auto my-6 bg-[#20DF7F] border-0 rounded" />
        <figure className="mt-12">
          <img src={image} alt="img" className="h-48" />
        </figure>
        <div>
          <p className="text-4xl font-bold text-center mt-8">
            Yusuf Ashidicki Pradana
          </p>
        </div>
        <div className="overflow-x-auto ms-10 mt-6">
          <table className="table w-full font-bold text-xl">
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>ashidicki220@gmail.com</td>
            </tr>
            <tr>
              <td>Password</td>
              <td>:</td>
              <td>***********</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>:</td>
              <td>Jln. Dr. Wahidin SDRHSD No. 08</td>
            </tr>
          </table>
        </div>
        <div className="flex justify-center w-full">
          <label
            htmlFor="my-modal-3"
            className="py-2 px-14 mt-10 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-xl shadow-xl hover:bg-green-800 focus:outline-none focus:bg-black-600 text-2xl"
          >
            Edit
          </label>
        </div>

        {/* <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative bg-white max-w-[40rem] hero min-h-[91%]">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-[1rem] top-[-11px]"
            >
              ✕
            </label>
            <div className="hero-content flex-col lg:flex-row">
              <div className="p-5 lg:w-full mt-5">
                <form className="flex flex-col justify-center items-center">
                  <div className="bg-cover bg-center w-32 h-32 -mt-16 rounded-full border-4 border-white profil-content"></div>
                  <label className="block font-medium text-gray-700">
                    Choose Photo
                  </label>
                  <input
                    type="file"
                    className="file-input max-w-xs bg-white"
                    placeholder="Choose Photo"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className=" border-2 border-slate-300 input w-full max-w-md bg-white m-2"
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    className=" border-2 border-slate-300 input w-full max-w-md bg-white m-2 "
                  />
                  <input
                    type="password"
                    placeholder="Create Password"
                    className=" border-2 border-slate-300 input w-full max-w-md bg-white m-2 "
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className=" border-2 border-slate-300 input w-full max-w-md bg-white m-2 "
                  />
                  <button className="btn w-full m-3 wfu">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div> */}

        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative max-w-screen-sm bg-[#c8dac5] py-9">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <form className="flex flex-col justify-center items-center">
              <figure className="my-4">
                <img src={image} alt="img" className="h-48" />
              </figure>
              <input
                type="file"
                className="file-input w-[16.6rem] bg-[#b0c0ad] text-white my-5"
              />
              <input
                type="email"
                placeholder="Email"
                className="input w-11/12 bg-slate-200 text-black font-semibold my-3"
              />
              <input
                type="text"
                placeholder="Full Name"
                className="input w-11/12 bg-slate-200 text-black font-semibold m-3"
              />
              <input
                type="password"
                placeholder="Password"
                className="input w-11/12 bg-slate-200 text-black font-semibold m-3"
              />
              <input
                type="text"
                placeholder="Address"
                className="input w-11/12 bg-slate-200 text-black font-semibold m-3"
              />
              <button className="w-11/12 py-3 mt-6 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-xl shadow-xl hover:bg-green-800 focus:outline-none focus:bg-black-600">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
