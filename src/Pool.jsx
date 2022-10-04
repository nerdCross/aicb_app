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
    <div className="App desktop-header" style={{background: "#fff", height: 1000, padding: "0px 0px 100px 0px", flex: 1}}>  

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
        <Container style={{background: "#5F49DB", padding: 20}}>
            <Link to="./swap"><span className="fa fa-arrow-left" style={{color: "#fff"}}>

            </span></Link>
            <br />
            <h6 style={{marginTop: 10, color: "#fff"}}>Pool</h6>
            <p style={{fontSize: 12, marginTop: -5, color: "#fff"}}>Stake  Liquity Pool (LP) to earn</p>
                  
        </Container>
        <div style={{background: "#fff", width: "90%", borderRadius: 10, margin: "10px auto", padding: "10px 5px 10px 5px", boxShadow: "1px 1px 11px 1px #eee"}}>
        <p style={{color: "#000", fontSize: 12, fontWeight: "800", marginTop: 10}}>Preferences</p>
                <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                <div className="row">
                    <div className="col-10">
                        <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Stacked Only</p>
                        
                    </div>
                    
                    <div className="col-2">
                        <span className="fa fa-toggle-on"></span>
                    </div>
                </div>
                
                <div className="row" style={{marginTop: 10}}>
                    <div className="col-9">
                        <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Sort By</p>
                        
                    </div>
                    
                    <div className="col-3">
                        <form>
                            <select>
                                <option value="Hot">Hot</option>
                            </select>
                        </form>
                    </div>
                </div>
                
                <div className="row" style={{marginTop: 10}}>
                    <div className="col-4">
                        <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Search</p>
                        
                    </div>
                    
                    <div className="col-8">
                        <form>
                            <input placeholder="Search"></input>
                        </form>
                    </div>
                </div>
                
               
            </div>
            <div style={{background: "#fff", width: "90%", border: "2px solid #2A0E59", borderRadius: 3, margin: "10px auto", padding: "10px 5px 10px 5px", boxShadow: "1px 1px 11px 1px #eee"}}>
                <p style={{color: "#000", fontSize: 16, fontWeight: "800", marginTop: 10}}>AICB Pool</p>
                        <div className="row">
                            <div className="col-10">
                                <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Recent AICB Profit</p>
                                
                            </div>
                            
                            <div className="col-2">
                            <p style={{color: "#000", float: "right", fontSize: 12, fontWeight: "100", marginBottom: 0}}>0.0</p>
                            </div>
                        </div>
                        
                        <div className="row" style={{marginTop: 10}}>
                            <div className="col-8">
                                <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>APR</p>
                                
                            </div>
                            
                            <div className="col-4">
                            <p style={{color: "#000", fontSize: 12, float: "right", fontWeight: "100", marginBottom: 0}}>129.6%</p>
                            </div>
                        </div>
                        
                        <div className="row" style={{marginTop: 10}}>
                            <div className="col-8">
                                <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Total Staked</p>
                                
                            </div>
                            
                            <div className="col-4">
                            <p style={{color: "#000", fontSize: 12, float: "right", fontWeight: "100", marginBottom: 0}}>0.0</p>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: 10}}>
                            <div className="col-10">
                                <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>End In</p>
                                
                            </div>
                            
                            <div className="col-2">
                            <p style={{color: "#000", float: "right", fontSize: 12, fontWeight: "100", marginBottom: 0}}></p>
                            </div>
                        </div>
                        <br />
                        <div className="row" style={{marginTop: 10}}>
                            <div className="col-10">
                                <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Info Site</p>
                                
                            </div>
                            
                            <div className="col-2">
                            <p style={{color: "#000", float: "right", fontSize: 12, fontWeight: "100", marginBottom: 0}}></p>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: 10}}>
                            <div className="col-10">
                                <p style={{color: "#000", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Project Site</p>
                                
                            </div>
                            
                            <div className="col-2">
                            <p style={{color: "#000", float: "right", fontSize: 12, fontWeight: "100", marginBottom: 0}}></p>
                            </div>
                        </div>
                        
                        <br /><br />
                        <p style={{color: "#000", fontSize: 16, fontWeight: "800", marginTop: 10}}>Recent AICB Profit</p>
                        
                        <form style={{ display: "inline"}}>
                            <input style={{padding: 10, width: "50%", display: "inline", background: "#f0f0f0", height: 40,}} value="0.0" className="form-control"></input>
                        </form>
                            
                        <button onClick={() => {
                                this.setState({
                                    showBill: true
                                })
                            }} className="btn btn-primary" style={{background: "#BA36E5", display: "inline",padding: 10, marginLeft: 13, height: 40, width: "45%"}}>Harvest</button>

                        <p style={{color: "#000", fontSize: 16, fontWeight: "800", marginTop: 10}}>AICB Staked</p>
                        
                        <form style={{ display: "inline"}}>
                            <input style={{padding: 10, width: "80%", display: "inline", background: "#f0f0f0", height: 40,}} value="0.0" className="form-control"></input>
                        </form>
                            
                        <button className="btn btn-outline-primary" style={{border: "1px solid #BA36E5", display: "inline",padding: 10, marginLeft: 13, height: 40, width: "15%"}}><span style={{color: "#BA36E5", textAlign: "center"}} className="fa fa-plus"></span></button>
                           
                        
                       
                    </div>
                    <center>
                    <form style={{width: "90%", padding: 15, border: "2px solid #000", marginTop: 10}}>
                        <select style={{width: "100%", border: "0px", fontWeight: "bold"}}>
                            <option>EARN BOX</option>
                        </select>
                    </form>
                    </center>

            

            <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showBill, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "50%", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>Stake LP Tokens</h6></strong>
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
                    <div className="row" style={{marginTop: 10, background: "#F6F0F0"}}>
                        <div className="col-4">
                            <p style={{color: "#000", fontWeight: "700", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Balance</p>
                                
                        </div>
                            
                        <div className="col-8">
                            <p style={{color: "#000", fontWeight: "700", float: "right", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Balance: 0.0</p>
                        </div>
                        <br />
                        <div className="col-5">
                            <p style={{color: "#000", fontWeight: "700", fontSize: 12, fontWeight: "100", marginBottom: 0}}>0.0</p>                                
                        </div>

                        <div className="col-3">
                            <p style={{color: "#fff", background: "#BA36E5", textAlign: "center", padding: 5, borderRadius: 30, fontSize: 12, fontWeight: "100", marginBottom: 0}}>MAX</p>                                
                        </div>
                            
                        <div className="col-4">
                            <p style={{color: "#000", fontWeight: "700", float: "right", fontSize: 12, fontWeight: "100", marginBottom: 0}}>AICB LP</p>
                        </div>
                    </div>
                    <br />
                    <center>
                        <button onClick={() => {
                                    this.setState({
                                        showBill: "none"
                                    })
                                }} style={{width: "95%"}} className="btn btn-primary">Confirm</button><br /><br />
                        <button onClick={() => {
                                    this.setState({
                                        showBill: "none"
                                    })
                                }} style={{width: "95%"}} className="btn btn-outline-primary">Cancel</button>
                    </center>
                    
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
