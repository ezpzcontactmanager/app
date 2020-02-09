import React from 'react';
import { Input, Button } from 'reactstrap';
import axios from 'axios';
import '../App.css';

class Add extends React.Component
{
    constructor(props){
        super(props);
        this.state ={
            firstname: '',
            lastname: '',
            phone: '',
            notes: ''
        }
        this.onFirstChange = this.onFirstChange.bind(this);
        this.onLastChange = this.onLastChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onNotesChange = this.onNotesChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    onFirstChange(e){
        this.setState({
            firstname: e.target.value
        });
    }

    onLastChange(e){
        this.setState({
            lastname: e.target.value
        });
    }

    onNumberChange(e){
        this.setState({
            phone: e.target.value
        });
    }

    onNotesChange(e){
        this.setState({
            notes: e.target.value
        });
    }

    onAdd(e){

        const contactInfo = {
            first: this.state.firstname,
            last: this.state.lastname,
            phone: this.state.phone,
            note: this.state.notes,
        }

        axios.post("http://localhost:5000/me/contacts/add", contactInfo).then(res => console.log(res.data))
            .catch(error => console.log(error.response));
    }

    render(){
        return(
            <div id="addDiv">
                <form>
                <br/>
                <h1 className="AddTitle">Add Contact</h1><br/>
                <Input type="text" id="firstname" placeholder="First Name" onChange={this.onFirstChange}></Input> <br/>
                <Input type="text" id="lastname" placeholder="Last Name" onChange={this.onLastChange}></Input> <br/>
                <Input type="text" id="phone" placeholder="Phone #" onChange={this.onNumberChange}></Input> <br/>
                <Input type="text" id="notes" placeholder="Notes" onChange={this.onNotesChange}></Input><br/>
                <Button outline color = 'info' onClick={this.onAdd}>Submit</Button>
                </form>
                <span id="editResult"></span>
            </div>
        );
    }
}

export default Add;
