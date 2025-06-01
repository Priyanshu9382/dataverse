import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface UserProtectedWrapperProps {
  children: ReactNode;
}

const UserProtectedWrapper: React.FC<UserProtectedWrapperProps> = ({ children }) => {
  const token: string | null = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
