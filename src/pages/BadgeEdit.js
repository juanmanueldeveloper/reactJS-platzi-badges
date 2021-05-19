import React from 'react';
import logo from '../images/platziconf-logo.svg';
import './styles/BadgeEdit.css';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import api from '../api';
import PageLoading from '../components/PageLoading';

class BadgeEdit extends React.Component {
    state = {
        loading: true,
        error: null,
        form: {
          firstName: '',
          lastName: '',
          email: '',
          jobTitle: '',
          twitter: '',
        },
      };

    componentDidMount(){
        this.fetchData();
    }

    fetchData = async e => {
        this.setState({ loading: true, error: null});
        try {
            const data = await api.badges.read(this.props.match.params.badgeId);
            this.setState({loading: false, form: data});
        } catch (error) {
            this.setState({ loading: true, error});
        }
    }

    handleChange = e => {
        // const nextForm = this.state.form;
        // nextForm[e.target.name] = e.target.value;
        
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ loading: true, error: null });

        try {
            await api.badges.update(this.props.match.params.badgeId, this.state.form);
            this.setState({loading: false});
            this.props.history.push('/badges');
        } catch (error) {
            this.setState({loading: false, error})
        }
    }

    render(){
        if(this.state.loading){
            return (
                <React.Fragment>
                    <PageLoading/>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <div className="BadgeEdit__hero">
                    <img className="BadgeEdit__hero-image img-fluid" src={logo} alt="Logo"></img>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Badge 
                                firstName={this.state.form.firstName || 'FIRST_NAME'}
                                lastName={this.state.form.lastName || 'LAST_NAME'} 
                                jobTitle={this.state.form.jobTitle || 'JOB_TITLE'}
                                email={this.state.form.email || 'EMAIL'} />
                        </div>
                        <div className="col-6">
                            <h1>Edit attendant</h1>
                            <BadgeForm 
                                onChange={this.handleChange} 
                                onSubmit={this.handleSubmit} 
                                formValues={this.state.form} 
                                error={this.state.error} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BadgeEdit;