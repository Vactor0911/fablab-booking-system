import { useNavigate } from "react-router";
import { loginStateAtom, Permission } from "../states";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { ReactNode } from "react";

const AdminPage = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const loginState = useAtomValue(loginStateAtom);

  useEffect(() => {
    if (!loginState.isLoggedIn || loginState.permission === Permission.USER) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }
  });

  return <>{children}</>;
};

export default AdminPage;
