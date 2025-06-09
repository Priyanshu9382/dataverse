import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Signup: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<{
    fullname: string;
    email: string;
    password: string;
    about: string;
  }>({
    fullname: "",
    email: "",
    password: "",
    about: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const RegistrationData = new FormData();
    RegistrationData.append("fullname", formData.fullname);
    RegistrationData.append("email", formData.email);
    RegistrationData.append("password", formData.password);
    RegistrationData.append("about", formData.about);
    if (image) {
      RegistrationData.append("profileImg", image);
    }

    if (!image) {
      alert("Please upload an image");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register`,
        {
          method: "POST",
          body: RegistrationData,
        }
      );
      const data = await response.json();
      console.log(data);
      alert(data.message);
      navigate('/login')
    } catch (error) {
      console.log("Error: ", error);
      alert("Something went wrong, Please try again");
    }
  };

  return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-red-500 text-2xl font-bold text-center mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="fullname"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                placeholder="Enter your name"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                placeholder="Enter your email"
                value={formData.email}

                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">About</label>
              <input
                type="text"
                name="about"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                value={formData.about}
                placeholder="Tell Us about Yourself..."
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                onChange={handleChange}
                value={formData.password}
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                Upload profile picture
              </label>
              <input
                type="file"
                name="profileImg"
                accept="image/*"
                onChange={handleImgChange}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                required
                
              />
            </div>

            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500">
              Login
            </Link>
          </p>
        </div>
      </div>
  );
};
export default Signup;
