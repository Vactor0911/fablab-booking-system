import { useSetAtom } from "jotai";
import { ReactNode, useEffect } from "react";
import { loginStateAtom } from "../states";
import { setupAxiosInterceptors } from "../utils/axiosInstance";
import { useNavigate } from "react-router";

interface TokenRefresherProps {
  children: ReactNode;
}

const TokenRefresher = ({ children }: TokenRefresherProps) => {
  const setLoginState = useSetAtom(loginStateAtom); // 상태 업데이트
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
