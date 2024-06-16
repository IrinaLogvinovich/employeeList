import { createAsyncThunk } from "@reduxjs/toolkit";
import store from "..";
import { INewEmployee, IEmployee } from '../../types';
import { changeStatus, changeSubmitStatus, loadEmployeeList } from '../reducers/employee';

export const fetchEmployeeList = createAsyncThunk(
  'FETCH_EMPLOYEE_LIST', async () => {
  store.dispatch(changeStatus('loading'));
  try {
    const data = await fetch(`http://localhost:3000/employees`);
    const list: IEmployee[] = await data.json();

    store.dispatch(changeStatus('success'));
    store.dispatch(loadEmployeeList(list));
  } catch (error) {
    store.dispatch(changeStatus('error'));
    console.log(error);
  }
});

export const fetchNewEmployee = createAsyncThunk(
  'FETCH_NEW_EMPLOYEE',
  async (user: INewEmployee) => {
    store.dispatch(changeSubmitStatus('loading'));
    try {
      await fetch(`http://localhost:3000/employees`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      store.dispatch(changeSubmitStatus('success'));
    } catch (error) {
      store.dispatch(changeSubmitStatus('error'));
      console.log(error);
    }
  }
);

export const fetchEditEmployee = createAsyncThunk(
  'FETCH_EDIT_EMPLOYEE',
  async (data: IEmployee) => {
    store.dispatch(changeSubmitStatus('loading'));
    try {
      await fetch(`http://localhost:3000/employees/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      store.dispatch(changeSubmitStatus('success'));
    } catch (error) {
      store.dispatch(changeSubmitStatus('error'));
      console.log(error);
    }
  }
);

