import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import store from "../store";

export type TRole = 'driver' | 'waiter' | 'cook';

export const RoleDictionary : Record<TRole, string> = {
  driver: 'Водитель',
  cook: 'Повар',
  waiter: 'Официант'
}

export interface IEmployee {
  id: number;
  name: string;
  isArchive: boolean;
  role: TRole;
  phone: string;
  birthday: string;
}

export interface INewEmployee {
  name: string;
  isArchive: boolean;
  role: TRole;
  phone: string;
  birthday: string;
}

export type TStatus = 'loading' | 'init' | 'error' | 'success'

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;