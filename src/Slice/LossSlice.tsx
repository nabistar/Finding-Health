import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://apis.data.go.kr/1320000/LostGoodsInfoInqireService";
const service: string | undefined = process.env.REACT_APP_LOSS_SERVICE;

class ErrorClass extends Error {
    response?: {
        data: any;
        status: number;
        headers: string;
    };
}

interface list {
    atcId: string;
    lstPlace: string;
    lstPrdtNm: string;
    lstSbjt: string;
    lstYmd: string;
    prdtClNm: string;
    rnum: string;
}

interface result {
    items?: {
        item: list[];
    };
    item?: {
        atcId: string;
        lstFilePathImg: string;
        lstHor: string;
        lstLctNm: string;
        lstPlace: string;
        lstPlaceSeNm: string;
        lstPrdtNm: string;
        lstSbjt: string;
        lstYmd: string;
        orgNm: string;
		tel: string;
        uniq: string;
    };
}

interface keyword {
    type: string;
    params: {
        pageNo?: number;
        numOfRows?: number;
        START_YMD?: string;
        END_YMD?: string;
        PRDT_CL_CD_01?: string;
        PRDT_CL_CD_02?: string;
        LST_LCT_CD?: string;
        ATC_ID?: string;
    };
}

interface info {
    [key: string]: string | number | info;
}

interface initialState {
    data: result | null;
    loading: boolean;
    error: ErrorClass | null;
}

export const getList = createAsyncThunk<result, keyword, { rejectValue: ErrorClass }>("LossSlice/getList", async (payload, { rejectWithValue }) => {
    let type: string | null = null;
    let params: info | null = null;

    if (payload.type == "list") {
        type = "getLostGoodsInfoAccToClAreaPd";
    } else if (payload.type == "info") {
        type = "getLostGoodsDetailInfo";
    }

    if (typeof payload.params == "object" && typeof service == "string") {
        params = payload.params;
        params.serviceKey = service;
    }

    try {
        const response = await axios.get(`${API_URL}/${type}`, {
            params: params,
        });
        return response.data.response.body;
    } catch (err) {
        if (err instanceof ErrorClass) {
            return rejectWithValue(err);
        }
    }
});

const LossSlice = createSlice({
    name: "LossSlice",
    initialState: {
        data: null,
        loading: false,
        error: null,
    } as initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getList.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(getList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
            })
            .addCase(getList.rejected, (state, { payload }) => {
                state.loading = false;
                if (typeof payload !== "undefined") {
                    state.error = payload;
                }
            });
    },
});

export default LossSlice.reducer;
