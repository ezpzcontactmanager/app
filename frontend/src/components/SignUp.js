import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Form, Container, FormGroup, Label, Input, Button, Badge, ButtonGroup, Fade } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

var token = '';
var errorMsg = '';

function AlertBanner(props){

    if (!props.alert){
        return null;
    }

    return (
        <div>
            <Alert color='warning'>The username you've entered already exists.</Alert>
        </div>
    );
}

class SignUp extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            alert: false,
            signUpAllow: false
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    stuff(e){
        console.log(token);
    }
    
    onSignUp = async event =>{

        console.log('SignUp clicked.');
        console.log('Username is ', this.state.username);
        console.log('Password is ', this.state.password);

        const loginDetails = {
            username: this.state.username,
            password: this.state.password
        };

        errorMsg = '';

        await axios.post("http://localhost:5000/signup", loginDetails).then(res => console.log(res))
                .catch(error => errorMsg = error.response.data.msg);
        
        this.setState({signUpAllow: true});

        if (errorMsg)
        {
            this.setState({
                alert: true,
                signUpAllow: false
            });

            console.log(errorMsg);

            return null;
        }
    }

    render() {

        const ConditionalLink = ({ children, to, condition }) => (condition && to)
        ? <Link to={to}>{children}</Link> : <>{children}</>;

        return (
            <Fade in={true}>
                <Container> 
                    <div className='jumbotron bg-dark text-white'>
                        <h1 className="display-3">Sign up</h1>
                    </div>
                    <Form>
                        <div>
                            <FormGroup>
                                <Label for="username" className="float-left" size = "lg">Username: </Label>
                                <Input type="text" name="username" id="username" placeholder="Please enter your username"
                                        onChange={this.onChangeUsername}></Input>
                                <AlertBanner alert={this.state.alert}/>
                            </FormGroup>
                            <br/>
                            <FormGroup>
                                <Label for="password" className="float-left" size = "lg">Password: </Label>
                                <Input type="password" name="password" id="password" placeholder="Please enter your password"
                                        onChange={this.onChangePassword}></Input>
                            </FormGroup>
                        </div>
                        <div>
                            <br/>
                            <ButtonGroup>
                                    <ConditionalLink
                                        children={<Button color="primary" size="lg" onClick={this.onSignUp}>Sign Up</Button>}
                                        to='/'
                                        condition={this.state.signUpAllow}
                                    ></ConditionalLink>
                            </ButtonGroup>
                            <div>
                            <br></br>
                            <Link to="/">
                                <Button color='link'><Badge color='link' size='lg'>Back to Log In</Badge></Button>
                            </Link>
                        </div>
                        </div>
                    </Form>
                </Container>
            </Fade> 
        )
    }
}

export default SignUp;