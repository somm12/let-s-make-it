import styled from "@emotion/styled";

const ListDiv = styled.div`
  // display: flex;
  justify-content: space-between;
  align-items: center;
  color: grey;
  margin: 30px;
  border: 1px solid black;

  a {
    text-decoration: none;
    color: black;
  }

  img {
    width: 200px;
  }

  box-shadow: 1px 2px gray;
  .userProfile {
    width: 30px;
    border-radius: 30%;
    margin-right: 10px;
  }
  .postListWrapper {
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, auto));
  }
`;

export { ListDiv };
