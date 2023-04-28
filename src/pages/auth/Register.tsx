import { FC } from "react";

const Register: FC = () => {
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
          <form className="mt-20 flex flex-col justify-center">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="block w-full px-4 py-3 text-white bg-[#224957] border rounded-lg focus:outline-none border-none mb-5"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="block w-full px-4 py-3 text-white bg-[#224957] border rounded-lg focus:outline-none border-none mb-5"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                className="block w-full px-4 py-3 text-white bg-[#224957] border rounded-lg focus:outline-none border-none mb-5"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="block w-full px-4 py-3 text-white bg-[#224957] border rounded-lg focus:outline-none border-none"
              />
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="w-full py-3 mt-20 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-xl shadow-xl hover:bg-green-800 focus:outline-none focus:bg-black-600"
              >
                Sign Up
              </button>
              <p className="text-center font-medium text-white pt-6">
                Already have an account?{" "}
                {/* {
                  <Link className=" text-library-logo" to={"/register"}>
                    Sign in
                  </Link>
                } */}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
