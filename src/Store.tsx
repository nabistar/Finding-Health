import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import GetSlice from './Slice/GetSlice';
import SearchSlice from './Slice/SearchSlice';
import LossSlice from './Slice/LossSlice';

const store = configureStore({
	reducer: {
		GetSlice: GetSlice,
		SearchSlice: SearchSlice,
		LossSlice: LossSlice
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;