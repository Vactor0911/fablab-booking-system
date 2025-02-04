import { useAtom } from "jotai";
import { ReactNode, useEffect } from "react";
import { loginStateAtom } from "../states";
import { setupAxiosInterceptors } from "../utils/axiosInstance";
import { useNavigate } from "react-router";

interface TokenRefresherProps {
  children: ReactNode;
}

const TokenRefresher = ({ children }: TokenRefresherProps) => {
  // 로컬 스토리지에서 로그인 상태 가져오기
  const [loginState, setLoginState] = useAtom(loginStateAtom);
  if (!loginState || !loginState.isLoggedIn) {
    const storedLoginState = localStorage.getItem("FabLabLoginState");
    if (storedLoginState) {
      setLoginState(JSON.parse(storedLoginState));
    }
  }

  const navigate = useNavigate();

  // 토큰 만료 시 로그아웃 처리 or 토큰 재발급
  useEffect(() => {
    // Axios Interceptor 초기화
    setupAxiosInterceptors(setLoginState, navigate);
  }, [setLoginState, navigate]);
  // 토큰 만료 시 로그아웃 처리 or 토큰 재발급

  return <>{children}</>;
};

export default TokenRefresher;
