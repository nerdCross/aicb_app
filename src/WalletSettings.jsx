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
            showSuccess: "none"
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }
componentDidMount(){
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
    
}
    
    
render(){    
  return (
    <div className="App" style={{background: "#fff", height: "100%", padding: "20px 20px 100px 20px", flex: 1}}>  
        <Link to="/settings"><span className="fa fa-arrow-left" style={{color: "#000", fontSize: 19}}></span></Link>      
        <strong><h5 style={{fontWeight: "700", marginTop: 20}}>Wallet</h5></strong> 
        <strong><h5 style={{fontWeight: "200",fontSize: 12}}>Multi-Coin Wallet</h5></strong>  
        <Container>
            <Link style={{color: "#000"}} to="/multicoin">
                <Row style={{marginTop: 15}}>
                    <Col xs={2}>
                        <div style={{background: "#fff", border: "1px solid #7CC5E3", width: 35, height: 35, padding: 5}}>
                            <span className="fa fa-wallet" style={{color: "#7CC5E3", fontSize: 24}}></span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <p style={{fontWeight: "700",}}>Multi-Coin Wallet 1<span style={{fontWeight: "300", fontSize: 10, display: "block"}}>Multi-Coin Wallet 1</span></p>
                    </Col>
                    <Col xs={1} style={{alignContent: "flex-end"}}>
                        <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16, alignSelf: "flex-end"}}></span>
                    </Col>    
                </Row>
            </Link>   
        </Container>        
    </div>
  );
        }
}

export default App;
