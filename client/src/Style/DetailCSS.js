import styled from "@emotion/styled";

const PostWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  padding: 0 1rem;
`;
const PostDiv = styled.div`
  .title {
    font-size: 1.5rem;
  }
  border: 1px solid gray;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  img {
    width: 100%;
    height: auto;
  }
`;
const BtnDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  .editBtn {
    border-radius: 2rem;
    margin-right: 0.5rem;
    border: 1px solid gray;
    padding: 0.5rem;
    background-color: white;
    &:hover {
      background-color: black;
      color: white;
    }
  }
  .deleteBtn {
    border-radius: 2rem;
    padding: 0.5rem;
    border: none;
    background-color: red;
    &:hover {
      background-color: white;
      color: red;
    }
  }
`;
export { PostDiv, BtnDiv, PostWrapperDiv };
