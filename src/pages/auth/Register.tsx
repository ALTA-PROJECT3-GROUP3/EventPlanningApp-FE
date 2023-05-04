import axios from "axios";
import { FC, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ObjSubmitType {
  name: string;
  email: string;
  username: string;
  password: string;
  image: any;
}

const Register: FC = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<ObjSubmitType>>({
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
  });
  const navigate = useNavigate();

  function handleChange(value: string | File, key: keyof typeof objSubmit) {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
    console.log("temp", temp);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(objSubmit);

    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
      console.log(key, objSubmit[key]);
    }
    console.log(formData);

    axios
      .post(
        "https://virtserver.swaggerhub.com/CW3-ALTA/EventPlanningApp/1.0.0/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        const { message } = response.data;
        alert("register successfully");
        navigate("/login");
      })
      .catch((error) => {
        const { message } = error.response;
        alert("null");
      });
  }

  return (
    <div className="bg-[#093545]">
      <div className="relative flex flex-col justify-center min-h-screen">
        <div className="w-[25%] p-6 m-auto bg-[#093545] rounded-md shadow-xl">
          <h1 className="text-7xl font-extrabold text-center text-white">
            Sign up
          </h1>
          <p className="text-lg font-semibold text-center text-black-500 mt-7">
            Sign up and join an event do you want!
          </p>
          <form
            className="mt-20 flex flex-col justify-center"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div>
              <input
                type="text"
                placeholder="Name"
                className="block w-full px-4 py-3 text-white bg-[#224957] border rounded-lg focus:outline-none border-none mb-5"
                onChange={(event) => handleChange(event.target.value, "name")}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="block w-full px-4 py-3 text-white bg-[#224957] border rounded-lg focus:outline-none border-none mb-5"
                onChange={(event) => handleChange(event.target.value, "email")}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                className="block w-full px-4 py-3 text-white bg-[#224957] border rounded-lg focus:outline-none border-none mb-5"
                onChange={(event) =>
                  handleChange(event.target.value, "username")
                }
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="block w-full px-4 py-3 text-white bg-[#224957] border rounded-lg focus:outline-none border-none"
                onChange={(event) =>
                  handleChange(event.target.value, "password")
                }
              />
            </div>
            <div className="w-full">
              <button className="w-full py-3 mt-20 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-xl shadow-xl hover:bg-green-800 focus:outline-none focus:bg-black-600">
                Sign Up
              </button>
              <p className="text-center font-medium text-white pt-6">
                Already have an account?{" "}
                {
                  <Link
                    className="text-[#20df7f] text-md font-semibold"
                    to={"/login"}
                  >
                    Sign in
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

export default Register;
