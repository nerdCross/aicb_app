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
let price = require('crypto-price')
//var accounts = new Accounts('ws://localhost:8546');

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showSuccess: "none",
            balance: null,
            address: null,
            showWallets: "none",
            p_key: null,
            ethBalance: 0,
            ethNaira: 0,
            showPass: "none",
            pin: ""
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        var getSettingspin = localStorage.getItem("pinSet");
        if(getSettingspin === null || getSettingspin === undefined || getSettingspin === ""){
           
        }else if(getSettingspin === "Yes"){
            this.setState({
                showPass: "block"
            })
            
        }else if(getSettingspin === "No"){
            this.setState({
                showPass: "none"
            })
        }
        let keys = localStorage.getItem("r_keys");
        if(keys === null || keys === ""){
            window.location.replace("/create")
        }
        var str = keys.substring(0, keys.length - 1);
       
        fetch('https://wmc.com.ng/aicb/checkWallet.php?key='+str)
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
        web3.eth.getBalance(message.address)
        .then((ethBal) => {
            this.setState({
                ethBalance: ethBal,
            })
            price.getCryptoPrice("NGN", "ETH").then(obj => { // Base for ex - USD, Crypto for ex - ETH 
                this.setState({
                    ethNaira: parseFloat(obj.price) * parseFloat(ethBal)
                })
            }).catch(err => {
                console.log(err)
            })
        });
        if(message.balance == 0){
            this.setState({
                balance: "0.00",
            })
        }
        }).catch(error => alert(error))    
    }
    
    
