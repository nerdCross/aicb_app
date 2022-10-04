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
import ListIcon from "@material-ui/icons/ListAlt";
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
            p_key: null,
            ethBalance: 0,
            ethNaira: 0,
            showPass: "none",
            showTxn: "none",
            pin: "",
            showAirtime: "none",
            showAirtimes: "none",
            showFlight: "none",
            showBill: "none",
            showTv: "none",
            showElectricity: "none",
            showInternet: "none",
            showHotel: "none",
            showHotelDetails: "none",
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        var getSettingspin = localStorage.getItem("pinSet");
        if(getSettingspin === null || getSettingspin === undefined || getSettingspin === ""){
           
        }else if(getSettingspin === "Yes"){
            
            
        }else if(getSettingspin === "No"){
            
        }
        let keys = localStorage.getItem("r_keys");
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
    <div className="innerWidth" className="App" style={{background: "#fff", height: 700, padding: "0px 0px 100px 0px", flex: 1}}>  

        <div style={{position: "fixed", display: this.state.showSuccess, borderRadius: 10, alignSelf: "center", background: "#fff", width: 360, height: "auto", padding: 20, top: "20%", margin: "0px auto", textAlign: "center"}}>
            <img style={{marginLeft: "auto", marginRight: "auto"}} src={backupIcon} width="200px" />
            <p style={{fontSize: 12}}>Your wallet has been<br /> created successfully</p>
            <a style={{width: "80%", alignSelf: "center"}} className="btn btn-primary" onClick={() => 
                {
                    this.setState({
                        showSuccess: "none"
                    })
                }
            }>Continue</a>
        </div>
        <Container className="innerWidth" style={{background: "#fff", padding: 30, marginBottom: 0}}>
           
            <p style={{color: "#000", fontSize: 20, textAlign: "center", fontWeight: "800"}}>Exchange</p>
            <Row className="innerWidth" style={{background: "#2A0E59", width: 300, borderRadius: 5, margin: "2px auto", height: 60, padding: 5}}>
                <Col xs={4} style={{textAlign: "right"}}>
                    <p style={{fontWeight: "700", fontSize: 20, textAlign: "left", alignSelf: "flex-end", marginBottom: 0, color: "#fff"}}>{this.state.balance}</p>
                    <p style={{fontWeight: "300", fontSize: 9, textAlign: "left", alignSelf: "flex-end", marginTop: 0, color: "#fff"}}>AICB NAIRA</p>
                </Col>
                <Col xs={4} style={{textAlign: "right"}}>
                    <p style={{fontWeight: "700", fontSize: 20, textAlign: "left", alignSelf: "flex-end", marginBottom: 0, color: "#fff"}}>{this.state.balance}</p>
                    <p style={{fontWeight: "300", fontSize: 9, textAlign: "left", alignSelf: "flex-end", marginTop: 0, color: "#fff"}}>BNB</p>
                </Col>
                <Col xs={4} style={{textAlign: "right"}}>
                    <p style={{fontWeight: "700", fontSize: 20, textAlign: "left", alignSelf: "flex-end", marginBottom: 0, color: "#fff"}}>{this.state.balance}</p>
                    <p style={{fontWeight: "300", fontSize: 9, textAlign: "left", alignSelf: "flex-end", marginTop: 0, color: "#fff"}}>AICB LP</p>
                </Col>
                
                     
            </Row>       
        </Container>
        <br />
        <Container className="innerWidth" style={{background: "#fff", padding: 30, marginTop: -30}}>
            <Row className="innerWidth" style={{background: "#fff", width: 300, borderRadius: 10, margin: "2px auto", height: 60, padding: 5}}>
            <Link style={{color: "#000"}} to='./swap'><Col xs={3} style={{padding: 0, background: "#fff", height: 40, padding: 10}}>
                    <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000"}}>Swap</p>
                </Col></Link>
                <Col xs={3} style={{padding: 0, background: "#F6F0F0", height: 40, padding: 10}}>
                    <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000"}}>Liquidity</p>
                </Col>
                
                     
            </Row>       
        </Container>
        <Container className="innerWidth" style={{background: "#F6F0F0", padding: 30, marginTop: -50, width: 350, margin: "-50px auto 20px auto"}}>
            <Row className="innerWidth" style={{ width: 350, borderRadius: 0, margin: "10px auto", height: 60}}>
               
            <Col xs={8} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                    <p style={{fontWeight: "700", fontSize: 12, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>Exchange</p>
                    <p style={{fontWeight: "500", fontSize: 9, textAlign: "left", alignSelf: "center", color: "#000", marginTop: 0}}>Trade tokens in an instant</p>
                </Col>
                <Col onClick={() => {this.setState({showAirtime: "block"})}} xs={1} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                    <span className="fa fa-cog"></span>
                </Col>
                <Col onClick={() => {this.setState({showTxn: "block"})}} xs={1} style={{padding: 0,height: 40, padding: 10}}>
                <span className="fa fa-history"></span>
                </Col>
                
                     
            </Row>   

            <Row className="innerWidth" style={{background: "#F6F0F0", width: 300, borderRadius: 0, margin: "10px auto", padding: 5, border: "1px solid #000"}}>
               
               <Col xs={8} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                   <p style={{fontWeight: "700", fontSize: 12, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>From</p>
               </Col>
               
               <Col xs={4} style={{padding: 0,height: 40, padding: 10}}>
                    <p style={{fontWeight: "500", fontSize: 9, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>Balance: {this.state.balance}</p>
               </Col>
               <Col xs={6} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                   <form>
                       <input class="form-control" style={{border: "0px", background: "transparent", fontWeight: "700", fontSize: 12, textAlign: "left"}} value="0.00"></input>
                   </form>

               </Col>
               <Col xs={3} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
               <p style={{fontWeight: "700", fontSize: 12, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>Max</p>

               </Col>
               <Col xs={3} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
               <form>
                       <select style={{background: "transparent", border: "0px", fontWeight: "bold"}}>
                           <option>AICB</option>
                           <option>BTC</option>
                           <option>ETH</option>
                           <option>BNB</option>
                           <option>BSC</option>
                       </select>
                   </form>

               </Col>
                    
           </Row>   
           <center>
            <span className="fa fa-arrow-down"></span>
           </center>
           <Row className="innerWidth" style={{background: "#F6F0F0", width: 300, borderRadius: 0, margin: "10px auto", padding: 5, border: "1px solid #000"}}>
               
               <Col xs={8} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                   <p style={{fontWeight: "700", fontSize: 12, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>To</p>
               </Col>
               
               <Col xs={4} style={{padding: 0,height: 40, padding: 10}}>
                    <p style={{fontWeight: "500", fontSize: 9, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>Balance: {this.state.balance}</p>
               </Col>
               <Col xs={6} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                   <form>
                       <input class="form-control" style={{border: "0px", background: "transparent", fontWeight: "700", fontSize: 12, textAlign: "left"}} value="0.00"></input>
                   </form>

               </Col>
               <Col xs={3} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
               <p style={{fontWeight: "700", fontSize: 12, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>Max</p>

               </Col>
               <Col xs={3} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
               <form>
                       <select style={{background: "transparent", border: "0px", fontWeight: "bold"}}>
                           <option>AICB</option>
                           <option>BTC</option>
                           <option>ETH</option>
                           <option>BNB</option>
                           <option>BSC</option>
                       </select>
                   </form>

               </Col>
                    
           </Row>           
            <a onClick={() => {this.setState({showAirtimes: "block"})}} style={{width: 300}} className="btn btn-primary">Trade</a><br />
        </Container>
       

          

           <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showAirtimes, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999, overflowY: "auto"}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "80%", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>Confirm Liquidity Supply</h6></strong>
                            </div>
                            <div className="col-1">
                                <span onClick={() => {
                                    this.setState({
                                        showAirtimes: "none"
                                    })
                                }} className="fa fa-times"></span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <p style={{fontWeight: "700", fontSize: 12, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>You will receive</p>
                    <p style={{fontWeight: "400", fontSize: 30, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>0.0</p>
                    <p style={{fontWeight: "700", fontSize: 10, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>BNB/AICB Pool Tokens</p>
                   
                    <span style={{fontSize: 12}}>Output is estimated. You will recieve at least 0.0 AICB or the transaction will revert.</span>
                    
                    <Row style={{background: "#FFF", width: "100%", borderRadius: 0, margin: "10px auto", height: "auto", padding: 0}}>
               
                <Col xs={6} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                    <p style={{fontWeight: "700", fontSize: 12, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>BNB Deposited</p>
                </Col>
                <Col xs={6} onClick={() => {this.setState({showAirtime: "block"})}} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                <p style={{fontWeight: "500", fontSize: 12, textAlign: "right", alignSelf: "center", color: "#000", marginBottom: 0}}>0.00</p>
                </Col>

                <Col xs={6} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                    <p style={{fontWeight: "700", fontSize: 12, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>AICB Deposited</p>
                </Col>
                <Col xs={6} onClick={() => {this.setState({showAirtime: "block"})}} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                <p style={{fontWeight: "500", fontSize: 12, textAlign: "right", alignSelf: "center", color: "#000", marginBottom: 0}}>0.00</p>
                </Col>

                <Col xs={6} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                    <p style={{fontWeight: "700", fontSize: 12, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>Rate</p>
                </Col>
                <Col xs={6} onClick={() => {this.setState({showAirtime: "block"})}} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                <p style={{fontWeight: "500", fontSize: 12, textAlign: "right", alignSelf: "center", color: "#000", marginBottom: 0}}>1 AICB = 0.04419BNB<br />1 BNB = 22.63 AICB</p>
                </Col>
                <Col xs={6} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                    <p style={{fontWeight: "700", fontSize: 12, textAlign: "left", alignSelf: "center", color: "#000", marginBottom: 0}}>Share of Pool</p>
                </Col>
                <Col xs={6} onClick={() => {this.setState({showAirtime: "block"})}} style={{padding: 0, background: "transparent", height: 40, padding: 10}}>
                <p style={{fontWeight: "500", fontSize: 12, textAlign: "right", alignSelf: "center", color: "#000", marginBottom: 0}}>0.0001032%</p>
                </Col>
                     
            </Row>   
                   
                    <butoon className="btn btn-primary" style={{width: 320, margin: "10px auto"}}onClick={() => {
                                    this.setState({
                                        showAirtimes: "none",
                                        showBill: "block"
                                    })
                                }}>Confirm Liquidity Supply</butoon>
                </div>
            </div>
            

           
            

            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showAirtime, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999, overflowY: "auto"}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "80%", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>Settings</h6></strong>
                            </div>
                            <div className="col-1">
                                <span onClick={() => {
                                    this.setState({
                                        showAirtime: "none"
                                    })
                                }} className="fa fa-times"></span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <span>Slippage Tolerance</span>
                    <Row style={{background: "#fff", width: 300, borderRadius: 0, margin: "10px auto", padding: 5}}>
                        <Col style={{background: "#f0f0f0", margin: 5, height: 40, padding: 10, width: 50}}>
                            <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000", marginBottom: 0}}>0.1%</p>
                        </Col>  
                        <Col style={{background: "#f0f0f0", margin: 5, height: 40, padding: 10, width: 50}}>
                            <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000", marginBottom: 0}}>0.5%</p>
                        </Col>  
                        <Col style={{background: "#f0f0f0", margin: 5, height: 40, padding: 10, width: 50}}>
                            <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000", marginBottom: 0}}>1%</p>
                        </Col>  
                        <Col style={{background: "#f0f0f0", height: 40, margin: 5, padding: 10, width: 50}}>
                            <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000", marginBottom: 0}}>0.8%</p>
                        </Col>  
                    </Row>
                    <span>Transaction Deadline</span>
                    <Row style={{background: "#fff", width: 300, borderRadius: 0, margin: "10px auto", padding: 5}}>
                        <Col style={{background: "#f0f0f0", margin: 5, height: 40, padding: 10, width: 50}}>
                            <form>
                                <input class="form-control" style={{border: "0px", background: "transparent", fontWeight: "700", fontSize: 15, textAlign: "left"}} value="20"></input>
                            </form>
                        </Col>  
                        <Col style={{background: "#f0f0f0", margin: 5, height: 40, padding: 10, width: 50}}>
                            <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000", marginBottom: 0}}>Min</p>
                        </Col>  
                         
                    </Row>

                    <span>Audio</span>
                    <Row style={{background: "#fff", width: 300, borderRadius: 0, margin: "10px auto", padding: 5}}>
                        <Col style={{background: "#fff", margin: 5, height: 40, padding: 10, width: 50}}>
                            <span style={{fontSize: 40}} className="fa fa-toggle-on"></span>
                        </Col>  
                        
                         
                    </Row>
                    <butoon className="btn btn-primary" style={{background: "#7CC5E3", width: 300}}onClick={() => {
                                    this.setState({
                                        showAirtime: "none"
                                    })
                                }}>Close</butoon>
                </div>
            </div>
        

            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showBill, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "70%", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                               
                            </div>
                            <div className="col-1">
                                <span onClick={() => {
                                    this.setState({
                                        showBill: "none"
                                    })
                                }} className="fa fa-times"></span>
                            </div>
                        </div>
                    </div>
                    <img src="success.png" width="300px"></img>
                    <center>
                        <p>
                        Successful
                        </p>
                        <button onClick={() => {
                                    this.setState({
                                        showBill: "none"
                                    })
                                }}className="btn btn-primary">Close</button>
                    </center>
                </div>
            </div>
            

            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showElectricity, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "70%", overflowY: "auto", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>Electricity Bill</h6></strong>
                            </div>
                            <div className="col-1">
                                <span onClick={() => {
                                    this.setState({
                                        showElectricity: "none"
                                    })
                                }} className="fa fa-times"></span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <form>
                        <input placeholder="Enter Amount" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />
                        <p style={{fontSize: 10, marginBottom: 0}}>Select Provider</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="BEDC">BEDC</option>
                        </select>  
                        <br />  
                        <p style={{fontSize: 10, marginBottom: 0}}>Package</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="BEDC">Prepaid</option>
                        </select>  
                        <br />  
                        <p style={{fontSize: 10, marginBottom: 0}}>Amount</p>
                        <input placeholder="Amount" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />     
                        <p style={{fontSize: 10, marginBottom: 0}}>Meter Number</p>
                        <input placeholder="Meter Number" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />       
                        <button style={{width: "100%"}} className="btn btn-primary">Continue</button>  
                    </form>
                </div>
            </div>

            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showTv, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "70%", overflowY: "auto", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>TV Subscription</h6></strong>
                            </div>
                            <div className="col-1">
                                <span onClick={() => {
                                    this.setState({
                                        showTv: "none"
                                    })
                                }} className="fa fa-times"></span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <form>
                        <input placeholder="Enter Amount" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />
                        <p style={{fontSize: 10, marginBottom: 0}}>Select Provider</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="BEDC">GOTV</option>
                        </select>  
                        <br />  
                        <p style={{fontSize: 10, marginBottom: 0}}>Package</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="BEDC">GOTV Max</option>
                        </select>  
                        <br />  
                        <p style={{fontSize: 10, marginBottom: 0}}>Amount</p>
                        <input placeholder="Amount" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />     
                        <p style={{fontSize: 10, marginBottom: 0}}>SmartCard Number</p>
                        <input placeholder="SmartCard Number" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />       
                        <button style={{width: "100%"}} className="btn btn-primary">Continue</button>  
                    </form>
                </div>
            </div>

            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showInternet, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "70%", overflowY: "auto", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>Internet Subscription</h6></strong>
                            </div>
                            <div className="col-1">
                                <span onClick={() => {
                                    this.setState({
                                        showInternet: "none"
                                    })
                                }} className="fa fa-times"></span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <form>
                        <input placeholder="Enter Amount" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />
                        <p style={{fontSize: 10, marginBottom: 0}}>Select Provider</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="BEDC">Spectranet Limited</option>
                        </select>  
                        <br />  
                        <p style={{fontSize: 10, marginBottom: 0}}>Package</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="BEDC">Lagos Unlimited Weekly</option>
                        </select>  
                        <br />  
                        <p style={{fontSize: 10, marginBottom: 0}}>Amount</p>
                        <input placeholder="Amount" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />     
                        <p style={{fontSize: 10, marginBottom: 0}}>Customer ID</p>
                        <input placeholder="Customer ID" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />       
                        <button style={{width: "100%"}} className="btn btn-primary">Continue</button>  
                    </form>
                </div>
            </div>

            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showHotel, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "100%", overflowY: "auto", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                <span onClick={() => {this.setState({showHotel: "none"})}} className="fa fa-arrow-left" style={{color: "#000", fontSize: 19}}></span>
                <strong><h5 style={{fontWeight: "700", marginTop: 20}}>Book Hotel</h5></strong> 
                <Container>
                    <Row style={{marginTop: 0, background: "#F0F0F0", justifyContent: "flex-start", height: "auto", padding: 2, borderRadius: 5}}>
                        
                        <Col xs={8}>
                            <form>
                                <input placeholder="Hotel Name or Location" style={{background: "transparent", border: "0px", width: 300}} className="form-control"></input>
                            </form>
                        </Col>
                        <Col xs={1} style={{alignContent: "flex-end"}}>
                            <span className="fa fa-search" style={{marginTop: 10}}></span>
                        </Col>    
                    </Row>   
                    
                    <strong><h6 style={{fontWeight: "700", marginTop: 20}}>1,254 hotels in Nigeria</h6></strong> 
                    <p style={{fontSize: 10, marginTop: 0}}>You can book a great hotel in Nigeria. </p>
                    <div className="row" style={{background: "#f0f0f0"}}>
                        <div className="col-5">
                            <img width="100%" height="100%" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/09/dd/ec/getlstd-property-photo.jpg?w=900&h=-1&s=1" /> 
                        </div>
                        <div className="col-7">
                            <strong><p style={{fontWeight: "600", fontSize: 12, marginTop: 5, marginBottom: 0}}>Sunview Hotel Ltd</p></strong> 
                            <p style={{marginTop: 0, fontSize: 9, fontWeight: "300"}}>8, El-Shaddai Road, Alagbaka G.R.A. Akure, Ondo State.</p>
                            <div className="row" style={{background: "#f0f0f0"}}>
                                <div className="col-5">
                                    <strong><p style={{fontWeight: "600", fontSize: 10, marginTop: 5, marginBottom: 0}}>NGN 10,000</p></strong> 
                                    <p style={{marginTop: 0, fontSize: 9, fontWeight: "300"}}>Avg/Night</p>
                                </div>
                                <div className="col-7">
                                    <button style={{width: "100%", padding: 7, fontSize: 8}} onClick={() => {this.setState({showHotelDetails: "block"})}} className="btn btn-primary">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row" style={{background: "#f0f0f0"}}>
                        <div className="col-5">
                            <img width="100%" height="100%" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/09/dd/ec/getlstd-property-photo.jpg?w=900&h=-1&s=1" /> 
                        </div>
                        <div className="col-7">
                            <strong><p style={{fontWeight: "600", fontSize: 12, marginTop: 5, marginBottom: 0}}>Sunview Hotel Ltd</p></strong> 
                            <p style={{marginTop: 0, fontSize: 9, fontWeight: "300"}}>8, El-Shaddai Road, Alagbaka G.R.A. Akure, Ondo State.</p>
                            <div className="row" style={{background: "#f0f0f0"}}>
                                <div className="col-5">
                                    <strong><p style={{fontWeight: "600", fontSize: 10, marginTop: 5, marginBottom: 0}}>NGN 10,000</p></strong> 
                                    <p style={{marginTop: 0, fontSize: 9, fontWeight: "300"}}>Avg/Night</p>
                                </div>
                                <div className="col-7">
                                    <button style={{width: "100%", padding: 7, fontSize: 8}} onClick={() => {this.setState({showHotelDetails: "block"})}} className="btn btn-primary">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row" style={{background: "#f0f0f0"}}>
                        <div className="col-5">
                            <img width="100%" height="100%" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/09/dd/ec/getlstd-property-photo.jpg?w=900&h=-1&s=1" /> 
                        </div>
                        <div className="col-7">
                            <strong><p style={{fontWeight: "600", fontSize: 12, marginTop: 5, marginBottom: 0}}>Sunview Hotel Ltd</p></strong> 
                            <p style={{marginTop: 0, fontSize: 9, fontWeight: "300"}}>8, El-Shaddai Road, Alagbaka G.R.A. Akure, Ondo State.</p>
                            <div className="row" style={{background: "#f0f0f0"}}>
                                <div className="col-5">
                                    <strong><p style={{fontWeight: "600", fontSize: 10, marginTop: 5, marginBottom: 0}}>NGN 10,000</p></strong> 
                                    <p style={{marginTop: 0, fontSize: 9, fontWeight: "300"}}>Avg/Night</p>
                                </div>
                                <div className="col-7">
                                    <button style={{width: "100%", padding: 7, fontSize: 8}} onClick={() => {this.setState({showHotelDetails: "block"})}} className="btn btn-primary">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row" style={{background: "#f0f0f0"}}>
                        <div className="col-5">
                            <img width="100%" height="100%" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/09/dd/ec/getlstd-property-photo.jpg?w=900&h=-1&s=1" /> 
                        </div>
                        <div className="col-7">
                            <strong><p style={{fontWeight: "600", fontSize: 12, marginTop: 5, marginBottom: 0}}>Sunview Hotel Ltd</p></strong> 
                            <p style={{marginTop: 0, fontSize: 9, fontWeight: "300"}}>8, El-Shaddai Road, Alagbaka G.R.A. Akure, Ondo State.</p>
                            <div className="row" style={{background: "#f0f0f0"}}>
                                <div className="col-5">
                                    <strong><p style={{fontWeight: "600", fontSize: 10, marginTop: 5, marginBottom: 0}}>NGN 10,000</p></strong> 
                                    <p style={{marginTop: 0, fontSize: 9, fontWeight: "300"}}>Avg/Night</p>
                                </div>
                                <div className="col-7">
                                    <button style={{width: "100%", padding: 7, fontSize: 8}} onClick={() => {this.setState({showHotelDetails: "block"})}} className="btn btn-primary">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row" style={{background: "#f0f0f0"}}>
                        <div className="col-5">
                            <img width="100%" height="100%" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/09/dd/ec/getlstd-property-photo.jpg?w=900&h=-1&s=1" /> 
                        </div>
                        <div className="col-7">
                            <strong><p style={{fontWeight: "600", fontSize: 12, marginTop: 5, marginBottom: 0}}>Sunview Hotel Ltd</p></strong> 
                            <p style={{marginTop: 0, fontSize: 9, fontWeight: "300"}}>8, El-Shaddai Road, Alagbaka G.R.A. Akure, Ondo State.</p>
                            <div className="row" style={{background: "#f0f0f0"}}>
                                <div className="col-5">
                                    <strong><p style={{fontWeight: "600", fontSize: 10, marginTop: 5, marginBottom: 0}}>NGN 10,000</p></strong> 
                                    <p style={{marginTop: 0, fontSize: 9, fontWeight: "300"}}>Avg/Night</p>
                                </div>
                                <div className="col-7">
                                    <button style={{width: "100%", padding: 7, fontSize: 8}} onClick={() => {this.setState({showHotelDetails: "block"})}} className="btn btn-primary">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    
                    
                </Container>        
                </div>
            </div>



            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showTxn, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999, overflowY: "auto"}}>
                <div className="desktop-fixed" style={{background: "rgba(255, 255, 255, 1)", height: "80%", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>Recent Transaction</h6></strong>
                            </div>
                            <div className="col-1">
                                <span onClick={() => {
                                    this.setState({
                                        showTxn: "none"
                                    })
                                }} className="fa fa-times"></span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <Row style={{background: "#fff", width: 300, borderRadius: 0, margin: "10px auto", padding: 5}}>
                        <Col xs={12} style={{background: "#fff", height: 40, padding: 10, width: 50}}>
                            <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000", marginBottom: 0}}>
                                Your recent transactions will show here.
                            </p>
                            
                        </Col>  
                       
                     
            </Row>   
                   <center>
                    <button className="btn btn-primary" style={{width: 320, margin: "10px auto"}}onClick={() => {
                                    this.setState({
                                        showTxn: "none",
                                        showBill: "block"
                                    })
                                }}>Close</button>
                                </center>
                </div>
            </div>



            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showAirtime, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999, overflowY: "auto"}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "80%", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>Settings</h6></strong>
                            </div>
                            <div className="col-1">
                                <span onClick={() => {
                                    this.setState({
                                        showAirtime: "none"
                                    })
                                }} className="fa fa-times"></span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <span>Slippage Tolerance</span>
                    <Row style={{background: "#fff", width: 300, borderRadius: 0, margin: "10px auto", padding: 5}}>
                        <Col style={{background: "#f0f0f0", margin: 5, height: 40, padding: 10, width: 50}}>
                            <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000", marginBottom: 0}}>0.1%</p>
                        </Col>  
                        <Col style={{background: "#f0f0f0", margin: 5, height: 40, padding: 10, width: 50}}>
                            <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000", marginBottom: 0}}>0.5%</p>
                        </Col>  
                        <Col style={{background: "#f0f0f0", margin: 5, height: 40, padding: 10, width: 50}}>
                            <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000", marginBottom: 0}}>1%</p>
                        </Col>  
                        <Col style={{background: "#f0f0f0", height: 40, margin: 5, padding: 10, width: 50}}>
                            <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000", marginBottom: 0}}>0.8%</p>
                        </Col>  
                    </Row>
                    <span>Transaction Deadline</span>
                    <Row style={{background: "#fff", width: 300, borderRadius: 0, margin: "10px auto", padding: 5}}>
                        <Col style={{background: "#f0f0f0", margin: 5, height: 40, padding: 10, width: 50}}>
                            <form>
                                <input class="form-control" style={{border: "0px", background: "transparent", fontWeight: "700", fontSize: 15, textAlign: "left"}} value="20"></input>
                            </form>
                        </Col>  
                        <Col style={{background: "#f0f0f0", margin: 5, height: 40, padding: 10, width: 50}}>
                            <p style={{fontWeight: "700", fontSize: 12, textAlign: "center", alignSelf: "center", color: "#000", marginBottom: 0}}>Min</p>
                        </Col>  
                         
                    </Row>

                    <span>Audio</span>
                    <Row style={{background: "#fff", width: 300, borderRadius: 0, margin: "10px auto", padding: 5}}>
                        <Col style={{background: "#fff", margin: 5, height: 40, padding: 10, width: 50}}>
                            <span style={{fontSize: 40}} className="fa fa-toggle-on"></span>
                        </Col>  
                        
                         
                    </Row>
                    <butoon className="btn btn-primary" style={{background: "#7CC5E3", width: 300}}onClick={() => {
                                    this.setState({
                                        showAirtime: "none"
                                    })
                                }}>Close</butoon>
                </div>
            </div>























            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showHotelDetails, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 9999999}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "100%", overflowY: "auto", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                <span onClick={() => {this.setState({showHotelDetails: "none"})}} className="fa fa-arrow-left" style={{color: "#000", fontSize: 19}}></span>
                <strong><h5 style={{fontWeight: "700", marginTop: 20}}>Sunview Hotel LTD</h5></strong> 
                <p style={{marginTop: 0, fontSize: 12, fontWeight: "300"}}>8, El-Shaddai Road, Alagbaka G.R.A. Akure, Ondo State.</p>
                <div className="scrolling-wrapper" style={{width: "100%", overflowX: "auto"}}>
                    <img className="card" width="200px" style={{display: "inline"}} src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/09/dd/ec/getlstd-property-photo.jpg?w=900&h=-1&s=1" /> 
                    <img className="card" width="200px" style={{display: "inline"}} src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/09/dd/ec/getlstd-property-photo.jpg?w=900&h=-1&s=1" /> 
                    <img className="card" width="200px" style={{display: "inline"}} src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/09/dd/ec/getlstd-property-photo.jpg?w=900&h=-1&s=1" /> 
                </div>
                <Container>                    
                    <strong><h6 style={{fontWeight: "700", marginTop: 20, fontSize: 12,marginBottom: 0}}>Hotel Information</h6></strong> 
                    <ol style={{marginTop: 0}}>
                        <li style={{fontWeight: "300", fontSize: 12}}>Bar/Lounge</li>
                        <li style={{fontWeight: "300", fontSize: 12}}>Security</li>
                        <li style={{fontWeight: "300", fontSize: 12}}>Wireless Internet</li>
                        <li style={{fontWeight: "300", fontSize: 12}}>24 Hours Electricty</li>
                        <li style={{fontWeight: "300", fontSize: 12}}>Parking Lots</li>
                        <li style={{fontWeight: "300", fontSize: 12}}>Storage</li>
                    </ol>
                    <strong><h6 style={{fontWeight: "700", marginTop: 20, fontSize: 12,marginBottom: 0}}>Booking Information</h6></strong> 
                    <br /> 
                        <p style={{fontSize: 10, marginBottom: 0}}>Check-In</p>
                        <input type="datetime-local" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>
                        <br /> 
                        <p style={{fontSize: 10, marginBottom: 0}}>Check-Out</p>
                        <input type="datetime-local" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>
                        <br />
                        <p style={{fontSize: 10, marginBottom: 0}}>No of Room</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="BEDC">1 Room</option>
                        </select>  
                        <br />  
                        <p style={{fontSize: 10, marginBottom: 0}}>No of Guest</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="BEDC">1 Guest</option>
                        </select>  
                        <br />   
                        <button className="btn btn-primary" style={{width: "100%"}}>Continue</button>
                   
                    
                    
                </Container>        
                </div>
            </div>


        <div className="navPanel" style={{background: "#fff",position: "fixed", bottom: 0, left: 0, width: "100%", padding: "10px 20px !important",}}>
            <BottomNavigation
                showLabels
                
                style={{background: "#fff", height: 70}}
            >
                
                <BottomNavigationAction onClick={() => window.location.replace("/user-wallet")} style={{color: "#7CC5E3",}} label="" 
                                        icon={<WalletIcon />} />
                <BottomNavigationAction onClick={() => window.location.replace("/wallet")} value="wallet" style={{color: "#7CC5E3",}} label=""
                                        icon={<DashboardIcon />} />
                <BottomNavigationAction onClick={() => window.location.replace("/swap")} style={{color: "#2A0E59",}} label=""
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
