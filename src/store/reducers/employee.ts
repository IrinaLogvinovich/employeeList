import { createSlice } from "@reduxjs/toolkit";
import { IEmployee, TRole, TStatus } from '../../types';

interface IInitialState {
  status: TStatus;
  submitStatus: TStatus;
  employeeList: IEmployee[];
  filter: {
    sort: 'birthday' | 'name' | '';
    isArchive: boolean;
    role: TRole | '';
  };
}

const initialState: IInitialState = {
  status: 'init',
  submitStatus: 'init',
  employeeList: [],
  filter: {
    sort: '',
    isArchive: false,
    role: '',
  },
};


export const employeeReducer = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    loadEmployeeList: (state, action) => {
      state.employeeList = action.payload;
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
    changeSubmitStatus: (state, action) => {
      state.submitStatus = action.payload;
    },
    changeFilterSort: (state, action) => {
      state.filter.sort = action.payload;
    },
    changeFilterArchive: (state, action) => {
      state.filter.isArchive = action.payload;
    },
    changeFilterRole: (state, action) => {
      state.filter.role = action.payload;
    },
    resetFilter: (state) => {
      state.filter = {
        sort: '',
        isArchive: false,
        role: '',
      };
    },
  },
});

export const {
  loadEmployeeList,
  changeStatus,
  changeSubmitStatus,
  changeFilterSort,
  changeFilterArchive,
  changeFilterRole,
  resetFilter,
} = employeeReducer.actions;