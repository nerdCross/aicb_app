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
            pin: "",
            showAirtime: "none",
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
    <div className="App" style={{background: "#fff", height: 1000, padding: "0px 0px 100px 0px", flex: 1}}>  

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
        <Container style={{background: "#6DF7FB", padding: 30}}>
            <Row>
                <Col xs={1}>
                  
                </Col>  
                <Col xs={9}>
                    <p style={{color: "#000", fontSize: 20, fontWeight: "800"}}>ASSET<br />MANAGEMENT</p>
                </Col>                     
            </Row> 
            <Row>
                <Col xs={5} style={{textAlign: "right"}}>
                    <p style={{fontWeight: "700", fontSize: 10, textAlign: "right", alignSelf: "flex-end", marginBottom: 0,}}>WALLET BALANCE</p>
                    <hr />
                    <p style={{fontWeight: "300", fontSize: 9, textAlign: "right", alignSelf: "flex-end", marginBottom: 0,}}>AICB NAIRA</p>
                    <p style={{fontWeight: "800", fontSize: 18, textAlign: "right", alignSelf: "flex-end"}}>{this.state.balance}</p>
                </Col>
                <Col xs={5} style={{textAlign: "left"}}>
                    <p style={{fontWeight: "700", fontSize: 10, textAlign: "left", alignSelf: "flex-end", marginBottom: 0,}}>INVESTMENT BALANCE</p>
                    <hr />

                    <p style={{fontWeight: "300", fontSize: 9, textAlign: "left", alignSelf: "flex-start", marginBottom: 0,}}>AICB NAIRA</p>
                    <p style={{fontWeight: "800", fontSize: 18, textAlign: "left", alignSelf: "flex-start"}}>{this.state.balance}</p>
                </Col>
                     
            </Row>       
        </Container>
            <div style={{width: "80%", margin: "10px auto", alignSelf: "center"}}>
                <div onClick={() => {this.setState({showAirtime: "block"})}} className="col-5" style={{background: "#6DF7FB",display: "inline-block", margin: 5, borderTopLeftRadius: 10, borderBottomRightRadius: 10, textAlign: "left !importanr", alignContent: "flex-start", height: "auto", padding: 5}}>
                    <span className="fa fa-piggy-bank" style={{color: "#000", fontSize: 12, alignSelf: "flex-start", textAlign: "left !important", marginBottom: 20}}></span>
                    <p style={{color: "#000", fontSize: 12, fontWeight: "900", marginBottom: 0, alignSelf: "flex-start", textAlign: "left !important",}}>Invest</p>
                    <p style={{color: "#000", fontSize: 9, fontWeight: "100"}}>Invest some of your AICB and earn a return on your investment.</p>
                </div>
                <div onClick={() => {this.setState({showFlight: "block"})}} className="col-5" style={{background: "#6DF7FB", display: "inline-block", margin: 5, borderTopLeftRadius: 10, borderBottomRightRadius: 10, height: "auto", padding: 5}}>
                    <span className="fa fa-history" style={{color: "#000", fontSize: 12, marginBottom: 20}}></span>
                    <p style={{color: "#000", fontSize: 12, fontWeight: "900", marginBottom: 0}}>History</p>
                    <p style={{color: "#000", fontSize: 9, fontWeight: "100"}}>View History of your investment and <br />withdrawal</p>
                </div>
            </div>  

            <div style={{background: "#fff", width: "80%", margin: "10px auto", padding: "10px 5px 10px 5px", boxShadow: "1px 1px 11px 1px #c4c5c6"}}>
                <p style={{fontSize: 16, fontWeight: "900", marginBottom: 0, marginLeft: 10}}>AICB FUND 1</p>
                <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                <div className="row">
                    <div className="col-4">
                        <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Period</p>
                        <p style={{color: "#000", fontSize: 14, fontWeight: "700"}}>3 Months</p>
                    </div>
                    <div className="col-4">
                        <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>ROI</p>
                        <p style={{color: "#000", fontSize: 14, fontWeight: "700"}}>15%</p>
                    </div>
                    <div className="col-4">
                        <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Mature Date</p>
                        <p style={{color: "#000", fontSize: 14, fontWeight: "700"}}>27/07/2022</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Amount</p>
                        <p style={{color: "#000", fontSize: 20, fontWeight: "700"}}>50,000</p>
                    </div>
                    <div className="col-6">
                        <button style={{width: "100%", padding: 5}} className="btn btn-primary">Withdrawal</button>
                    </div>
                    
                </div>
               
            </div>

            <div style={{background: "#fff", width: "80%", margin: "10px auto", padding: "10px 5px 10px 5px", boxShadow: "1px 1px 11px 1px #c4c5c6"}}>
                <p style={{fontSize: 16, fontWeight: "900", marginBottom: 0, marginLeft: 10}}>AICB FUND 1</p>
                <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                <div className="row">
                    <div className="col-4">
                        <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Period</p>
                        <p style={{color: "#000", fontSize: 14, fontWeight: "700"}}>3 Months</p>
                    </div>
                    <div className="col-4">
                        <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>ROI</p>
                        <p style={{color: "#000", fontSize: 14, fontWeight: "700"}}>15%</p>
                    </div>
                    <div className="col-4">
                        <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Mature Date</p>
                        <p style={{color: "#000", fontSize: 14, fontWeight: "700"}}>27/07/2022</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Amount</p>
                        <p style={{color: "#000", fontSize: 20, fontWeight: "700"}}>50,000</p>
                    </div>
                    <div className="col-6">
                        <button style={{width: "100%", padding: 5}} className="btn btn-primary">Withdrawal</button>
                    </div>
                    
                </div>
               
            </div>
                  
            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showFlight, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "80%", overflowY: "auto", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>Book Flight</h6></strong>
                            </div>
                            <div className="col-1">
                                <span onClick={() => {
                                    this.setState({
                                        showFlight: "none"
                                    })
                                }} className="fa fa-times"></span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <form>
                       
                        <p style={{fontSize: 10, marginBottom: 0}}>Trip Type</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="Round Trip">Round Trip</option>
                            <option value="One-Way">One Way</option>
                        </select>  
                        <br />
                        <p style={{fontSize: 10, marginBottom: 0}}>No. of Passenger</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="Round Trip">1 Passenger</option>
                            <option value="One-Way">2 Passengers</option>
                        </select>  
                        <br />  
                        <p style={{fontSize: 10, marginBottom: 0}}>Seat Type</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="Round Trip">Economy</option>
                            <option value="One-Way">First Class</option>
                        </select>  
                        <br />  
                        <p style={{fontSize: 10, marginBottom: 0}}>From Where?</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="Round Trip">City/Airtport</option>
                        </select>  
                        <br /> 
                        <p style={{fontSize: 10, marginBottom: 0}}>To Where?</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="Round Trip">City/Airport</option>
                        </select>  
                        <br /> 
                        <p style={{fontSize: 10, marginBottom: 0}}>Departure Date</p>
                        <input type="datetime-local" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>
                        <br /> 
                        <p style={{fontSize: 10, marginBottom: 0}}>Arrival Date</p>
                        <input type="datetime-local" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>
                        <br />  
                             
                        <button style={{width: "100%"}} className="btn btn-primary">Continue</button>  
                    </form>
                </div>
            </div>

            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showAirtime, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "50%", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>Invest</h6></strong>
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
                    <form>
                        <input placeholder="Enter Amount" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="">Period</option>
                            <option value="MTN">1 Month</option>
                        </select>  
                        <br />  
                        <input placeholder="ROI" value="10%" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />       
                        <button style={{width: "100%"}} className="btn btn-primary">Continue</button>  
                    </form>
                </div>
            </div>
        

            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showBill, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "50%", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>Pay Bills</h6></strong>
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
                    <hr />
                    <button style={{background: "#eee", border: "0px", color: "#000", textAlign: "left", width: "100%", fontWeight: "500", padding: 10}} className="btn btn-secondary" onClick={() => {this.setState({showElectricity: "block"})}}>Electricty Bill</button><br /><br />
                    <button style={{background: "#eee", border: "0px", color: "#000", textAlign: "left", width: "100%", fontWeight: "500", padding: 10}} className="btn btn-secondary" onClick={() => {this.setState({showTv: "block"})}}>TV Subscription</button><br /><br />
                    <button style={{background: "#eee", border: "0px", color: "#000", textAlign: "left", width: "100%", fontWeight: "500", padding: 10}} className="btn btn-secondary" onClick={() => {this.setState({showInternet: "block"})}}>Internet Subscription</button>
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


        <div style={{background: "#fff",position: "fixed", bottom: 0, left: 0, width: "100%", padding: "10px 20px !important",}}>
            <BottomNavigation
                showLabels
                
                style={{background: "#fff", height: 70}}
            >
                <BottomNavigationAction onClick={() => window.location.replace("/swap")} style={{color: "#7CC5E3",}} label=""
                                        icon={<TransferIcon />} />
                <BottomNavigationAction onClick={() => window.location.replace("/user-wallet")} style={{color: "#7CC5E3",}} label="" 
                                        icon={<WalletIcon />} />
                <BottomNavigationAction onClick={() => window.location.replace("/wallet")} value="wallet" style={{color: "#7CC5E3",}} label=""
                                        icon={<DashboardIcon />} />
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
