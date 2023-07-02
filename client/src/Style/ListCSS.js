import styled from "@emotion/styled";

const ListDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: grey;
  width: 100%;
  margin: 30px;
  border: 1px solid black;

  a {
    text-decoration: none;
    color: black;
  }

  box-shadow: 1px 2px gray;
  .userProfile {
    width: 30px;
    border-radius: 30%;
    margin-right: 10px;
  }
  .postListWrapper {
  }
`;

export { ListDiv };
