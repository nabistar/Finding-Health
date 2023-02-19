import React, { memo, useEffect, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { NavLink, Route, Routes } from "react-router-dom";
import dayjs from "dayjs";
import classNames from "classnames";

// 커스텀 훅
import { useAppDispatch, useAppSelector } from "../Hook";

// 미디어 쿼리
import mq from "../MediaQuery";

// 슬라이스
import { getList } from "../Slice/LossSlice";
import { getCode } from "../Slice/SearchSlice";

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
        z-index: 9999;
        display: none;

        &.visible {
            display: block;
        }

        .searchBox {
            width: 400px;
            height: 400px;
            background-color: #fff;
            border: 1px solid #000;
            margin: auto;
            margin-top: 150px;

            form {
                width: 100%;
                height: 100%;
                padding: 40px;
                box-sizing: border-box;
                text-align: left;

                p {
                    font-family: "KyoboHandwriting2020A";
                    font-weight: bold;
                    font-size: 12px;
                }

                select,
                input {
                    border: none;
                    outline: none;
                    font-size: 12px;
                    margin-top: 5px;
                }

                div {
                    margin: 0 auto 20px;
                }

                .date {
                    display: flex;
                    justify-content: space-evenly;
                }

                .place,
                .kind {
                    margin-left: 30px;
                    margin-bottom: 40px;
                }

                .kind {
                    select {
                        margin-right: 5px;
                    }
                }

                button[type="submit"] {
                    display: block;
                    width: 100px;
                    height: 30px;
                    margin: 60px auto 0;
                }
            }
        }
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

				a {
					text-decoration: none;
					color: #000;

					&:hover {
						color: #33b7c3;
					}
				}
            }
        }
    }

    ${mq.maxWidth("sm")`
		.list {
			table {
				th, td {
					padding: 0;
				}
			}
		}

	`}
`;

interface keyword {
    type: string;
    params: {
        pageNo: number;
        numOfRows: number;
        START_YMD?: string;
        END_YMD?: string;
        PRDT_CL_CD_01?: string;
        PRDT_CL_CD_02?: string;
        LST_LCT_CD?: string;
    };
}

const Loss = memo(() => {
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.LossSlice);
    const { data: data2 } = useAppSelector((state) => state.SearchSlice);
    const [count, setCount] = useState(1);
    const [pop, setPop] = useState(false);
    const [keyword, setKeyword] = useState<keyword>({type: 'list', params: {pageNo: 1, numOfRows: 10, START_YMD: dayjs().format("YYYYMMDD"), END_YMD: dayjs().format("YYYYMMDD")}});

    const search = useMemo(() => {
        return {type: 'list', params: {...keyword.params, pageNo: count}};
    }, [count, keyword]);

    useEffect(() => {
        dispatch(getList(search));
    }, [search]);

    const plus = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    const minus = useCallback(() => {
        if (count - 1 != 0) {
            setCount(count - 1);
        }
    }, [count]);

    const kindChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
        const current: string = e.target.value;
        dispatch(getCode({ kind: current }));
    }, []);

    const onPop = useCallback(() => {
        setPop(!pop);
    }, [pop]);

    const searchSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const current = e.currentTarget;
        const startDate: Date = current.startDate.value;
        const endDate: Date = current.endDate.value;
        const place: string = current.place.value;
        const kind1: string = current.kind1.value;
        const kind2: string = current.kind2.value;

        let params = {
            type: "list",
            params: {
                pageNo: 1,
                numOfRows: 10,
                START_YMD: dayjs(startDate).format("YYYYMMDD"),
                END_YMD: dayjs(endDate).format("YYYYMMDD"),
                PRDT_CL_CD_01: kind1,
                PRDT_CL_CD_02: kind2,
                N_FD_LCT_CD: place,
            },
        };

		dispatch(getList(params));
		setKeyword(params);
		setPop(!pop);
    }, [pop]);

    return (
        <Container>
            <Spinner visible={loading} />
            <div className={classNames("pop", { visible: pop })}>
                <div className="searchBox">
                    <button type="button" onClick={onPop}>
                        닫기
                    </button>
                    <form onSubmit={searchSubmit}>
                        <div className="date">
                            <div className="startdate">
                                <p>시작 날짜</p>
                                <input type="date" name="startDate" />
                            </div>
                            <div className="enddate">
                                <p>종료 날짜</p>
                                <input type="date" name="endDate" />
                            </div>
                        </div>
                        <div className="place">
                            <p>습득 지역</p>
                            <select defaultValue="" name="place">
                                <option value="">지역을 선택하세요.</option>
                                <option value="LCA000">서울특별시</option>
                                <option value="LCH000">강원도</option>
                                <option value="LCI000">경기도</option>
                                <option value="LCJ000">경상남도</option>
                                <option value="LCK000">경상북도</option>
                                <option value="LCQ000">광주광역시</option>
                                <option value="LCR000">대구광역시</option>
                                <option value="LCS000">대전광역시</option>
                                <option value="LCT000">부산광역시</option>
                                <option value="LCU000">울산광역시</option>
                                <option value="LCV000">인천광역시</option>
                                <option value="LCL000">전라남도</option>
                                <option value="LCM000">전라북도</option>
                                <option value="LCN000">충청남도</option>
                                <option value="LCO000">충청북도</option>
                                <option value="LCP000">제주특별자치도</option>
                                <option value="LCW000">세종특별자치시</option>
                                <option value="LCF000">해외</option>
                                <option value="LCE000">기타</option>
                            </select>
                        </div>
                        <div className="kind">
                            <p>물품 분류</p>
                            <select defaultValue="" onChange={kindChange} name="kind1">
                                <option value="">대분류를 선택하세요.</option>
                                <option value="PRA000">가방</option>
                                <option value="PRB000">도서용품</option>
                                <option value="PRC000">서류</option>
                                <option value="PRD000">산업용품</option>
                                <option value="PRE000">스포츠용품</option>
                                <option value="PRF000">자동차</option>
                                <option value="PRG000">전자기기</option>
                                <option value="PRH000">지갑</option>
                                <option value="PRI000">컴퓨터</option>
                                <option value="PRJ000">휴대폰</option>
                                <option value="PRK000">의류</option>
                                <option value="PRM000">유가증권</option>
                                <option value="PRN000">증명서</option>
                                <option value="PRO000">귀금속</option>
                                <option value="PRP000">카드</option>
                                <option value="PRQ000">쇼핑백</option>
                                <option value="PRR000">악기</option>
                                <option value="PRX000">유류품</option>
                                <option value="PRZ000">기타물품</option>
                            </select>
                            <select defaultValue="" name="kind2">
                                <option value="">소분류를 선택하세요.</option>
                                {data2 &&
                                    data2.map((v, i) => {
                                        return (
                                            <option key={i} value={v.prdtCd}>
                                                {v.prdtNm}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <button type="submit">검색하기</button>
                    </form>
                </div>
            </div>
            <button type="button" className="search" onClick={onPop}>
                검색하기
            </button>
            <div className="list">
                <button type="button" className="left" onClick={minus}>
                    &#171;
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>분실지역</th>
                            <th>분실물명</th>
                            <th>분실일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data && data.items) &&
                            data.items.item.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td><NavLink to={`/lossItemview/${v.atcId}`}>{v.lstSbjt}</NavLink></td>
                                        <td>{v.lstPlace}</td>
                                        <td>{v.lstPrdtNm}</td>
                                        <td>{v.lstYmd}</td>
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

export default Loss;
