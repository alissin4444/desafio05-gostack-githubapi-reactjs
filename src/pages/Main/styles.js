import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 3px;
    color: #ff3838;
    font-weight: 600;
    line-height: 1.4;
  }

  div {
    display: flex;
    flex: 1;
    flex-direction: row;
  }

  input {
    flex: 1;
    border: 1px solid ${props => (props.failValidate ? "#ff3838" : "#eeeeee")};
    border-radius: 4px;
    font-size: 16px;
    padding: 8px 8px;
    color: #888;
    &::placeholder {
      color: #888;
    }
    &:focus {
      border: 1px solid ${props => (props.failValidate ? "#ff3838" : "#666666")};
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: "submit",
  disabled: props.loading || props.disabled
}))`
  background: #7158e2;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  margin-top: 10px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7158e2;
      font-weight: 600;
    }
  }
`;
