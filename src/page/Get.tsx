import React, { memo, useEffect, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { NavLink, Route, Routes } from "react-router-dom";
import dayjs from "dayjs";

// 커스텀 훅
import { useAppDispatch, useAppSelector } from "../Hook";

// 슬라이스
import { getLossList } from "../Slice/LossSlice";

// 로딩바
import Spinner from "../Spinner";

const Container = styled.div`
    width: 100%;
    height: 100%;
    text-align: right;
	position: relative;

	.pop {
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.8);
		position: absolute;
	}

    button {
        height: 30px;
        margin-bottom: 15px;
        background-color: rgba(156, 245, 108, 0.8);
        border: none;
        outline: none;
        font-family: "KyoboHandwriting2020A";
        font-weight: bold;

        &:hover {
            cursor: pointer;
        }
    }

    .search {
        width: 100px;
        margin-right: 30px;
		margin-top: 20px;
    }

    .left,
    .right {
        width: 30px;
        background-color: transparent;

        &:hover {
            background-color: rgba(156, 245, 108, 0.8);
        }
    }

    .list {
        width: 100%;
        height: 90%;
        display: flex;
        align-items: center;
        table {
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            th,
            td {
                font-size: 14px;
                text-align: center;
                vertical-align: middle;
            }
            th {
                height: 30px;
                font-weight: bold;
                background-color: rgba(220, 255, 201, 0.8);
            }
            td {
                padding: 3px 10px;
                box-sizing: border-box;
                img {
                    width: 50px;
                    height: 50px;
                }
            }
        }
    }
`;

const Get = memo(() => {
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((state) => state.LossSlice);
    const [count, setCount] = useState(1);

    useEffect(() => {
        dispatch(
            getLossList({ type: "list", params: { pageNo: count, numOfRows: 10, START_YMD: dayjs().format("YYYYMMDD"), END_YMD: dayjs().format("YYYYMMDD") } }),
        );
    }, [count]);

    const plus = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    const minus = useCallback(() => {
        if (count - 1 != 0) {
            setCount(count - 1);
        }
    }, [count]);

    return (
        <Container>
            <Spinner visible={loading} />
            <div className="pop">
                <div className="searchBox">
                    <button type="button">닫기</button>
                    <div className="date">
                        <div className="startdate">
                            <p>시작 날짜</p>
                            <input type="date" />
                        </div>
						<div className="enddate">
                            <p>시작 날짜</p>
                            <input type="date" />
                        </div>
                    </div>
					<div className="place">

					</div>
					<div className="kind">

					</div>
                </div>
            </div>
            <button type="button" className="search">
                검색하기
            </button>
            <div className="list">
                <button type="button" className="left" onClick={minus}>
                    &#171;
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>사진</th>
                            <th>물품</th>
                            <th>보관장소</th>
                            <th>습득일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.items.item.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <img src={v.fdFilePathImg} />
                                        </td>
                                        <td>{v.fdPrdtNm}</td>
                                        <td>{v.depPlace}</td>
                                        <td>{v.fdYmd}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <button type="button" className="right" onClick={plus}>
                    &#187;
                </button>
            </div>
        </Container>
    );
});

export default Get;
