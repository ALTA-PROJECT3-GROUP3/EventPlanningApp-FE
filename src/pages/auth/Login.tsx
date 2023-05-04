import { FC } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
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
        const data = response.data;
        // Cookies.set("userData", JSON.stringify(data));
        // const userData = Cookies.get("userData");
        console.log(data);
        // console.log(userData);

        navigate("/u/:username/");
      })
      .catch((error) => {
        console.log(error);
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
