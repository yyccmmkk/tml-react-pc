import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface State {
  [key : string]:  any
}

const initialState: State = { // 会被 preloadedState 覆盖
  value: 0,
  demo: 3,
  asyncData: [],
  errorInfo: '',
  token: 'token'
}

export const counterSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    asyncActionType:(state)=>{

    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateAsyncData: (state,action) => {
      state.asyncData =  action.payload;
    },
    updateErrInfo: (state, action) => {
      state.errorInfo = action.payload;
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

const { reducer, actions } = counterSlice
// Action creators are generated for each case reducer function
export { actions }

// @ts-ignore
export default reducer;
