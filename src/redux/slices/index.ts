import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  [key: string]: any;
}

const initialState: State = {
  asyncData: [],
  errorInfo: '',
  account: '',
  userId: '' || localStorage.getItem('userId') || '',
  token: '' || sessionStorage.getItem('token'),
  code: '',
};

export const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    asyncActionType: (state) => {
      console.log(state);
    },
    updateCode: (state, action) => {
      state.code = action.payload;
    },
    updateAccount: (state, action) => {
      state.account = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      sessionStorage.setItem('token', action.payload);
    },
    updateAsyncData: (state, action) => {
      state.asyncData = action.payload;
    },
    updateErrInfo: (state, action) => {
      state.errorInfo = action.payload;
    },

    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

const { reducer, actions } = slice;
// Action creators are generated for each case reducer function
export { actions };

export default reducer;
