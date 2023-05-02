import { FC, useState, useEffect } from "react";
import axios from "axios";

import { CardHome } from "../components/Cards";
import Layout from "../components/Layout";
import { Spinner } from "../components/Loading";

interface HomeCap {
  name: string;
  date: string;
  host_name: string;
  quota: number;
  image: string;
  id: number;
}

const Home: FC = () => {
  const [datas, setDatas] = useState<HomeCap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(
        "https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/events?p=1&rp=10"
      )
      .then((response) => {
        const { data } = response.data;
        setDatas(data);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  return (
    <Layout>
      <div className="max-h-[200vh] py-12 flex flex-col items-center w-full">
        <p className="font-['Lexend_Deca'] text-6xl text-white">All Event</p>
        <hr className="w-[60%] h-1 mx-auto my-6 bg-[#20DF7F] border-0 rounded " />
        <div className="w-[55%] mt-3 grid gap-3 grid-cols-1 overflow-auto">
          {loading ? (
            <div className="w-full h-96 flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            datas.map((data, idx) => {
              return (
                <CardHome
                  key={data.id}
                  date={data.date}
                  host_name={data.host_name}
                  image={data.image}
                  name={data.name}
                  quota={data.quota}
                  id={data.id}
                />
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
