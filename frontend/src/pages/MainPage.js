import React, { Component } from 'react';import ContactList from '../components/ContactList';
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

        await axios.get("http://localhost:5000/me", { headers: { Authorization: `Bearer ${token}` } })
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
                <NavigationBar username={this.state.username}></NavigationBar>
                <SplitPane
                style={{marginBottom:20 + "px"}}
                split="vertical"
                minSize={50}
                defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
                onChange={size => localStorage.setItem('splitPos', size)}
                >
                <ContactList initialSize="85%" token={this.props.token} userid={this.state.id} addClicked={this.state.addClick}></ContactList>
                <Add token={this.state.userToken} reload={this.handleAddClick} id={this.state.id}></Add>
                </SplitPane> 
            </div>
        )
    }
}

export default MainPage;