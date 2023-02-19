import React, { memo, useEffect, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import classNames from "classnames";

// 커스텀 훅
import { useAppDispatch, useAppSelector } from "../Hook";

// 미디어 쿼리
import mq from "../MediaQuery";

// 슬라이스
import { getLossList } from "../Slice/GetSlice";

// 로딩바
import Spinner from "../Spinner";

const Container = styled.div`
    width: 100%;
    height: 100%;

	.box {
		width: 100%;
		height: 100%;
		padding: 40px;
		box-sizing: border-box;

		p {
			font-size: 14px;
			margin-bottom: 20px;
			font-family: "MaruBuri";
		}

		.info {
			display: flex;
			align-items: center;

			img {
				width: 300px;
				height: 300px;
				margin-right: 20px;
			}
		}

		.content {
			margin-top: 50px;
		}

		.none {
			text-align: center;
			margin-top: 250px;
		}
	}

	${mq.maxWidth('sm')`
		.box {
			p {
				font-size: 13px;
			}
			.info {
				img {
					width: 150px;
					height: 150px;
				}
			}
		}
	`}
`;

const GetView = memo(() => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.GetSlice);

    useEffect(() => {
        const key = id?.split("-");

        if (key != undefined) {
            dispatch(getLossList({ type: "info", params: { ATC_ID: key[0], FD_SN: key[1] } }));
        }
    }, []);

    return (
        <Container>
            <Spinner visible={loading} />
            {(data && data.item) ? (
                <div className="box">
                    <div className="info">
                        <img src={data.item.fdFilePathImg} alt="물건 이미지" />
                        <div className="infoBox">
                            <p>습득물 이름: {data.item.fdPrdtNm}</p>
                            <p>현재 상태: {data.item.csteSteNm}</p>
                            <p>습득 장소: {data.item.depPlace}</p>
                            <p>습득 날짜: {data.item.fdYmd}</p>
                            <p>보관 장소: {data.item.orgNm}</p>
                            <p>전화번호: {data.item.tel}</p>
                        </div>
                    </div>
                    <div className="content">
                        <p>안내말씀</p>
                        <p>{data.item.uniq}</p>
                    </div>
                </div>
            ) : (
				<div className="box">
					<div className="none">
						<p>상세 정보가 없습니다.</p>
					</div>
				</div>
			)}
        </Container>
    );
});

export default GetView;
