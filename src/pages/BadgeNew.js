import React from 'react';
import logo from '../images/badge-header.svg';
import './styles/BadgeNew.css';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';

class BadgeNew extends React.Component {
    state = { 
        form: {
            firstName: '',
            lastName: '',
            email: '',
            jobTitle: ''
        }
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

    render(){
        return (
            <React.Fragment>
                <div className="BadgeNew__hero">
                    <img className="img-fluid" src={logo} alt="Logo"></img>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Badge 
                                firstName={this.state.form.firstName}
                                lastName={this.state.form.lastName} 
                                jobTitle={this.state.form.jobTitle}
                                email={this.state.form.email}
                                avatarURL="https://www.gravatar.com/avatar/085839200d7033ae4dcbc3138de57f46"/>
                        </div>
                        <div className="col-6">
                            <BadgeForm onChange={this.handleChange} formValues={this.state.form} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BadgeNew;