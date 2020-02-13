import React, { Component } from 'react';
import ContactList from '../components/ContactList';
import NavigationBar from '../components/NavigationBar';
import Add from '../components/Add';
import SplitPane, { Pane } from 'react-split-pane';
import axios from 'axios';
import { Form, Container, FormGroup, Label, Alert, Input, Button, Fade, ButtonGroup, Jumbotron, Badge, UncontrolledAlert } from 'reactstrap';

var id = ''
var username = ''

class MainPage extends Component 
{
    constructor(props){
        super(props);

        this.state = {
            userToken: '',
            id: '',
            username: '',
            addClick: false
        };

        this.setState({userToken: this.props.token});

        this.handleAddClick = this.handleAddClick.bind(this);
    }

    async componentDidMount(){

        var token = this.props.token;

        await axios.get("https://ezpzcontactmanager.herokuapp.com/me", { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => this.setState({id: res.data._id, username: res.data.username}))
                    .catch(error => console.log(error));

        this.setState({userToken: this.props.token});
        console.log("Token is ", token);
        console.log("ID is ", this.state.id);
        console.log("User is ", this.state.username);
    }

    async handleAddClick(){
        this.setState({addClick : true});
    }

    render()
    {
        if (!this.state.id && !this.state.username)
        {
            return null;
        }

        return(
            <div id='MainPageDiv'>
                <NavigationBar color='#283277' username={this.state.username}></NavigationBar>
                <ContactList token={this.props.token} userid={this.state.id} addClicked={this.state.addClick}></ContactList>
            </div>
        )
    }
}

export default MainPage;