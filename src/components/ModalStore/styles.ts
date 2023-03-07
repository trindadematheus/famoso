import styled from "styled-components";

export const Container = styled.div`
    background-color: #222;
    padding: 20px;
    border-radius: 10px;
    width: 400px;

    .title {
        color: #eee;
        font-size: 18px;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #333;
    }
`

export const List = styled.div`
    height: 400px;

    display: flex;
    flex-direction: column;
    gap: 14px;
`

export const Item = styled.div`
    padding-bottom: 10px;
    border-bottom: 1px solid #333;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .song-name {
        font-size: 16px;
        color: #eee;
    }

    .artist-name {
        font-size: 14px;
        color: #aaa;
    }

    .attr {
        font-size: 14px;
        color: #aaa;
    }

    .buy {
        background-color: #3483fa;
        padding: 8px 20px;
        border-radius: 4px;
        font-weight: bold;

        transition: all 400ms;

        :hover {
            opacity: 0.7;
        }

        :disabled {
            background-color: gray;
        }
    }
`