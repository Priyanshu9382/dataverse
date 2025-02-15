import { Link } from "react-router-dom";
export default function Signup() {
    return (
      <Link to={'/signup'}>
        <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-red-500 text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                placeholder="Confirm your password"
              />
            </div>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded">
              Sign Up
            </button>
          </form>
          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <Link to='/login' className="text-red-500">
                Login
            </Link>
          </p>
        </div>
      </div>
        </Link>
    );
  }
  