import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

// page import
import Research from "./Research";
import Loss from "./Loss";
import Get from "./Get";
import GetView from './GetView';
import LossView from './LossView';

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
	flex-direction: column;

    @keyframes open {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .tab {
		width: 60%;
		height: 30px;
		margin: 120px auto 0;
		display: flex;
		animation-duration: 2s;
        animation-name: open;

        a {
            width: 100px;
            height: 100%;
            text-decoration: none;
            display: block;
            font-size: 14px;
			text-align: center;
			background-color: rgba(255, 255, 255, 0.8);
			color: #000;
			padding-top: 8px;
			box-sizing: border-box;
			margin-right: 10px;
			font-family: 'KyoboHandwriting2020A';

            &:hover {
                color: #33b7c3;
            }

			&.active {
				background-color: rgba(220, 255, 201, 0.8);
				font-weight: bold;
			}
        }
    }

    .main {
        width: 60%;
        height: 70%;
        margin: 0 auto 0;
        background-color: rgba(255, 255, 255, 0.8);
        animation-duration: 2s;
        animation-name: open;
        box-sizing: border-box;
    }

    ${mq.maxWidth("sm")`
		.main {
			width: 80%;
		}

	`}
`;

const main = memo(() => {

	const navigate = useNavigate();

	useEffect(() => {
		navigate('/main');
	}, []);

    return (
        <Container>
            <nav className="tab">
                <NavLink to="main">메인</NavLink>
				<NavLink to="lossItem">분실물</NavLink>
				<NavLink to="getItem">습득물</NavLink>
            </nav>
            <div className="main">
				<Routes>
					<Route path="main" element={<Research />} />
					<Route path="lossItem" element={<Loss />} />
					<Route path="getItem" element={<Get />} />
					<Route path="getItemview/:id" element={<GetView />} />
					<Route path="lossItemview/:id" element={<LossView />} />
				</Routes>
			</div>
        </Container>
    );
});

export default main;
