import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { login as authLogin } from "@/store/slices/authSlice";
import { Spinner } from "@/components/ui/spinner";

export default function GoogleCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken");
    const userStr = searchParams.get("user");

    if (accessToken && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        dispatch(authLogin({ token: accessToken, user }));
        navigate("/");
      } catch (error) {
        console.error("Failed to parse user data from URL:", error);
        navigate("/login");
      }
    } else {
      navigate("/login?error=auth_failed");
    }
  }, [location, dispatch, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner />
        <span className="text-lg font-medium">Completing Google Login...</span>
      </div>
    </div>
  );
}
