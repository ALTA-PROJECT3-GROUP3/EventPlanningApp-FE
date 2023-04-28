import { FC, InputHTMLAttributes, ReactNode, useState } from "react";

interface modalPaymentType {
  children: ReactNode;
}

export const ModalPayment: FC<modalPaymentType> = (props) => {
  return (
    <>
      <input type="checkbox" id="my-modal-payment" className="modal-toggle" />
      <div data-theme="mymodal" className="modal bg-[#0e0b0b66]">
        <div className="modal-box relative w-10/12 max-w-5xl">
          <label
            htmlFor="my-modal-payment"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          {props.children}
        </div>
      </div>
    </>
  );
};

export const InputPayment: FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  const { id, name } = props;
  return (
    <div className="">
      <label className="" htmlFor={id}>
        {name}
      </label>
      <input type="number" className="input w-full bg-[#B0C0AD]" {...props} />
    </div>
  );
};

export const RadioBank: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { id } = props;

  return (
    <div className="flex items-center bg-[#B0C0AD] rounded ">
      <input
        id={`radio-${id}`}
        type="radio"
        value=""
        name="bordered-radio"
        className="hidden peer"
      />
      <label
        htmlFor={`radio-${id}`}
        className="font-medium uppercase cursor-pointer flex items-center p-3 w-full h-full rounded peer-checked:bg-[#788675]"
      >
        {id}
      </label>
    </div>
  );
};
