import React from 'react';
import './styles/BadgeDetails.css'
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import api from '../api';
import BadgeDetails from './BadgeDetails';

class BadgeDetailsContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        data: undefined
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ loading: true, error: null });

        try {
            const data = await api.badges.read(
                this.props.match.params.badgeId
            )
            this.setState({ loading: false, data });
        } catch (e) {
            this.setState({ loading: false, error: e.message });
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <React.Fragment>
                    <PageLoading />
                </React.Fragment>
            )
        }

        if (this.state.error) {
            return (
                <React.Fragment>
                    <PageError error={this.state.error} />
                </React.Fragment>
            );
        }

        return (
            <BadgeDetails badge={this.state.data} />
        )
    }
}

export default BadgeDetailsContainer;