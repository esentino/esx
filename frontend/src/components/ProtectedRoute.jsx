import { Navigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import api from "../api";

import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  });

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post(
        "api/token/refresh/",
        {
          refresh: refreshToken,
        },
        {
          validateStatus: (status) => {
            console.log(status);
            return status == 200 || status == 401;
          },
        }
      );
      switch (res.status) {
        case 200:
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          setIsAuthorized(true);
          break;
        case 401:
          // If get 401 on refresh token that means is not usable for example expired od remove from server side
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          setIsAuthorized(false);
          break;
        default:
          setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decode = jwtDecode(token);
    const tokenExpiration = decode.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
