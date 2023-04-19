import { FC } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logos from "/NavLog.png";

const Footer: FC = () => {
  return (
    <footer className="footer footer-center py-8 bg-[#0A142F] text-gray-300 rounded w-full gap-4">
      <div className="flex flex-col gap-6 ">
        <p className="text-4xl">Makes it easy and rewarding, always!</p>
        <p className="text-sm w-[90%]">
          People on Event Planner have fostered community, learned new skills,
          started businesses, and made life-long friends. Learn how.
        </p>
      </div>

      <div className="border-t-[1px] w-full border-gray-700" />

      <div className="flex items-center justify-between w-full px-32">
        <div>
          <a className="cursor-pointer">
            <img src={logos} alt="logo-event-planner" />
          </a>
        </div>
        <p>Copyright © 2023 ALTA-PROJECT3-GROUP3. All Rights Reserved.</p>
        <div className="grid grid-flow-col gap-3">
          <a className="cursor-pointer">
            <div className="border p-2 border-gray-200 rounded-full">
              <FaFacebookF size={".8rem"} />
            </div>
          </a>

          <a className="cursor-pointer">
            <div className="border p-2 border-gray-200 rounded-full">
              <FaLinkedinIn size={".8rem"} />
            </div>
          </a>

          <a className="cursor-pointer">
            <div className="border p-2 border-gray-200 rounded-full">
              <FaTwitter size={".8rem"} />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
