import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// 다크모드 상태
export const isDarkModeAtom = atom(false);

// 로그인 상태
export enum Permission {
  USER = "user",
  ADMIN = "admin",
  SUPER_ADMIN = "superadmin",
}

export interface LoginState {
  isLoggedIn: boolean;
  userId: string;
  permission: Permission;
}

export const loginStateAtom = atomWithStorage("FabLabLoginState", {} as LoginState);
