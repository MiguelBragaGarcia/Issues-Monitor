import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'; // Importa os icones de aplicações
import { Link } from 'react-router-dom'; // Biblioteca responsável pelo roteamento dos nossos links

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

import api from '../../services/api';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        error: null,
    };

    // Carregar os dados do localStorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({
                repositories: JSON.parse(repositories),
            });
        }
    }

    // Salvar os dados no localStorage
    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;

        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ loading: true, error: false });
        try {
            const { newRepo, repositories } = this.state;
            if (newRepo === '') {
                const error = 'Você precisa adicionar um repositório'; // O throw seguindo boas práticas pode ser feito dessas maneiras com ou sem o objeto error
                throw error;
            }

            const hasRepo = await repositories.find(f => f.name === newRepo); // Busca nos repositórios se já existe o repositório que foi requisitado
            if (hasRepo) {
                throw new Error('Repositório duplicado'); // O throw seguindo boas práticas pode ser feito dessas maneiras com ou sem o objeto error
            }

            const response = await api.get(`/repos/${newRepo}`);
            const data = {
                name: response.data.full_name,
            };

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                loading: false,
            });
        } catch (error) {
            this.setState({ error: true }); // Mostra que deu erro
        } finally {
            this.setState({ loading: false }); // Libera o botão do aplicativo
        }
    };

    render() {
        const { newRepo, repositories, loading, error } = this.state;
        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form error={error} onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Adiconar repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>

                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}
