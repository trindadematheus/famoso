import styled from "styled-components";

export const Container = styled.div`
    .song-name {
        margin: 0px;
        margin-bottom: 16px;
    }

    .action {
        background-color: #111;
        padding: 8px 40px;
        border-radius: 4px;
        color: white;

        transition: all 400ms;

        :hover {
            opacity: 0.9;
        }
    }
`