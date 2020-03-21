import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";

class Register extends Component {
  state = {
    username: '',
    password: ''
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  submitFormHandler = event => {
    event.preventDefault();
    this.props.registerUser({...this.state});
  };

  getFieldError = fieldName => {
    try {
      return this.props.error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  render() {
    return (
      <>
        <h2>Register new user</h2>
        <Form onSubmit={this.submitFormHandler}>
          <FormElement
            propertyName="username"
            title="Username"
            value={this.state.username}
            onChange={this.inputChangeHandler}
            error={this.getFieldError('username')}
            placeholder="Enter a desired unique username"
            autoComplete="new-username"
          />
          <FormElement
            propertyName="password"
            title="Password"
            type="password"
            value={this.state.password}
            onChange={this.inputChangeHandler}
            error={this.getFieldError('password')}
            placeholder="Enter password"
            autoComplete="new-password"
          />
          <FormElement
              propertyName="displayName"
              title="Display name"
              type="text"
              value={this.state.displayName}
              onChange={this.inputChangeHandler}
              error={this.getFieldError('displayName')}
              placeholder="Enter a desired display name"
              autoComplete="new-displayName"
          />
          <FormElement
              propertyName="phone"
              title="Phone number"
              type="text"
              value={this.state.phone}
              onChange={this.inputChangeHandler}
              error={this.getFieldError('phone')}
              placeholder="Enter your contact phone number"
              autoComplete="new-phone"
          />
          <FormGroup row>
            <Col sm={{offset: 2, size: 10}}>
              <Button type="submit" color="primary">
                Register
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  error: state.users.registerError,
  loading: state.users.registerLoading,
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);