import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { isMenuClicked } from "../states/state"; // Ensure correct import

const RouteListener = () => {
  const location = useLocation();
  const [, setMenuClicked] = useRecoilState(isMenuClicked);

  useEffect(() => {
    // Reset menu state on every route change
    setMenuClicked(false);
  }, [location, setMenuClicked]); // Runs whenever the route changes

  return null; // No UI, only logic
};

export default RouteListener;
