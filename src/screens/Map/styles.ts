import styled from 'styled-components'

export const Wrapper = styled.div`
    background-color: black;
    height: calc(100vh - 50px);
    width: 100%;
`

export const Menu = styled.div`
    background-color: #111;
    height: 50px;
    width: 100%;
`

export const MenuContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
    height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const LeftContent = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    .singer-name {
        color: white;
        font-size: 18px;
    }

    p {
        font-size: 12px;
    }

    .promoter {
        color: #bbb;
    }

    .level {
        color: green;
    }

    .money {
        color: yellow;
    }
`

export const RightContent = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    .btn-menu {
        background: white;
        padding: 8px 20px;
        border-radius: 4px;
        font-weight: bold;
        color: black;

        transition: all 400ms;

        :hover {
            background-color: #bbb;
        }
    }
`