import { FC, ReactNode } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <div className="w-full h-full flex flex-col bg-[#093545]">
      <Navbar />
      <div className="h-full w-full py-3 px-3 flex flex-col items-center justify-center ">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
