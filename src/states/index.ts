import { atom } from "jotai";

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
    id: string;
    userId: string;
    permission: Permission;
}

export const loginStateAtom = atom({
    isLoggedIn: true,
    id: "123456",
    userId: "1",
    permission: Permission.ADMIN,
} as LoginState);