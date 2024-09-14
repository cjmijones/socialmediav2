// TokenExpiryChecker.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";

const TokenExpiryChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      dispatch(logout());
      navigate("/signin");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        dispatch(logout());
        navigate("/signin");
      }
    };

    const interval = setInterval(checkTokenExpiry, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, [dispatch, navigate]);

  return null; // This component doesn't render anything
};

export default TokenExpiryChecker;
