import React, { Component } from 'react';
import { Form, Container, FormGroup, Label, Alert, Input, Button, Fade, ButtonGroup, Jumbotron, Badge, UncontrolledAlert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

var token = '';
var errorMsg = '';
var _username = '';
var _password = '';

function UserAlertBanner(props){

    if (!props.alert){
        return null;
    }

    if (props.userError)
    {
        return (
            <div>
                <Alert color='warning'>The username you've entered does not exist.</Alert>
            </div>
        );
    }

    return null;
}

function PassAlertBanner(props){

    if (!props.alert){
        return null;
    }

    if (props.passError)
    {
        return (
            <div>
                <Alert color='warning'>The password you've entered is inccorect.</Alert>
            </div>
        );
    }

    return null;
}

class LogInCredentials extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '' ,
            token: '',
            loginAllow: false,
            alert: false,
            userError: false,
            passError: false,
            errorVis: {}
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
        _username = e.target.value;
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
        _password = e.target.value;
    }

    onLogin = async event => {

        const loginDetails = {
            username: this.state.username,
            password: this.state.password
        };

        await axios.post("http://localhost:5000/login", loginDetails)
                .then(res => (this.setState({token: res.data.token, loginAllow: true}), this.props.callback(res.data.token)))
                .catch(error => errorMsg = error.response.data.message);

        this.setState({
            userError: false,
            passError: false
        })
        
        if (errorMsg)
        {
            this.setState({
                alert: true
            });

            console.log(errorMsg);
            if (errorMsg.localeCompare("Username not found") == 0)
            {
                this.setState({
                    userError: true
                })
            }

            if (errorMsg.localeCompare("Incorrect Password") == 0)
            {
                this.setState({
                    passError: true
                })
            }

            return null;
        }
    }

    render() { 

        const ConditionalLink = ({ children, to, condition }) => (condition && to)
            ? <Link to={to}>{children}</Link> : <>{children}</>;
        
        return(
            <div>
                <Container>
                    <Fade in = {true}>
                        <div>
                            <Jumbotron fluid>
                                <Container fluid>
                                    <h1 className="display-3">EZ-PZ Contact Manager</h1>
                                </Container>
                            </Jumbotron>
                        </div>
                    </Fade>
                    <Form>
                        <Fade in={true}>
                        <FormGroup>
                            <Label for="username" className="float-left" size = "lg">Username:</Label>
                            <Input type="text" name="username" id="username" placeholder="Please enter your username"
                                    onChange={this.onChangeUsername}></Input>
                            <UserAlertBanner alert={this.state.alert} userError={this.state.userError} errorVis={this.state.errorVis}></UserAlertBanner>
                        </FormGroup>
                        <br></br>
                        <FormGroup>
                            <Label for="password" className="float-left" size = "lg">Password:</Label>
                            <Input type="password" name="password" id="password" placeholder="Please enter your password"
                                    onChange={this.onChangePassword}></Input>
                            <PassAlertBanner alert={this.state.alert} passError={this.state.passError} errorVis={this.state.errorVis}></PassAlertBanner>
                        </FormGroup>
                        <br></br>
                        <ButtonGroup>
                            <ConditionalLink 
                                children={<Button color="primary" size="lg" onClick={this.onLogin}>Log In</Button>} 
                                to='/mainpage' 
                                condition={this.state.loginAllow}>
                            </ConditionalLink>
                        </ButtonGroup>
                        <div>
                            <br></br>
                            <Link to="/signup">
                                <Button color='link'><Badge color='link' size='lg'>Sign up</Badge></Button>
                            </Link>
                        </div>
                        </Fade>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default LogInCredentials;