import styled from "styled-components";

export const Container = styled.div`
  .song-name {
    margin: 0px;
    font-weight: bold;
    font-size: 16px;
  }

  .song-data {
    margin: 0px;
  }

  .bonus {
    color: blue;
  }

  .action {
    margin-top: 16px;
    background-color: #3483fa;
    color: black;
    font-weight: bold;
    padding: 8px 40px;
    border-radius: 4px;

    transition: all 400ms;

    :hover {
      opacity: 0.9;
    }
  }
`;
