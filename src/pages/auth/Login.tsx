import { FC, useState, useEffect } from "react";
import withReactContent from "sweetalert2-react-content";

import axios from "axios";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import { handleAuth } from "../../utils/redux/reducers/reducer";
import Swal from "../../utils/swal";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const MySwal = withReactContent(Swal);
  const [, setCookie] = useCookies(["token", "uname"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password]);

  const handleUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(
        "https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/login",
        {
          username,
          password,
        }
      )
      .then((response) => {
        const { data } = response.data;
        MySwal.fire({
          title: "Success",
          text: data.message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setCookie("token", data.token, { path: "/" });
            setCookie("uname", data.username, { path: "/" });
            dispatch(handleAuth(true));
            navigate(`/u/${data.username}`);
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      });
  };

  return (
    <div className="bg-[#093545]">
      <div className="relative flex flex-col justify-center min-h-screen">
        <div className="w-[25%] p-6 m-auto bg-[#093545] rounded-md shadow-xl">
          <h1 className="text-7xl font-extrabold text-center text-white">
            Sign in
          </h1>
          <p className="text-lg font-semibold text-center text-black-500 mt-7">
            Sign in and join an event do you want!
          </p>
          <form
            className="mt-20 flex flex-col justify-center"
            onSubmit={handleLogin}
          >
            <div>
              <input
                type="text"
                placeholder="Username"
                className="block w-full px-4 py-3 text-white bg-[#224957] border rounded-lg focus:outline-none border-none mb-5"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="block w-full px-4 py-3 text-white bg-[#224957] border rounded-lg focus:outline-none border-none"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="w-full py-3 mt-20 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-xl shadow-xl hover:bg-green-800 focus:outline-none focus:bg-black-600"
                disabled={loading || disabled}
              >
                Sign In
              </button>
              <p className="text-center font-medium text-white pt-6">
                Don't have an account?{" "}
                {
                  <Link
                    className="text-[#20df7f] text-md font-semibold"
                    to={"/register"}
                  >
                    Sign up
                  </Link>
                }
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
