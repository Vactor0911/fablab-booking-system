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
  userId: string;
  permission: Permission;
  userName: string;
}

export const loginStateAtom = atom<LoginState>({} as LoginState);

// 내 예약 정보 상태
export interface MyReservation {
  state: string;
  book_date: string;
  seat_name: string;
  cancel_reason?: string;
}

// 팹랩 좌석 정보
export interface SeatInfoProps {
  seatName: string;
  state: string;
  userName: string;
}

export const seatInfoAtom = atom({} as Record<string, SeatInfoProps>);

// 내 예약 좌석 이름
export const reservationSeatAtom = atom("");

// 내 현재 예약 좌석 정보
export interface MyReservation {
  bookDate: string;
  seatName: string;
  pcSupport: string;
  image: string;
}

export const myCurrentReservationAtom = atom<Partial<MyReservation> | null>(
  null
);

// 예약 제한된 좌석 배열
export const bookRestrictedSeatsAtom = atom<string[]>([]);
