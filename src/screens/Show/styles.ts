import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #111;
  height: 100vh;
`;

export const Container = styled.div`
  max-width: 1000px;
  padding-top: 60px;
  padding-bottom: 20px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`;

export const EventData = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #222;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    margin-top: 24px;
    font-size: 24px;
    color: white;
  }

  .actions {
    margin-top: 40px;

    display: flex;
    align-items: center;

    .action {
      height: 40px;
      width: 200px;

      transition: all 400ms;

      :hover {
        opacity: 0.8;
      }
    }

    .danger {
      background-color: rgba(255, 0, 0, 0.7);
      font-weight: bold;
      color: white;
    }
  }
`;

export const TranscriptArea = styled.div`
  font-size: 32px;
  color: #ccc;
  overflow: auto;

  display: flex;
  flex: 1;
`;
