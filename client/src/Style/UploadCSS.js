import styled from "@emotion/styled";

const UploadButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 0px;
  button {
    border-radius: 0.5rem;
    border: 1px solid black;
    background-color: black;
    color: white;
    &:hover {
      color: black;
      background-color: white;
    }
  }
`;

const UploadForm = styled.form`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  input {
    border-radius: 0.5rem;
    border: 1px solid gray;
    &:focus,
    &:active {
      outline: none;
    }
    padding-left: 0.5rem;
  }
  textarea {
    min-height: 25rem;
    resize: none;
    border-radius: 0.5rem;
    border: 1px solid gray;
    &:focus,
    &:active {
      outline: none;
    }
    padding-left: 0.5rem;
  }
`;

const UploadDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export { UploadButtonDiv, UploadForm, UploadDiv };
