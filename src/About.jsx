import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import { Button, Nav, Container, Row, Col } from 'react-bootstrap';
//import BottomNavigation from 'reactjs-bottom-navigation'
import secureIcon from './eth.png';
import backupIcon from './backup.jpg';
import 'reactjs-bottom-navigation/dist/index.css'
import { HomeOutlined, SearchOutlined, BellOutlined, MenuOutlined } from '@ant-design/icons';
import CreateWallet from './Create';
import BottomNavigation from "@material-ui/core/BottomNavigation";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BankIcon from "@material-ui/icons/HomeWork";
import TransferIcon from "@material-ui/icons/CompareArrows";
import ListIcon from "@material-ui/icons/List";
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";
import RestoreIcon from "@material-ui/icons/Restore";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import SweetAlert from 'sweetalert2-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
var Accounts = require('web3-eth-accounts');
//var accounts = new Accounts('ws://localhost:8546');


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showSuccess: "none",
            showPass: "none",
            pin: "",
            pinToggle: "fas fa-toggle-off",
            newPass: "",
            newPassStepOne: "none",
            newPassStepTwo: "none",
            error: null
        }
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    
componentDidMount(){
    var getSettingspin = localStorage.getItem("pinSet");
    if(getSettingspin === null || getSettingspin === undefined || getSettingspin === ""){
        this.setState({
            pinToggle: "fas fa-toggle-off"
        })
    }else if(getSettingspin === "Yes"){
        this.setState({
            pinToggle: "fas fa-toggle-on"
        })
    }else if(getSettingspin === "No"){
        this.setState({
            pinToggle: "fas fa-toggle-off"
        })
    }
    let keys = localStorage.getItem("r_keys");
    var str = keys.substring(0, keys.length - 1);
    fetch('https://wmc.com.ng/aicb/data.php?key='+str)
        .then(res => res.json())
        .then(Data => {
        var message = Data.Result[0];
        this.setState({
            balance: message.balance,
            address: message.address,
            p_key: message.p_key,
            pin: message.pin
        })
        if(message.pin === "" || message.pim === null){
            this.setState({
                newPassStepOne: "block"
            })
        }
        
        if(message.balance == 0){
            this.setState({
                balance: "0.00",
            })
        }
        }).catch(error => alert(error)) 
    /*
    let keys = localStorage.getItem("r_keys");
    var str = keys.substring(0, keys.length - 1);
    console.log(str)
        fetch('https://wmc.com.ng/aicb/checkWallet.php?key='+keys)
        .then(res => res.json())
        .then(Data => {
            var message = Data.Result[0].message;
            if(message == 0){
                let address = web3.eth.accounts.create();
                
                var w_address = address.address;
                var privateKey = address.privateKey;
                console.log(w_address + " " + privateKey)
                fetch('https://wmc.com.ng/aicb/saveAddress.php?key='+str+'&address='+w_address+'&pkey='+privateKey)
                    .then(res => res.json())
                    .then(Data => {
                        var message = Data.Result[0].message;
                        if(message == 1){
                            this.setState({
                                showSuccess: "block",
                            })
                        }        
                }).catch(error => alert(error))
            }        
        }).catch(error => alert(error))
    */
}
    
    
render(){    
    const checkPinStepOne = () => {
        var pinBoxVal = document.getElementById("pinBoxStepOne").value;
        if(pinBoxVal.length < 4){
            alert("Minimum of 4 numbers")
        }else if(pinBoxVal.length == 4){
             this.setState({
                 newPass: pinBoxVal,
                 newPassStepTwo: "block"
             })
        }
     }
     const checkPinStepTwo = () => {
        var pinBoxVal = document.getElementById("pinBoxStepTwo").value;
        if(pinBoxVal.length < 4){
            alert("Minimum of 4 numbers")
        }else if(pinBoxVal.length == 4 && this.state.newPass === pinBoxVal){
             this.setState({
                 error: <button className='btn btn-success'>Pincode Matched. Please hold on</button>
             })
             let keys = localStorage.getItem("r_keys");
            var str = keys.substring(0, keys.length - 1);
            fetch('https://wmc.com.ng/aicb/setPin.php?key='+str+'&pin='+pinBoxVal)
            .then(res => res.json())
            .then(Data => {
            
            alert("Pincode set successfully")
            
                this.setState({
                    newPassStepTwo: "none",
                    newPassStepOne: "none",
                    showPass: "none"
                })
            
            
            
            }).catch(error => alert(error))
        }else if(pinBoxVal.length == 4 && this.state.newPass !== pinBoxVal){
            this.setState({
                error: <button className='btn btn-danger'>Pincode Do Not Matched</button>
            })
            
       }

     }
  return (
    <div className="App" style={{background: "#fff", height: "100%", padding: "20px 20px 100px 20px", flex: 1}}>  
        <Link to="/settings"><span className="fa fa-arrow-left" style={{color: "#000", fontSize: 19}}></span></Link>      
        <strong><h5 style={{fontWeight: "700", marginTop: 20}}>About</h5></strong> 
        <Container>
           
                <Row style={{marginTop: 15, background: "#fff", justifyContent: "flex-start", height: "auto", padding: 2, borderRadius: 5}}>
                    
                    <Col xs={10}>
                        <p style={{fontWeight: "700", marginTop: 14, fontSize: 14}}>Terms of Service</p>
                    </Col>
                    <Col xs={1} style={{alignContent: "flex-end"}}>
                        <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16,marginTop: 14, alignSelf: "flex-end"}}></span>
                    </Col>    
                </Row>
                <hr />
                <Row style={{marginTop: 15, background: "#fff", justifyContent: "flex-start", height: "auto", padding: 2, borderRadius: 5}}>
                    
                    <Col xs={10}>
                        <p style={{fontWeight: "700", marginTop: 14, fontSize: 14}}>Wallet Core</p>
                        <p style={{fontWeight: "300", marginTop: 14, fontSize: 10}}>1.2.1</p>
                    </Col>
                    <Col xs={1} style={{alignContent: "flex-end"}}>
                        <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16,marginTop: 14, alignSelf: "flex-end"}}></span>
                    </Col>     
                </Row>
                <Row style={{marginTop: 15, background: "#fff", justifyContent: "flex-start", height: "auto", padding: 2, borderRadius: 5}}>
                    
                    <Col xs={10}>
                        <p style={{fontWeight: "700", marginTop: 14, fontSize: 14}}>Version</p>
                        <p style={{fontWeight: "300", marginTop: 14, fontSize: 10}}>1.29.11</p>
                    </Col>
                    <Col xs={1} style={{alignContent: "flex-end"}}>
                        <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16,marginTop: 14, alignSelf: "flex-end"}}></span>
                    </Col>     
                </Row>
             
            
            
       </Container>
    </div>
  );
}
}
 

export default App;
