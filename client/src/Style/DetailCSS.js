import styled from "@emotion/styled";

const PostWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  padding: 0 1rem;
`;
const PostDiv = styled.div`
  width: 40%;
  .title {
    font-size: 1.5rem;
    width: 100%;
  }
  h5 {
    font-weight: bold;
  }
  border: 1px solid gray;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  img {
    width: 100%;
    height: auto;
  }
  .titleHeadline {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .bookmarkBtn {
    background-color: white;
    border: 0;
  }

  .userInfo {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
  }
  .thumbNailImgWrapper {
    display: flex;
  }
  .content {
    width: 100%;
    margin-top: 30px;
    .ingredients {
      margin-bottom: 20px;
    }
  }
  .ingredients,
  .wayToCook {
    white-space: pre-line;
  }
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
const BtnDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  .editBtn {
    border-radius: 1rem;
    margin-right: 0.5rem;
    border: 2px solid #2196f3;
    padding: 0.5rem;
    background-color: white;
    &:hover {
      color: #2196f3;
    }
  }
  .deleteBtn {
    border-radius: 1rem;
    padding: 0.5rem;
    border: 2px solid red;
    background-color: #ffffff;
    &:hover {
      background-color: white;
      color: red;
    }
  }
`;
export { PostDiv, BtnDiv, PostWrapperDiv };
