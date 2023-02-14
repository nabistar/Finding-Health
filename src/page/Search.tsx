import React, { memo } from 'react';
import styled from 'styled-components';

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

    .searchBox {
        width: 60%;
        height: 70%;
		margin: auto;
		margin-top: 8%;
		background-color: rgba(255, 255, 255, 0.8);
        animation-duration: 2s;
        animation-name: open;
		padding-top: 15%;
		box-sizing: border-box;
    }

    ${mq.maxWidth("sm")`
		.searchBox {
			width: 80%;
			margin-top: 20%;
			padding-top: 45%;
		}

	`}
`;

const Search = memo(() => {
	return (
		<Container>
			<div className='searchBox'>

			</div>
		</Container>
	);
});

export default Search;