render(){    
  return (
    <div className="App" style={{background: "#2C135F", height: 600, padding: "20px 20px 100px 20px", flex: 1}}>  
        
        <div style={{position: "fixed", display: this.state.showSuccess, borderRadius: 10, alignSelf: "center", background: "#fff", width: 360, height: 300, marginLeft: -180, marginTop: -150, left: "50%", padding: 20, top: "50%", margin: "0px auto", textAlign: "center"}}>
            <img style={{marginLeft: "auto", marginRight: "auto"}} src={backupIcon} width="200px" />
            <p style={{fontSize: 12}}>Your wallet has been<br /> created successfully</p>
            <a style={{width: "80%", alignSelf: "center"}} class="btn btn-primary" onClick={() => 
                {
                    this.setState({
                        showSuccess: "none"
                    })
                }
            }>Continue</a>
        </div>
        <div style={{position: "fixed", display: this.state.showWallets, borderRadius: 0, alignSelf: "center", background: "rgba(000, 000, 000, .7)", width: "100%", height: "100%", paddingTop: 120, top: 0, left: 0, textAlign: "center"}}>
                
                <div onClick={() => {
                    var web3 = new Web3();
                    if (window.ethereum) {
                      web3 = new Web3(window.ethereum);
                      try {
                        window.ethereum.enable().then(function() {
                          // User has allowed account access to DApp...
                        });
                      } catch (e) {
                        // User has denied account access to DApp...
                      }
                    }
                    // Legacy DApp Browsers
                    else if (window.web3) {
                      web3 = new Web3(web3.currentProvider);
                    }
                    // Non-DApp Browsers
                    else {
                      alert("You have to install MetaMask. If you are using a mobile device, kindly install Metamask from PlayStore or Appstore and connect withon the app. Thanks");
                    }
                    window.ethereum.enable();
                    console.log(" typoe of = ", typeof web3);
                    if (typeof web3 != "undefined") {
                      this.web3Provider = web3.currentProvider;
                      window.ethereum.enable();
                    } else {
                      this.web3Provider = new Web3.providers.HttpProvider(
                        "http://127.0.0.1:8545"
                      );
                      window.ethereum.enable();
                    }
                }} style={{boxShadow: "1px 1px 11px 1px #c4c5c6", padding: 10, width: 300, borderRadius: 20, width: 300, margin: "20px auto", background: "#fff"}}>
                    <div className="row" style={{width: 300}}>
                        <div className="col-4">
                            <img src="https://www.pngkit.com/png/detail/26-268992_metamask-metamask-wallet.png" width="60px">

                            </img>
                        </div>
                        <div className="col-8">
                            <strong><h4>Metamask</h4></strong>
                        </div>
                
                </div>
            </div>
            <br />
            <a style={{width: 300, alignSelf: "center"}} class="btn btn-primary" onClick={() => 
                {
                    this.setState({
                        showWallets: "none"
                    })
                }
            }>Close</a>
        </div>
        <Container>
            <Row>
                <Col xs={9}>
                    <p className="welcomeTxt" style={{color: "#fff", fontSize: 20, fontWeight: "300"}}>Welcome</p>
                </Col>
                <Col xs={1}>
                    <span className="fa fa-bell welcomeIcon" style={{color: "#fff", fontSize: 19}}></span>
                </Col>
                <Col xs={1}>
                    <Link to="/settings"><span className="fa fa-cog welcomeIcon" style={{color: "#fff", fontSize: 19}}></span></Link>
                </Col>       
            </Row>       
        </Container>
    <div className="balDiv" style={{width: "90%", border: "0px solid #eee", boxShadow: "0.1px 0.1px 5px 0.1px #eee", borderRadius: 10, height: 150, margin: "10px auto", padding: 10}}>
        <Container>
            <Row>
                <Col xs={10}>
                    <p style={{color: "#fff", fontSize: 12, fontWeight: "bold", marginLeft: -10}}>WALLET BALANCE</p>
                </Col>
            
                <Col onClick={() => {
                    this.setState({
                        showWallets: "block"
                    })
                    /*
                    var web3 = new Web3();
                    if (window.ethereum) {
                      web3 = new Web3(window.ethereum);
                      try {
                        window.ethereum.enable().then(function() {
                          // User has allowed account access to DApp...
                        });
                      } catch (e) {
                        // User has denied account access to DApp...
                      }
                    }
                    // Legacy DApp Browsers
                    else if (window.web3) {
                      web3 = new Web3(web3.currentProvider);
                    }
                    // Non-DApp Browsers
                    else {
                      alert("You have to install MetaMask. If you are using a mobile device, kindly install ");
                    }
                    window.ethereum.enable();
                    console.log(" typoe of = ", typeof web3);
                    if (typeof web3 != "undefined") {
                      this.web3Provider = web3.currentProvider;
                      window.ethereum.enable();
                    } else {
                      this.web3Provider = new Web3.providers.HttpProvider(
                        "http://127.0.0.1:8545"
                      );
                      window.ethereum.enable();
                    }*/
                }} xs={1}>
                    <span className="fa fa-plus-circle" style={{color: "#fff", fontSize: 19}}></span>
                </Col>       
            </Row>        
        </Container>
        <p style={{color: "#fff", fontSize: 12, fontWeight: "100", marginBottom: 0}}>AICB NAIRA</p>
        <p style={{color: "#fff", fontSize: 25, fontWeight: "800", marginBottom: 0}}>{this.state.balance}</p>
        <p style={{color: "#fff", fontSize: 12, fontWeight: "100", marginBottom: 0}}>= NGN {this.state.balance}</p>
    </div>
   
                <div className="portDiv" style={{background: "#000", width: "30%", display: "inline-block", margin: 5, borderRadius: 10, height: "auto", padding: 5}}>
                    <Link to="./pool"><span className="fa fa-credit-card" style={{color: "#fff", fontSize: 12}}></span>
                    <p style={{color: "#fff", fontSize: 8, fontWeight: "100", marginBottom: 0, marginTop: 10}}>AICB NAIRA</p>
                    <p style={{color: "#fff", fontSize: 9, fontWeight: "900", marginBottom: 0}}>{this.state.balance}</p>
                    <p style={{color: "#fff", fontSize: 6, fontWeight: "100"}}>= NGN {this.state.balance}</p>
                    <p style={{color: "#fff", fontSize: 8, fontWeight: "100", marginBottom: 0, marginTop: 10}}>Pool</p></Link>
                </div>
           
               <div className="portDiv" style={{background: "#5F49DB",  width: "30%", display: "inline-block", margin: 5, borderRadius: 10, height: "auto", padding: 5}}>
               <Link to="./farm"><span className="fa fa-leaf" style={{color: "#fff", fontSize: 12}}></span>
                    <p style={{color: "#fff", fontSize: 8, fontWeight: "100", marginBottom: 0, marginTop: 10}}>AICB NAIRA</p>
                    <p style={{color: "#fff", fontSize: 9, fontWeight: "900", marginBottom: 0}}>1,500,000.00</p>
                    <p style={{color: "#fff", fontSize: 6, fontWeight: "100"}}>= NGN 1,986,000.34</p>
                    <p style={{color: "#fff", fontSize: 8, fontWeight: "100", marginBottom: 0, marginTop: 10}}>Farming</p></Link>
                </div>
           
            <div className="portDiv" style={{background: "#7CC5E3", borderRadius: 10, width: "30%", margin: 5, display: "inline-block", height: "auto", padding: 5}}>
            <Link to="./user-wallet"><span className="fa fa-folder" style={{color: "#fff", fontSize: 12, }}></span>
                <p style={{color: "#fff", fontSize: 8, fontWeight: "100", marginBottom: 0, marginTop: 10}}>AICB NAIRA</p>
                <p style={{color: "#fff", fontSize: 9, fontWeight: "900", marginBottom: 0}}>1,500,000.00</p>
                <p style={{color: "#fff", fontSize: 6, fontWeight: "100"}}>= NGN 1,986,000.34</p>
                <p style={{color: "#fff", fontSize: 8, fontWeight: "100", marginBottom: 0, marginTop: 10}}>Portfolio</p> </Link>       
            </div>
        <div class="portfolioDiv" style={{background: "#fff", width: "95%", margin: "10px auto", paddingTop: 10}}>
            <p style={{fontSize: 12, fontWeight: "900", marginBottom: 0, marginLeft: 10}}>Portfolio Overview</p>
            <hr style={{color: "#000", width: "110%", marginLeft: -10, marginTop: 5, height: 0.1, background: "#000"}} />
           
            <div style={{width: "100%", padding: "0px 10px"}}>
                <div style={{width: "12%", display: "inline-block", verticalAlign: "middle"}}>
                    <img src={secureIcon} width={30} />
                </div>
                <div style={{width: "30%", display: "inline-block", verticalAlign: "middle"}}>
                    <p style={{fontSize: 12, fontWeight: "700", marginBottom: 0,}}>Ethereum</p>
                    <p style={{fontSize: 12, fontWeight: "200", marginBottom: 0,}}>ETH</p>
                </div>
                <div style={{width: "58%", display: "inline-block", verticalAlign: "middle"}}>
                    <p style={{fontSize: 12, fontWeight: "700", marginBottom: 0,textAlign: "right"}}>{this.state.ethBalance}ETH</p>
                    <p style={{fontSize: 12, fontWeight: "200", marginBottom: 0,textAlign: "right"}}>NGN {this.state.ethNaira}</p>
                </div>
            </div>
            
            <div style={{background: "#7CC5E3", width: "100%", padding: 5, marginTop: 10}}>
                <Link to="/"><p style={{fontSize: 12, color: "#000", textAlign: "center", fontWeight: "700", marginBottom: 0,}}>View all assets</p></Link>
            </div>
        </div>
        <div className="slideout" style={{height: "100%", display: this.state.showPass, paddingTop: 40, boxShadow: "1px 1px 11px 1px #c4c5c6", width: "100%", position: "fixed", bottom: "0", background: "#fff", left: 0, borderTopRightRadius: 0,borderTopLeftRadius: 0, zIndex: 500, textAlign: "center"}}>
                <h6>Enter Passcode</h6>
                <form>
                    <input id="pinBox" type="password" placeholder="* * * *" style={{width: 200, wordSpacing: 18, textAlign: "center", border: "0px", fontSize: 30, color: "#000",alignSelf: "center", fontWeight: 900, margin: "20px auto"}} className="form-control" disabled></input>
                </form>
                <div className="container">
                    <br />
                    <div className="row">
                        <div className="col-3">
                           
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClick(1)} style={{fontWeight: "100", fontSize: 22}}>1</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClick(2)} style={{fontWeight: "100", fontSize: 22}}>2</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClick(3)} style={{fontWeight: "100", fontSize: 22}}>3</p>
                        </div>
                        <div className="col-3">
                            
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-3">
                           
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClick(4)} style={{fontWeight: "100", fontSize: 22}}>4</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClick(5)} style={{fontWeight: "100", fontSize: 22}}>5</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClick(6)} style={{fontWeight: "100", fontSize: 22}}>6</p>
                        </div>
                        <div className="col-3">
                            
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-3">
                           
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClick(7)} style={{fontWeight: "100", fontSize: 22}}>7</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClick(8)} style={{fontWeight: "100", fontSize: 22}}>8</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClick(9)} style={{fontWeight: "100", fontSize: 22}}>9</p>
                        </div>
                        <div className="col-3">
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                           
                        </div>
                        <div className="col-2">
                            <p style={{fontWeight: "100", fontSize: 22}}></p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClick(0)} style={{fontWeight: "100", fontSize: 22}}>0</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => deleteBox()} style={{fontWeight: "100", fontSize: 22}}><span className="fa fa-backspace"></span></p>
                        </div>
                        <div className="col-3">
                            
                        </div>
                    </div>
                    <button onClick={() => {
                        var pin = document.getElementById("pinBox").value;
                        if(pin === this.state.pin){
                            this.setState({
                                showPass: "none"
                            })
                        }else{
                            alert("Incorrect pin");
                        }
                    }} className="btn btn-primary">Continue</button>
                </div>
        </div>     
        <div className="navPanel" style={{background: "#2A0E59",position: "fixed", bottom: 0, left: 0, width: "100%", padding: "10px 20px !important",}}>
            <BottomNavigation
                showLabels
                
                style={{background: "#2A0E59", height: 70}}
            >
                
                <BottomNavigationAction onClick={() => window.location.replace("/user-wallet")} style={{color: "#7CC5E3",}} label="" 
                                        icon={<WalletIcon />} />
                <BottomNavigationAction onClick={() => window.location.replace("/wallet")} value="wallet" style={{color: "#fff",}} label=""
                                        icon={<DashboardIcon />} />
                <BottomNavigationAction onClick={() => window.location.replace("/swap")} style={{color: "#7CC5E3",}} label=""
                                        icon={<TransferIcon />} />
            </BottomNavigation>
        </div>
        
    </div>
  );
        }
}
function pinClick(args){
    var pinBox = document.getElementById("pinBox").value; 
    if(pinBox.length == 4){
        
    }else if(pinBox.length < 4){
       var newVal = pinBox += args;
       document.getElementById("pinBox").value = newVal;
    }
}
function deleteBox(){
   var pinBoxVal = document.getElementById("pinBox").value;
   var newStr = pinBoxVal.substring(0, pinBoxVal.length - 1);
   document.getElementById("pinBox").value = newStr;
}
export default App;
