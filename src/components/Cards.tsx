import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface cardHomeCapType {
  name: string;
  date: string;
  host_name: string;
  quota: number;
  image: string;
  id: number;
}

interface cardParticipantCapType {
  user_name: string;
  pictures: string;
}

interface cardCommentCapType {
  comment: string;
  pictures: string;
  user_name: string;
}
interface tabelCapType {
  name?: string;
  data?: string;
}

export const CardHome: FC<cardHomeCapType> = (props) => {
  const { name, date, host_name, quota, image, id } = props;
  const navigate = useNavigate();
  const dated = new Date(date);
  const formattedDate = dated.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      data-theme="mytheme"
      className=" card card-side bg-[#224957] shadow-xl"
    >
      <figure className="w-[30%] bg-[#427385] p-2">
        <img className="w-full h-auto" src={image} alt={`${name}'s picture`} />
      </figure>
      <div className="card-body p-6 w-[70%]">
        <p className="text-[#20DF7F] font-medium tracking-wide">
          {formattedDate}
        </p>
        <p className="card-title tracking-wider ">{name}</p>
        <p>Hosted By: {host_name}</p>
        <p className="mt-3">{quota} Attendees</p>

        <div className="card-actions justify-end">
          <button
            onClick={() => {
              navigate(`/event/${id}`);
            }}
            className="btn btn-primary tracking-wider text-white"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export const CardParticipant: FC<cardParticipantCapType> = (props) => {
  const { user_name, pictures } = props;

  return (
    <div
      data-theme="mytheme"
      className=" card bg-[#224957] shadow-xl flex flex-col items-center p-3"
    >
      <figure className="w-[80%] bg-[#427385] p-2 rounded-full">
        <img
          className="w-full h-auto aspect-square"
          src={pictures}
          alt={`${user_name}'s picture`}
        />
      </figure>
      <p className="card-title text-sm tracking-wider my-3">{user_name}</p>
    </div>
  );
};

export const CardComment: FC<cardCommentCapType> = (props) => {
  const { user_name, pictures, comment } = props;

  return (
    <div
      data-theme="mytheme"
      className=" card card-side bg-inherit flex gap-5 items-center p-3"
    >
      <figure className="w-[12%] bg-[#427385] p-2 rounded-full">
        <img
          className="w-full h-auto aspect-square"
          src={pictures}
          alt={`${user_name}'s picture`}
        />
      </figure>
      <div className="card-body p-6 bg-[#224957] rounded-2xl">
        <p className="card-title text-base text-primary tracking-wider">
          {user_name}
        </p>
        <p className="mt-2">{comment} Attendees</p>
      </div>
    </div>
  );
};

export const TabelTransaksi: FC<tabelCapType> = (props) => {
  const { name, data } = props;
  return (
    <div className="w-[70%] h-full bg-[#224957] p-3 rounded-2xl text-white">
      <table className="border-separate w-full">
        <tbody>
          <tr>
            <td className="w-[30%]">{name}</td>
            <td className="">: {data}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
