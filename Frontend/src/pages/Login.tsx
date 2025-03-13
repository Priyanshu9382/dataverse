import { Link } from "react-router-dom";

export default function Login() {
    return (
      <Link to={'/login'}>
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-red-500 text-2xl font-bold text-center mb-6">Login</h2>
          <form>
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
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded">
              Login
            </button>
          </form>
          <p className="text-gray-400 text-center mt-4">
            Don't have an account?{" "}
            <Link to='/signup' className="text-red-500">
                Sign up
            </Link>
          </p>
        </div>
      </div>
      </Link>
    );
  }
  