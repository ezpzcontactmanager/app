import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { tablePaging, selectRow, nullChecker} from './Paging';
import {View, RefreshControl} from 'react-native';
import { Input, Button } from 'reactstrap';
import axios from 'axios';
import '../App.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import SplitPane, { Pane } from 'react-split-pane';

var _first = '';
var _last = '';

class ContactList extends Component{
    constructor() {
        super();
        this.state = {
            products: 
            [
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
                    sort: true
                },
                {
                    text: 'Last Name',
                    dataField: 'last',
                    default: "",
                    editable: true,
                    sort: true
                },
                {
                    text: 'Phone #',
                    dataField: 'phone',
                    formatter: nullChecker,
                    editable: true,
                    sort: true
                },
                {
                    text: 'Contact',
                    dataField: 'contact',
                    formatter: nullChecker,
                    hidden: true
    
                },
                {
                    text: 'Notes',
                    dataField: 'note',
                    formatter: nullChecker,
                    editable: true,
                    sort: true
                },
        ],
        firstnameSearch: '',
        lastnameSearch: '',            
        firstname: '',
        lastname: '',
        phone: '',
        notes: ''
      };

      this.onFirstChange = this.onFirstChange.bind(this);
      this.onLastChange = this.onLastChange.bind(this);
      this.onNumberChange = this.onNumberChange.bind(this);
      this.onNotesChange = this.onNotesChange.bind(this);
      this.onAdd = this.onAdd.bind(this);
      this.updateTable = this.updateTable.bind(this);
      this.filteredUpdate = this.filteredUpdate.bind(this);
      this.onFirstSearchChange = this.onFirstSearchChange.bind(this);
      this.onLastSearchChange = this.onLastSearchChange.bind(this);
    }

    onFirstSearchChange(e){
        this.setState({
            firstnameSearch: e.target.value
        });

        this._first = e.target.value;
        this.filteredUpdate();        
    }
    
    onLastSearchChange(e){
        this.setState({
            lastnameSearch: e.target.value
        });

        this._last = e.target.value
        this.filteredUpdate();
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
        
    clearBoxes = () => {
        document.getElementById("addForm").reset()
    }

    async componentDidMount(){
        var filterVar = {
            userid: this.props.userid,
            first: this.state.firstname,
            last: this.state.lastname
        }

        await axios.post("http://localhost:5000/me/contacts/search",  filterVar)
                    .then(res => this.setState({products: res.data}))
                    .catch(error => console.log(error.response.data.message));
    }

    // async componentDidUpdate(){

    //     var token = this.props.token
        
    //     await axios.get("http://localhost:5000/me/contacts", { headers: { Authorization: `Bearer ${token}` } })
    //                 .then(res => this.setState({products: res.data}))
    //                 .catch(error => console.log(error.response.data.message));
    // }

    async updateTable(){
        var token = this.props.token
        
        await axios.get("http://localhost:5000/me/contacts", { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => this.setState({products: res.data}))
                    .catch(error => console.log(error.response.data.message));
    }

    async filteredUpdate(){

        var filterVar = {
            userid: this.props.userid,
            first: this._first,
            last: this._last
        }

        await axios.post("http://localhost:5000/me/contacts/search",  filterVar)
                    .then(res => this.setState({products: res.data}))
                    .catch(error => console.log(error.response.data.message));

        console.log(this.state.products)
    }

    onAdd = async event =>{

        const contactInfo = {
            first: this.state.firstname,
            last: this.state.lastname,
            phone: this.state.phone,
            note: this.state.notes,
            userid: this.props.userid
        }

        if (contactInfo.first === '' || contactInfo.last === '' || contactInfo.note === '')
        {
            confirmAlert({
                title: 'Empty Fields',
                message: 'Please ensure you have entered a value in the First Name, Last Name, and Phone # fields.',
                buttons: [
                    {
                        label: 'Ok'
                    }
                ]
            })
        }
        else{
            this.clearBoxes();

            console.log(contactInfo);

            await axios.post("http://localhost:5000/me/contacts/add", contactInfo).then(res => (this.props.reload(), console.log(res)))
                .catch(error => console.log(error.response));

            this.setState({firstname: '', lastname: '', phone: '', notes: ''})
            this.filteredUpdate()
    
        }
    }

    render() {

        const rowEvents = {
            onContextMenu: (event, row, rowIndex) => {
                confirmAlert({
                  title: 'Confirm to submit',
                  message: 'Are you sure you want to delete '+ row.first,
                  buttons: [
                    {
                      label: 'Yes',
                      // this can be made async (onClick: async () => {})
                      onClick: async() => {
        
                        var contact = row._id;
                        
                        await axios.delete("http://localhost:5000/me/contacts/" + contact)
                                    .then(res => console.log(res))
                                    .catch(error => console.log(error.response));

                        this.filteredUpdate();
                      }
                    },
                    {
                      label: 'No',
                      onClick: () => 
                      {
                          console.log("do nothing")
                      }
                    }
                  ]
                })
            }
        }

        const cellEdit = cellEditFactory({
            mode: 'dbclick',
            afterSaveCell: async(oldValue, newValue, row, column, done) => {
                console.log("Row is actually ", row);
                var contact = {
                    first: row.first,
                    last: row.last,
                    phone: row.phone,
                    note: row.note,
                    userid: this.props.userid
                }

                await axios.post("http://localhost:5000/me/contacts/edit/" + row._id, contact)
                            .then(res => console.log(res))
                            .catch(error => console.log(error.response));

                this.updateTable();
            }
        });

        return (
            <SplitPane
            style={{marginBottom:20 + "px"}}
            split="vertical"
            minSize={50}
            defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
            onChange={size => localStorage.setItem('splitPos', size)}
            >
            <div style={{marginRight: 5 + "px"}} className='ContactListDiv' initialSize="85%" onContextMenu={(e)=> e.preventDefault()}>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}, {width:200 + "px"}, {marginRight:10 + "px"}}>
                        <Input type="text" id="firstname" placeholder="First Name" onChange={this.onFirstSearchChange} style={{justifyContent: 'flex-start',}}></Input><br/>
                    </View>
                    <View style={{flex:1}, {width:200 + "px"}}>
                        <Input type="text" id="lastname" placeholder="Last Name" onChange={this.onLastSearchChange}></Input><br/>
                    </View>
                    <View style={{flex:1}, {width:200 + "px"}, {marginLeft:10 + "px"}}>
                        {/* get nuked nerd <Button onClick={this.filteredUpdate}outline color = 'info' style={{justifyContent: 'flex-end'}}>Search</Button> */}
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
                    resize={true}
                />
            </div>
            <div style={{marginLeft:5 + "px"}} id="addDiv">
            <form id="addForm">
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
        </SplitPane> 
        );

    }
}

export default ContactList;