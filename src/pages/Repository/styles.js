import styled from "styled-components";

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const BackButton = styled.div`
  a {
    color: #7158e2;
    text-transform: uppercase;
    font-weight: 600;
  }
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 30px;
  border-top: 1px solid #eee;
  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;
      strong {
        font-size: 16px;
        a {
          color: #333;
          &:hover {
            color: #7158e2;
          }
        }
        span {
          background: #eee;
          color: #7158e2;
          border-radius: 2px;
          font-weight: 600;
          font-size: 12px;
          padding: 4px 10px;
          margin-left: 10px;
        }
      }
      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
  > p {
    font-weight: 600;
    color: #888;
    text-align: center;
    text-transform: uppercase;
  }
`;

export const Filter = styled.div`
  margin: 40px 0 10px 0;
  h1 {
    font-size: 14px;
    margin-bottom: 5px;
  }
  ul {
    display: flex;
    flex-direction: row;
  }
`;

export const FilterLi = styled.li`
  font-size: 12px;
  cursor: pointer;

  font-weight: 600;
  color: ${props => (props.active ? "#7158e2" : "#888888")};
  padding-bottom: 5px;
  border-bottom: ${props => (props.active ? "2px solid #7158e2" : "none")};
  & + li {
    margin-left: 10px;
  }
`;

export const Paginate = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: 600;
  span {
    margin: 0 15px;
  }

  button {
    padding: 10px 20px;
    color: #fff;
    background-color: #7158e2;
    border-radius: 4px;
    border: none;
  }

  button:first-child {
    color: #7158e2;
    background-color: rgba(113, 88, 226, 0.1);

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;
