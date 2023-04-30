import { FC } from "react";
import { FaRegFrown } from "react-icons/fa";

const NotFound: FC = () => {
  return (
    <div
      id="error-page"
      className="h-screen bg-[#093545] text-slate-300 flex justify-center items-center flex-col"
    >
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className="text-7xl flex justify-center mb-3">
          <FaRegFrown />
        </p>
        <p className="text-lg">Page not found</p>

        <p className="text-sm">Sorry, an unexpected error has occurred.</p>
      </div>
    </div>
  );
};

export default NotFound;
