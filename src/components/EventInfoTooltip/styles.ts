import styled from "styled-components";

export const Container = styled.div`
    .song-name {
        margin: 0px;
    }

    .bonus {
        color: blue;
    }

    .action {
        margin-top: 16px;
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