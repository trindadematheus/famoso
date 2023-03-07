import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: #111;
    height: 100vh;
`

export const Container = styled.div`
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    .input {
        height: 40px;
        width: 250px;
        padding: 0px 10px;
    }

    .btn {
        background-color: #3483fa;
        height: 50px;
        width: 250px;
        margin-top: 12px;
        color: black;
        font-weight: bold;

        transition: all 400ms;

        :hover {
            opacity: 0.7;
        }
    }
`