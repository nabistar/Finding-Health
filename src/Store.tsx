import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import LossSlice from './Slice/LossSlice';

const store = configureStore({
	reducer: {
		LossSlice: LossSlice
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;