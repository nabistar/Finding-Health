import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import Parser from 'react-xml-parser';

const API_URL = 'http://apis.data.go.kr/1320000/LosPtfundInfoInqireService';
const service: string | undefined = process.env.REACT_APP_SERVICE_KEY;

class ErrorClass extends Error {
	response?: {
		data: any;
		status: number;
		headers: string;
	};
}

interface list {
	rnum: number,
	atcId: string,
	fdSn: number,
	prdtClNm: string,
	clrNm: string,
	fdPrdtNm: string,
	fdSbjt: string,
	fdFilePathImg: string,
	depPlace: string,
	fdYmd: number
}

interface result {
	items: {
		item: list[]
	};
}

interface info {
	[key: string]: string | number | info
}

interface initialState {
	data: result | null,
	loading: boolean,
	error: ErrorClass | null
}

export const getLossList = createAsyncThunk<result, info, {rejectValue: (ErrorClass) }>('LossSlice/getLossList', async (payload, { rejectWithValue }) => {
	let type: string | null = null;
	let params: info | null = null;

	if(payload.type == 'list') {
		type = 'getPtLosfundInfoAccToClAreaPd';
	} else if (payload.type == 'info') {
		type = 'getPtLosfundDetailInfo';
	}

	if(typeof payload.params == 'object' && typeof service == 'string') {
		params = payload.params;
		params.serviceKey = service;
	}

	try {
		const response = await axios.get(`${API_URL}/${type}`, {
			params: params
		});
		return response.data.response.body;
	} catch (err) {
		if(err instanceof ErrorClass) {
			return rejectWithValue(err);
		}
	}

});

const LossSlice = createSlice({
	name: 'LossSlice',
	initialState: {
		data: null,
		loading: false,
		error: null
	} as initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getLossList.pending, (state, {payload}) => {
			state.loading = true;
		}).addCase(getLossList.fulfilled, (state, {payload}) => {
			state.loading = false;
			state.data = payload;
		}).addCase(getLossList.rejected, (state, {payload}) => {
			state.loading = false;
			if(typeof payload !== 'undefined') {
				state.error = payload;
			}
		});
	}
});

export default LossSlice.reducer;