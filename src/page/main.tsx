import React, { memo } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// 미디어 쿼리
import mq from "../MediaQuery";

// 이미지 import
import back from "../img/back.jpg";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: url(${back}) no-repeat;
	background-size: 100% 100%;
    display: flex;

    @keyframes open {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .healthicon {
        width: 60%;
        height: 70%;
		margin: auto;
		margin-top: 8%;
		background-color: rgba(255, 255, 255, 0.8);
        animation-duration: 2s;
        animation-name: open;
		padding-top: 15%;
		box-sizing: border-box;

        h1,
        a {
            text-align: center;
            font-family: "KyoboHandwriting2020A";
        }

        h1 {
            font-weight: bold;
            font-size: 60px;
        }

        a {
			width: 100px;
            text-decoration: none;
            display: block;
			margin: auto;
            margin-top: 80px;
            font-size: 20px;

            &:hover {
                color: #33B7C3;
            }
        }
    }

    ${mq.maxWidth("sm")`
		.healthicon {
			width: 80%;
			margin-top: 20%;
			padding-top: 45%;

				h1 {
				font-size: 35px;
			}
		}

	`}
`;

const main = memo(() => {
    return (
        <Container>
            <div className="healthicon">
                <h1>국가 건강 검진 기관 찾기</h1>
                <NavLink to="/finding">찾으러 가기</NavLink>
            </div>
        </Container>
    );
});

export default main;
