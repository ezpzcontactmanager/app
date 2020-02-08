import React, { Component } from 'react';import ContactList from '../components/ContactList';
import NavigationBar from '../components/NavigationBar';
import EditAndAdd from '../components/EditAndAdd';
import SplitPane, { Pane } from 'react-split-pane';
import { Form, Container, FormGroup, Label, Alert, Input, Button, Fade, ButtonGroup, Jumbotron, Badge, UncontrolledAlert } from 'reactstrap';

class MainPage extends Component 
{
    constructor(props){
        super(props);

        this.state = {please: this.props.token}

        console.log("Test is ", this.props.test);
        console.log("Constructor token is ", this.props.token);
    }

    render()
    {
        const userToken = this.props.token;

        return(
            <div id='MainPageDiv'>
                <NavigationBar token={userToken}></NavigationBar>
                <SplitPane
                split="vertical"
                minSize={50}
                defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
                onChange={size => localStorage.setItem('splitPos', size)}
                >
                <ContactList initialSize="85%"></ContactList>
                <EditAndAdd></EditAndAdd>
                </SplitPane> 
            </div>
        )
    }
}

export default MainPage;