import React, { Component } from "react";

import { Link } from "react-router-dom";

import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";

import Container from "../../components/Container";

import { Form, SubmitButton, List } from "./styles";

import api from "../../services/api";

export default class Main extends Component {
  state = {
    newRepo: "",
    repositories: [],
    loading: false,
    disabledButton: true,
    failValidate: false,
    failValidateContent: ""
  };

  // Carregar os dados do localStorage
  UNSAFE_componentWillMount() {
    const repositories = localStorage.getItem("repositories");

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem("repositories", JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    if (e.target.value.length > 5) {
      if (this.state.failValidate === true) {
        this.setState({ failValidate: false });
      }
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { newRepo, repositories } = this.state;

    this.setState({ loading: true });

    let response = [];

    const repoAlreadyExists = repositories.filter(
      repository => repository.name === newRepo
    );

    if (repoAlreadyExists.length > 0) {
      this.setState({
        loading: false,
        newRepo: "",
        failValidateContent: "Repositório já adicionado",
        failValidate: true,
        disabledButton: true
      });

      return false;
    }

    try {
      response = await api.get(`/repos/${newRepo}`);
    } catch (err) {
      this.setState({
        loading: false,
        newRepo: "",
        failValidateContent: "Repositório não encontrado",
        failValidate: true,
        disabledButton: true
      });
      return false;
    }
    const data = {
      name: response.data.full_name
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: "",
      loading: false
    });
  };

  render() {
    const {
      newRepo,
      repositories,
      loading,
      disabledButton,
      failValidate,
      failValidateContent
    } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} failValidate={failValidate}>
          {failValidate && <label>{failValidateContent}</label>}
          <div>
            <input
              type="text"
              placeholder="adicionar repositório"
              value={newRepo}
              onChange={this.handleInputChange}
            />

            <SubmitButton disabled={disabledButton} loading={loading ? 1 : 0}>
              {loading ? (
                <FaSpinner color="#fff" size={14} />
              ) : (
                <FaPlus color="#fff" size={14} />
              )}
            </SubmitButton>
          </div>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                DETALHES
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
