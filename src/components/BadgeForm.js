import React from 'react';

class BadgeForm extends React.Component {
    handleChange = e => {
        // console.log({
        //     name: e.target.name,
        //     value: e.target.value
        // });
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = e => {
        console.log('button was clicked!');
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log('Form was submitted!');
    }

    render(){
        return (
            <div>
                <h1>New attendant</h1>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label>First name</label>
                        <input onChange={this.props.onChange} value={this.props.formValues.firstName} className="form-control" type="text" name="firstName"/>
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <input onChange={this.props.onChange} value={this.props.formValues.lastName} className="form-control" type="text" name="lastName"/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input onChange={this.props.onChange} value={this.props.formValues.email} className="form-control" type="email" name="email"/>
                    </div>
                    <div className="form-group">
                        <label>Job title</label>
                        <input onChange={this.props.onChange} value={this.props.formValues.jobTitle} className="form-control" type="text" name="jobTitle"/>
                    </div>

                    <button onClick={this.handleClick} value={this.state} className="btn btn-primary">Save</button>
                </form>
            </div>
        );
    }
}

export default BadgeForm;