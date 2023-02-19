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
import { getList } from "../Slice/LossSlice";

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

		.title {
			p {
				font-size: 25px;
				font-weight: 600;
			}
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

const LossView = memo(() => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.LossSlice);

    useEffect(() => {
        if (id != undefined) {
            dispatch(getList({ type: "info", params: { ATC_ID: id} }));
        }
    }, []);

    return (
        <Container>
            <Spinner visible={loading} />
            {(data && data.item) ? (
                <div className="box">
					<div className="title">
						<p>{data.item.lstSbjt}</p>
					</div>
                    <div className="info">
                        <img src={data.item.lstFilePathImg} alt="물건 이미지" />
                        <div className="infoBox">
                            <p>분실물물 이름: {data.item.lstPrdtNm}</p>
                            <p>분실 장소: {data.item.lstPlace}</p>
                            <p>분실 날짜: {data.item.lstYmd}</p>
                        </div>
                    </div>
                    <div className="content">
                        <p>특이사항</p>
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

export default LossView;
