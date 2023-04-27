import { FC, useState } from "react";

interface CardHomeCap {
  name: string;
  date: string;
  host_name: string;
  quota: number;
  image: string;
}

interface CardParticipantCap {
  user_name: string;
  pictures: string;
}

interface CardCommentCap {
  comment: string;
  pictures: string;
  user_name: string;
}

export const CardHome: FC<CardHomeCap> = (props) => {
  const { name, date, host_name, quota, image } = props;
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
          <button className="btn btn-primary tracking-wider text-white">
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export const CardParticipant: FC<CardParticipantCap> = (props) => {
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

export const CardComment: FC<CardCommentCap> = (props) => {
  const { user_name, pictures, comment } = props;

  return (
    <div
      data-theme="mytheme"
      className=" card card-side bg-inherit flex gap-5 items-center p-3"
    >
      <figure className="w-[15%] bg-[#427385] p-2 rounded-full">
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
