import { FC, useState, useEffect } from "react";
import axios from "axios";

import { CardHome, CardPay } from "../components/Cards";
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

const MyEvent: FC = () => {
  const [hosted, setHosted] = useState<HomeCap[]>([]);
  const [joinded, setJoinded] = useState<HomeCap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState(1);

  useEffect(() => {
    alterFetchData();
  }, []);

  async function alterFetchData() {
    try {
      const responseJoin = await axios.get(
        "https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/myevent?p=1&rp=10&type=joined"
      );
      const { data: data1 } = responseJoin.data;
      setJoinded(data1);

      const responseHosted = await axios.get(
        "https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/myevent?p=1&rp=10&type=owned"
      );
      const { data: data2 } = responseHosted.data;
      setHosted(data2);
    } catch (error) {
      console.error(error);
      alert(error?.toString());
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="max-h-[200vh] py-12 flex flex-col items-center w-full">
        <p className="font-['Lexend_Deca'] text-6xl text-white">My Event</p>
        <div
          data-theme="mytheme"
          className="tabs tabs-boxed gap-9 bg-inherit mt-5"
        >
          <a
            className={`${tabValue === 0 ? "tab-active" : ""} tab tab-lg`}
            onClick={() => setTabValue(0)}
            id="button-tab-joined"
          >
            Joined Event
          </a>
          <a
            className={`${tabValue === 1 ? "tab-active" : ""} tab tab-lg`}
            onClick={() => setTabValue(1)}
            id="button-tab-hosted"
          >
            Hosted Event
          </a>
          <a
            className={`${
              tabValue === 2 ? "tab-active" : ""
            } tab tab-lg tab-disabled`}
            id="button-tab-past"
          >
            Past Event
          </a>
        </div>

        <hr className="w-[60%] h-1 mx-auto mt-1 mb-3 bg-[#20DF7F] border-0 rounded " />
        <div className="flex justify-center">
          {tabValue === 0 ? (
            <div
              className={`${
                loading ? "" : "overflow-auto"
              } w-[55%] mt-2 grid gap-3 grid-cols-1`}
            >
              {loading ? (
                <div className="h-96 w-24 flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                joinded.map((data, idx) => {
                  return (
                    <CardPay
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
          ) : tabValue === 1 ? (
            <div
              className={`${
                loading ? "" : "overflow-auto"
              } w-[55%] mt-2 grid gap-3 grid-cols-1`}
            >
              {loading ? (
                <div className="h-96 w-24 flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                hosted.map((data, idx) => {
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
          ) : (
            <p>NONE</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyEvent;
