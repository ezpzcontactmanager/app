import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { tablePaging, selectRow, cellEdit, nullChecker, rowEvents} from './Paging';
import {View} from 'react-native';
import { Input, Button } from 'reactstrap';
import axios from 'axios';
import cellEditFactory from 'react-bootstrap-table2-editor';
import '../App.css';

class ContactList extends Component{
    constructor() {
        super();
        this.state = {
            products: 
            [
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
                {"_id":{"$oid":"5e36449494e39914677fa88a"},"first":"Timmy part 5", "last":"", "phone":"3434343434343","__v":{"$numberInt":"0"}, "notes":"fuck you","user":"igor"},
            ],
            columns: [
                {
                    text: 'ID',
                    dataField: '_id',
                    editable: false,
                    hidden: true
                },
                {
                    text: 'First Name',
                    dataField: 'first',
                    formatter: nullChecker,
                    editable: true,
                },
                {
                    text: 'Last Name',
                    dataField: 'last',
                    default: "",
                    editable: true,
                },
                {
                    text: 'Phone #',
                    dataField: 'phone',
                    formatter: nullChecker,
                    editable: true,
                },
                {
                    text: 'Contact',
                    dataField: 'contact',
                    formatter: nullChecker,
                    hidden: true
    
                },
                {
                    text: 'Notes',
                    dataField: 'notes',
                    formatter: nullChecker,
                    editable: true,
                },
        ],
        firstname: '',
        lastname: ''
      };
      this.onFirstSearchChange = this.onFirstSearchChange.bind(this);
      this.onLastSearchChange = this.onLastSearchChange.bind(this);
    }

    onFirstSearchChange(e){
        this.setState({
            firstname: e.target.value
        });
    }
    
    onLastSearchChange(e){
        this.setState({
            lastname: e.target.value
        });
    }

    async componentDidMount(){
        
        var userid = this.props.id
        
        await axios.get("http://localhost:5000/me/contacts", userid)
                    .then(res => console.log(res))
                    .catch(error => console.log(error.response.data.message));
    }

    render() {
        return (
            <div className='ContactListDiv' onContextMenu={(e)=> e.preventDefault()}>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}, {width:200 + "px"}, {marginRight:10 + "px"}}>
                        <Input type="text" id="firstname" placeholder="First Name" onChange={this.onFirstSearchChange} style={{justifyContent: 'flex-start',}}></Input><br/>
                    </View>
                    <View style={{flex:1}, {width:200 + "px"}}>
                        <Input type="text" id="lastname" placeholder="Last Name" onChange={this.onLastSearchChange}></Input><br/>
                    </View>
                    <View style={{flex:1}, {width:200 + "px"}, {marginLeft:10 + "px"}}>
                        <Button outline color = 'info' style={{justifyContent: 'flex-end'}}>Search</Button>
                    </View>
                </View>
                <br></br>
                <BootstrapTable
                    striped
                    hover
                    keyField='_id'
                    data={this.state.products}
                    columns={this.state.columns}
                    pagination={tablePaging}
                    selectRow={selectRow}
                    rowEvents={rowEvents}
                    cellEdit={cellEdit}
                />
            </div>
        );

    }
}
export default ContactList;