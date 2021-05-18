import React from 'react';
import logo from '../images/platziconf-logo.svg';
import './styles/BadgeNew.css';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import api from '../api';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
class BadgeNew extends React.Component {
    state = {
        loading: false,
        error: null,
        form: {
          firstName: '',
          lastName: '',
          email: '',
          jobTitle: '',
          twitter: '',
        },
      };

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
            await api.badges.create(this.state.form);
            this.setState({loading: false})
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

        if(this.state.error){
            return (
                <React.Fragment>
                    <PageError error={this.state.error}/>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <div className="BadgeNew__hero">
                    <img className="BadgeNew__hero-image img-fluid" src={logo} alt="Logo"></img>
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
                            <BadgeForm onChange={this.handleChange} onSubmit={this.handleSubmit} formValues={this.state.form} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BadgeNew;