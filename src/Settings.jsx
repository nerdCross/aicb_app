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
        <Link to="/wallet"><span className="fa fa-arrow-left" style={{color: "#000", fontSize: 19}}></span></Link>      
        <strong><h5 style={{fontWeight: "700", marginTop: 20}}>Settings</h5></strong>  
        <Container>
            <Link style={{color: "#000"}} to="/wallet-settings"><Row style={{marginTop: 15}}>
                <Col xs={2}>
                    <div style={{background: "#000", width: 35, height: 35, padding: 5}}>
                        <span className="fa fa-wallet" style={{color: "#fff", fontSize: 24}}></span>
                    </div>
                </Col>
                <Col xs={8}>
                    <p style={{fontWeight: "700",}}>Wallets<span style={{fontWeight: "300", fontSize: 10, display: "block"}}>Multi-Coin Wallet 1</span></p>
                </Col>
                <Col xs={1} style={{alignContent: "flex-end"}}>
                    <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16, alignSelf: "flex-end"}}></span>
                </Col>    
            </Row> </Link> 
            <hr style={{width: "98%", background: "#000", height: 0.1, marginTop: -5}} />  
            <Row style={{marginTop: 15}}>
                <Col xs={2}>
                    <div style={{background: "#000", width: 35, height: 35, padding: 5}}>
                        <span className="fa fa-moon" style={{color: "#fff", fontSize: 24}}></span>
                    </div>
                </Col>
                <Col xs={8}>
                    <p style={{fontWeight: "700", marginTop: 5}}>Dark Mode</p>
                </Col>
                <Col xs={1} style={{alignContent: "flex-end"}}>
                    <span className="fas fa-toggle-off" style={{color: "#000", fontSize: 16, alignSelf: "flex-end", marginTop: 5}}></span>
                </Col>    
            </Row>  
            <strong><h5 style={{fontWeight: "300", marginTop: 20}}>App Settings</h5></strong>
            <Link style={{color: "#000"}} to="/security"><Row style={{marginTop: 15}}>
                <Col xs={2}>
                    <div style={{background: "#6DF7FB", width: 35, height: 35, padding: 5}}>
                        <span className="fas fa-shield-alt" style={{color: "#fff", fontSize: 24}}></span>
                    </div>
                </Col>
                <Col xs={8}>
                    <p style={{fontWeight: "700", marginTop: 5}}>Security</p>
                </Col>
                <Col xs={1} style={{alignContent: "flex-end"}}>
                    <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16, alignSelf: "flex-end", marginTop: 5}}></span>
                </Col>    
            </Row> </Link>  
            <hr style={{width: "98%", background: "#000", height: 0.1, marginTop: -5}} />  
            <Link style={{color: "#000"}} to="/preference"><Row style={{marginTop: 15}}>
                <Col xs={2}>
                    <div style={{background: "#5F49DB", width: 35, height: 35, padding: 5}}>
                        <span className="fas fa-wrench" style={{color: "#fff", fontSize: 24}}></span>
                    </div>
                </Col>
                <Col xs={8}>
                    <p style={{fontWeight: "700", marginTop: 5}}>Preference</p>
                </Col>
                <Col xs={1} style={{alignContent: "flex-end"}}>
                    <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16, alignSelf: "flex-end", marginTop: 5}}></span>
                </Col>    
            </Row>  </Link>
            <hr style={{width: "98%", background: "#000", height: 0.1, marginTop: -5}} />  
            <Link style={{color: "#000"}} to="/notification"><Row style={{marginTop: 15}}>
                <Col xs={2}>
                    <div style={{background: "#000", width: 35, height: 35, padding: 5}}>
                        <span className="fas fa-bell" style={{color: "#fff", fontSize: 24}}></span>
                    </div>
                </Col>
                <Col xs={8}>
                    <p style={{fontWeight: "700", marginTop: 5}}>Push Notifications</p>
                </Col>
                <Col xs={1} style={{alignContent: "flex-end"}}>
                    <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16, alignSelf: "flex-end", marginTop: 5}}></span>
                </Col>    
            </Row>  </Link>
            <hr style={{width: "98%", background: "#000", height: 0.1, marginTop: -5}} />  
            <Link style={{color: "#000"}} to="/price-alert"><Row style={{marginTop: 15}}>
                <Col xs={2}>
                    <div style={{background: "#000", width: 35, height: 35, padding: 5}}>
                        <span className="fas fa-dollar-sign" style={{color: "#fff", fontSize: 24}}></span>
                    </div>
                </Col>
                <Col xs={8}>
                    <p style={{fontWeight: "700", marginTop: 5}}>Price Alert</p>
                </Col>
                <Col xs={1} style={{alignContent: "flex-end"}}>
                    <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16, alignSelf: "flex-end", marginTop: 5}}></span>
                </Col>    
            </Row> </Link>
            <strong><h5 style={{fontWeight: "300", marginTop: 20}}>Join Community</h5></strong>
            <Row style={{marginTop: 15}}>
                <Col xs={2}>
                    <div style={{background: "#4E2E00", width: 35, height: 35, padding: 5}}>
                        <span className="fas fa-question-circle" style={{color: "#fff", fontSize: 24}}></span>
                    </div>
                </Col>
                <Col xs={8}>
                    <p style={{fontWeight: "700", marginTop: 5}}>Help Centre</p>
                </Col>
                <Col xs={1} style={{alignContent: "flex-end"}}>
                    <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16, alignSelf: "flex-end", marginTop: 5}}></span>
                </Col>    
            </Row>  
            <hr style={{width: "98%", background: "#000", height: 0.1, marginTop: -5}} /> 
            <Row style={{marginTop: 15}}>
                <Col xs={2}>
                    <div style={{background: "#0B9CE6", width: 35, height: 35, padding: 5}}>
                        <span aria-hidden="true" className="fa fa-twitter" style={{color: "#fff", fontSize: 24}}></span>
                    </div>
                </Col>
                <Col xs={8}>
                    <p style={{fontWeight: "700", marginTop: 5}}>Twitter</p>
                </Col>
                <Col xs={1} style={{alignContent: "flex-end"}}>
                    <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16, alignSelf: "flex-end", marginTop: 5}}></span>
                </Col>    
            </Row>  
            <hr style={{width: "98%", background: "#000", height: 0.1, marginTop: -5}} /> 
            <Row style={{marginTop: 15}}>
                <Col xs={2}>
                    <div style={{background: "#158EE9", width: 35, height: 35, padding: 5}}>
                        <span aria-hidden="true" className="fa fa-telegram" style={{color: "#fff", fontSize: 24}}></span>
                    </div>
                </Col>
                <Col xs={8}>
                    <p style={{fontWeight: "700", marginTop: 5}}>Telegram</p>
                </Col>
                <Col xs={1} style={{alignContent: "flex-end"}}>
                    <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16, alignSelf: "flex-end", marginTop: 5}}></span>
                </Col>    
            </Row>  
            <hr style={{width: "98%", background: "#000", height: 0.1, marginTop: -5}} /> 
            <Row style={{marginTop: 15}}>
                <Col xs={2}>
                    <div style={{background: "#247BED", width: 35, height: 35, padding: 5}}>
                        <span aria-hidden="true" className="fa fa-facebook" style={{color: "#fff", fontSize: 24}}></span>
                    </div>
                </Col>
                <Col xs={8}>
                    <p style={{fontWeight: "700", marginTop: 5}}>Facebook</p>
                </Col>
                <Col xs={1} style={{alignContent: "flex-end"}}>
                    <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16, alignSelf: "flex-end", marginTop: 5}}></span>
                </Col>    
            </Row>  
            <hr style={{width: "98%", background: "#000", height: 0.1, marginTop: -5}} /> 
            <Link style={{color: "#000"}} to="/about"><Row style={{marginTop: 15}}>
                <Col xs={2}>
                    <div style={{background: "#000", width: 35, height: 35, padding: 5}}>
                        <span aria-hidden="true" className="fa fa-info-circle" style={{color: "#fff", fontSize: 24}}></span>
                    </div>
                </Col>
                <Col xs={8}>
                    <p style={{fontWeight: "700", marginTop: 5}}>About</p>
                </Col>
                <Col xs={1} style={{alignContent: "flex-end"}}>
                    <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16, alignSelf: "flex-end", marginTop: 5}}></span>
                </Col>    
            </Row>  </Link>
            <hr style={{width: "98%", background: "#000", height: 0.1, marginTop: -5}} /> 
        </Container>        
    </div>
  );
        }
}

export default App;
