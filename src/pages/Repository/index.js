import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import Container from "../../components/Container";
import {
  Loading,
  Owner,
  IssueList,
  Filter,
  BackButton,
  FilterLi,
  Paginate
} from "./styles";

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    issuesDisplayed: "all",
    loading: true,
    page_number: 1
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: "all",
          per_page: 5,
          page: this.state.page_number
        }
      })
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false
    });
  }

  handleFilterRepositories = async type => {
    if (type !== this.state.issuesDisplayed) {
      this.setState({
        issuesDisplayed: type
      });
      const response = await api.get(
        `/repos/${this.state.repository.full_name}/issues`,
        {
          params: {
            state: type,
            per_page: 5,
            page: this.state.page_number
          }
        }
      );
      this.setState({
        issues: response.data
      });
    }
  };

  handlePaginateRepositories = async (type, state) => {
    if (type === "NEXT") {
      const response = await api.get(
        `/repos/${this.state.repository.full_name}/issues`,
        {
          params: {
            state: state,
            per_page: 5,
            page: this.state.page_number++
          }
        }
      );
      this.setState({
        issues: response.data,
        page_number: this.state.page_number++
      });
    } else {
      const response = await api.get(
        `/repos/${this.state.repository.full_name}/issues`,
        {
          params: {
            state: state,
            per_page: 5,
            page: this.state.page_number--
          }
        }
      );
      this.setState({
        issues: response.data,
        page_number: this.state.page_number--
      });
    }
  };

  render() {
    const {
      loading,
      issues,
      repository,
      issuesDisplayed,
      page_number
    } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <BackButton>
          <Link to="/">Voltar aos repositórios</Link>
        </BackButton>

        <Owner>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filter>
          <h1>Escolha um filtro para visualização de issues</h1>
          <ul>
            <FilterLi
              active={issuesDisplayed === "all" ? true : false}
              onClick={() => this.handleFilterRepositories("all")}
            >
              TODAS
            </FilterLi>
            <FilterLi
              active={issuesDisplayed === "open" ? true : false}
              onClick={() => this.handleFilterRepositories("open")}
            >
              ABERTAS
            </FilterLi>
            <FilterLi
              active={issuesDisplayed === "closed" ? true : false}
              onClick={() => this.handleFilterRepositories("closed")}
            >
              FECHADAS
            </FilterLi>
          </ul>
        </Filter>

        <IssueList>
          {issues.length > 0 ? (
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {issue.title}
                    </a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhuma issue adicionada até o momento</p>
          )}
        </IssueList>

        <Paginate>
          <button
            onClick={() =>
              this.handlePaginateRepositories("PREVIOUS", issuesDisplayed)
            }
            disabled={page_number === 1 ? true : false}
            type="button"
          >
            Anterior
          </button>
          <span> {page_number} </span>
          <button
            onClick={() =>
              this.handlePaginateRepositories("NEXT", issuesDisplayed)
            }
            type="button"
          >
            Próximo
          </button>
        </Paginate>
      </Container>
    );
  }
}
