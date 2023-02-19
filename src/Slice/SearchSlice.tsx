import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://apis.data.go.kr/1320000/CmmnCdService/getThngClCd";
const service = process.env.REACT_APP_CODE_SERVICE;

class ErrorClass extends Error {
    response?: {
        data: any;
        status: number;
        headers: string;
    };
}

interface list {
	prdtCd: string,
	prdtNm: string,
	hiPrdtCd: string,
}

interface result {
	items: {
		item: list[] | list
	};
}

interface info {
    [key: string]: string | number;
}

interface initialState {
    data: list[] | null;
    loading: boolean;
    error: unknown | null;
}

export const getCode = createAsyncThunk<result, info, { rejectValue: ErrorClass }>("SearchSlice/getCode", async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(API_URL, {
			params: {
				serviceKey: service,
				PRDT_CL_CD_01: payload.kind
			}
		});
        return response.data.response.body;
    } catch (err) {
        if (err instanceof ErrorClass) {
            return rejectWithValue(err);
        }
    }

});

const SearchSlice = createSlice({
    name: "SearchSlice",
    initialState: {
        data: null,
        loading: false,
        error: null,
    } as initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCode.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(getCode.fulfilled, (state, { payload }) => {
                state.loading = false;
				if (Array.isArray(payload.items.item)) {
					state.data = payload.items.item;
				} else {
					let result = [];
					result.push(payload.items.item);
					state.data = result;
				}
            })
            .addCase(getCode.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export default SearchSlice.reducer;
