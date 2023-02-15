import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = '';

class ErrorClass extends Error {
	response?: {
		data: any;
		status: number;
		headers: string;
	};
}

interface info {
	[key: string]: string | number
}

interface initialState {
	data: info | null,
	loading: boolean,
	error: ErrorClass | null
}

export const getInfo = createAsyncThunk<info, info, {extra: {jwt: string}, rejectValue: (ErrorClass) }>('InfoSlice/getInfo', async (payload, { rejectWithValue }) => {
	let result = null;

	try {
		const response = await axios.get(API_URL);
		result = response.data;
	} catch (err) {
		if(err instanceof ErrorClass) {
			result = rejectWithValue(err);
		}
	}

	return result;
});

const InfoSlice = createSlice({
	name: 'InfoSlice',
	initialState: {
		data: null,
		loading: false,
		error: null
	} as initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getInfo.pending, (state, {payload}) => {
			state.loading = true;
		}).addCase(getInfo.fulfilled, (state, {payload}) => {
			state.loading = false;
			state.data = payload;
		}).addCase(getInfo.rejected, (state, {payload}) => {
			state.loading = false;
			if(typeof payload !== 'undefined') {
				state.error = payload;
			}
		});
	}
});

export default InfoSlice.reducer;