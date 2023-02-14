import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = '';

interface info {
	[key: string]: string | number
}

interface initialState {
	data: unknown,
	loading: boolean,
	error: unknown | null
}

export const getInfo = createAsyncThunk<info, info, {dispatch: Dispatch, state: unknown, extra: {jwt: string}, rejectValue: unknown }>('InfoSlice/getInfo', async (payload, { rejectWithValue }) => {
	let result = null;

	try {
		const response = await axios.get(API_URL);
		result = response.data;
	} catch (err) {
		result = rejectWithValue(err);
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
			state.error = payload;
		});
	}
});

export default InfoSlice.reducer;