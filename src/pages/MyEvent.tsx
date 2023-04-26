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
  const [tabValue, setTabValue] = useState(1);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(
        "https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/myevent?p=1&rp=10"
      )
      .then((response) => {
        const { data } = response.data;
        setDatas(data);
        console.log(data);
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
        <p className="font-['Lexend_Deca'] text-6xl text-white">My Event</p>
        <hr className="w-[60%] h-1 mx-auto my-6 bg-[#20DF7F] border-0 rounded " />
        <div data-theme="mytheme" className="tabs tabs-boxed gap-9 bg-inherit">
          <a
            className={`${tabValue === 0 ? "tab-active" : ""} tab tab-lg`}
            onClick={() => setTabValue(0)}
          >
            Joined Event
          </a>
          <a
            className={`${tabValue === 1 ? "tab-active" : ""} tab tab-lg`}
            onClick={() => setTabValue(1)}
          >
            Hosted Event
          </a>
          <a
            className={`${
              tabValue === 2 ? "tab-active" : ""
            } tab tab-lg tab-disabled`}
          >
            Past Event
          </a>
        </div>

        <div className="flex justify-center">
          {tabValue === 0 ? (
            <div className="w-[55%] mt-3 grid gap-3 grid-cols-1 overflow-auto">
              {loading ? (
                <Spinner />
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
                    />
                  );
                })
              )}
            </div>
          ) : tabValue === 1 ? (
            <div className="w-[55%] mt-3 grid gap-3 grid-cols-1 overflow-auto">
              {loading ? (
                <Spinner />
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
                    />
                  );
                })
              )}
              <CardHome
                date="2023-05-01T10:00:00Z"
                host_name="Jakarta Media Post"
                image="/defaultImg.png"
                name="Webinar: Level Up Your Business Through SEO"
                quota={40}
              />
            </div>
          ) : (
            <p>NONE</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
