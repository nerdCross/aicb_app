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
import { Divider } from '@material-ui/core';
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
            sendColor: "#fff",
            recColor: "#F6F0F0",
            portfolio: "#7CC5E3",
            watchlist: "#fff",
            explore: "#fff",
            showPortfolio: "block",
            showWatchlist: "none",
            showExplore: "none", 
            ethBalance: 0,
            ethNaira: 0,
            showPass: "none",
            pin: "",
            showWallets: "none",
            showAirtime: "none",
            showFlight: "none",
            showBill: "none",
            showTv: "none",
            showElectricity: "none",
            showInternet: "none",
            showHotel: "none",
            showHotelDetails: "none",
            send: "block",
            receive: "none"
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
    <div className="App" style={{background: "#fff", height: "auto", padding: "0px 0px 100px 0px", flex: 1}}>  
        <div style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showFlight, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
                <center>
                <div className="desktop-fixed" style={{background: "rgba(255, 255, 255, 1)", height: "90%", overflowY: "auto", padding: 0, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    
                    <div className="row">
                        <div className="col-6">
                            <button onClick={() => {
                                this.setState({
                                    recColor: "#F6F0F0",
                                    sendColor: "#fff",
                                    send: "block",
                                    receive: "none"
                                })
                            }} style={{background: this.state.sendColor, color: "#2A0E59", width: "100%", fontWeight: "bold"}} className="btn btn-primary">Send</button>
                        </div>
                        <div className="col-6">
                            <button  onClick={() => {
                                this.setState({
                                    recColor: "#fff",
                                    sendColor: "#F6F0F0",
                                    send: "none",
                                    receive: "block"
                                })
                            }} style={{background: this.state.recColor, color: "#2A0E59", width: "100%", fontWeight: "bold"}} className="btn btn-primary">Receive</button>
                        </div>
                    </div>
                    <div className="container desktop-fixed" style={{padding: 10, display: this.state.send}}>
                        <div className="row" style={{marginTop: 50}}>
                            <div className="col-9">
                                <center>
                                <form style={{width: 150}}>
                                    <input style={{fontSize: 40, width: 150, color: "#c4c5c6", textAlign: "right", border: "0px", background: "transparent"}} placeholder="NGN 0"></input>
                                </form>
                                </center>
                            </div>
                            <div className="col-3" style={{paddingTop: 5}}>
                                <span style={{color: "#e2e3e5"}} className="fa fa-arrow-up"></span><span style={{color: "#e2e3e5"}} className="fa fa-arrow-down"></span>
                               <p style={{color: "#e2e3e5"}}>BTC</p>
                            </div>
                        </div>
                        <div className="row" style={{margin: "30px auto", width: "90%", border: "1px solid #e2e3e5"}}>
                            <div className="col-4">
                                <p style={{color: "#c4c5c6"}}>To</p>
                            </div>
                            <div className="col-8" style={{paddingTop: 5}}>
                                <form>
                                    <input style={{fontSize: 15, width: 200, color: "#c4c5c6", textAlign: "center", borderLeft: "1px solid #e2e3e5",borderRight: "0px solid #fff",borderBottom: "0px solid #fff",borderTop: "0px solid #fff", background: "transparent"}} placeholder="Wallet Address"></input>
                                </form>                               
                            </div>
                        </div>
                        <div className="row" style={{margin: "30px auto", width: "90%", border: "1px solid #e2e3e5"}}>
                            <div className="col-4">
                                <p style={{color: "#c4c5c6"}}>Note</p>
                            </div>
                            <div className="col-8" style={{paddingTop: 5}}>
                                <form>
                                    <input style={{fontSize: 15, width: 200, color: "#c4c5c6", textAlign: "center", borderLeft: "1px solid #e2e3e5",borderRight: "0px solid #fff",borderBottom: "0px solid #fff",borderTop: "0px solid #fff", background: "transparent"}} placeholder="Optional Message"></input>
                                </form>                               
                            </div>
                        </div>
                        <div className="row" style={{margin: "30px auto", width: "90%", border: "1px solid #e2e3e5"}}>
                            <div className="col-4">
                                <p style={{color: "#c4c5c6"}}>Pay With</p>
                            </div>
                            <div className="col-8" style={{paddingTop: 5}}>
                                <form>
                                    <select style={{fontSize: 15, fontWeight: "400", width: 200, color: "#c4c5c6", textAlign: "center", borderLeft: "1px solid #e2e3e5",borderRight: "0px solid #fff",borderBottom: "0px solid #fff",borderTop: "0px solid #fff", background: "transparent"}} placeholder="Optional Message">
                                        <option>Ethereum</option>
                                    </select>
                                </form>                               
                            </div>
                        </div>
                        <button style={{width: "100%"}} className="btn btn-primary">Continue</button>
                        <br /><br />
                        <button onClick={() => {
                            this.setState({
                                showFlight: "none"
                            })
                        }} style={{width: "100%"}} className="btn btn-outline-primary">Cancel</button>
                    </div>
                    <div style={{width: "100%", padding: 20, display: this.state.receive}}>
                    <div className="row" style={{margin: "30px auto", width: "90%", border: "1px solid #e2e3e5"}}>
                            <div className="col-12">
                                <center>
                                    <img style={{margin: "20px auto"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAABlBMVEUAAAD///+l2Z/dAAACg0lEQVR4nO3WS3JiQQwEQHP/S89qFg4IUaV+gB1OLfvpU8mKr6+zuv2v4dNQydRhwtMiJAymXo8Yi5AwmHo9YizCnyRMAt1fTV6q9MmtKiHhs/nkhZCQcE5I+Gw+eSF8u/DBt6s9FfUwISEhISEhIeF7hK8bJyQkJCQkJPw5wvtKThASEhISEhK+VJjUbmrYk2Q93bybr6aiHIT7zbv5airKQbjfvJuvpqIchPvNu/lqKspBeL65qyHH5S+fKcIrXz5ThFe+fKYIr3z5TBFe+XIa8bB2v8Kw57Jgly0ivBHmPV2wyxYR3gjzni7YZYsIbx8XVsmG5qGnaq6uT0VI2ISumgnjIiRsQlfNhHFVx4banTjcE+UhJCQkJCQkLG8MV6vmgZq8dJkJCQkJCQkJs7GhJ7mRNCdHd5kJCYfQhISrPIT9xiE04duFQ8RdjmpPVZPn8Bgh4epoFeP0GCHh6mgV4/QY4W8T3qcfPEnoZLzqST4REhISEhISPjz/upedcOkhJCQkJCQkLGHD1K52P0fS/GBzcpWwLsJ6fNqcXCWsi7AenzYnVwnreqswWV0FSn6p4dOukvCEhISEhIR/WTh8q2r3S91/qvZEP9malKdPegjTZsKDInzSQ5g2Ex7UzxUe1pC+8uw2J59Oi/DbC2G9Ofl0WoTfXgjrzcmn0yL89vJh4X2Ooaqp6miymZCQkJCQkPBcWPUkVy+LGASb9hA+7iEkbK4nwQgJCZ9c/d3C4Ua1ufpdOiohISEhISHhC/7TVJUIh+vRz0FISEhISEh4fKO6mgRKbnXNhISEhISEhNtKsu6aqz2XeZJjVzVXewgPinDfXO0hPCjCfXO1508L/wFl9l/gl2v+4QAAAABJRU5ErkJggg==" width="150px"></img>                 
                                </center>
                            </div>
                        </div>
                        <div className="row" style={{margin: "30px auto", width: "90%", border: "1px solid #e2e3e5"}}>
                            <div className="col-4">
                                <p style={{color: "#c4c5c6"}}>Address</p>
                            </div>
                            <div className="col-8" style={{paddingTop: 5}}>
                                <form>
                                    <input disabled value="335DkJAtVgwsgM...." style={{fontSize: 15, width: 200, color: "#c4c5c6", textAlign: "center", borderLeft: "1px solid #e2e3e5",borderRight: "0px solid #fff",borderBottom: "0px solid #fff",borderTop: "0px solid #fff", background: "transparent"}} placeholder="Optional Message"></input>
                                </form>                               
                            </div>
                        </div>
                        <div className="row" style={{margin: "30px auto", width: "90%", border: "1px solid #e2e3e5"}}>
                            <div className="col-4">
                                <p style={{color: "#c4c5c6"}}>Asset</p>
                            </div>
                            <div className="col-8" style={{paddingTop: 5}}>
                                <form>
                                    <select style={{fontSize: 15, fontWeight: "400", width: 200, color: "#c4c5c6", textAlign: "center", borderLeft: "1px solid #e2e3e5",borderRight: "0px solid #fff",borderBottom: "0px solid #fff",borderTop: "0px solid #fff", background: "transparent"}} placeholder="Optional Message">
                                        <option>Ethereum</option>
                                    </select>
                                </form>                               
                            </div>
                        </div>
                        <button  onClick={() => {
                            this.setState({
                                showFlight: "none"
                            })
                        }}  style={{width: "100%", background: "#7CC5E3"}} className="btn btn-primary">Back</button>
                        <br /><br />
                    </div>
                   
                </div>
                </center>
            </div>
        <div className="desktop-fixed" style={{position: "fixed", display: this.state.showSuccess, borderRadius: 10, alignSelf: "center", background: "#fff", width: 360, height: "auto", padding: 20, top: "20%", margin: "0px auto", textAlign: "center"}}>
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
        <div className="desktop-fixed" style={{position: "fixed", display: this.state.showWallets, borderRadius: 0, alignSelf: "center", background: "rgba(000, 000, 000, .7)", width: "100%", height: "100%", paddingTop: 120, top: 0, left: 0, textAlign: "center", zIndex: 99999,}}>
                
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
                            <strong><h4>AICB Wallet</h4></strong>
                        </div>
                
                </div>
                </div>
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
        <Container className="desktop-header" style={{background: "#5F49DB", padding: 20}}>
            
            <h6 className="desktop-head-text" style={{marginTop: 10, color: "#fff"}}>Wallet</h6>
            <div className="desktop-scroll" style={{overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap"}}>

            
            <div className="header-div" style={{width: "98%", verticalAlign: "middle", display: "inline-block", height: 220, margin: "10px auto", padding: 10}}>
                <div style={{ background: "#2A0E59", borderRadius: 10, padding: 10}}>
                <Container>
                    <Row>
                        <Col xs={8}>
                            <p style={{color: "#fff", fontSize: 12, fontWeight: "bold", marginLeft: -10}}>WALLET BALANCE</p>
                        </Col>
                    
                        <Col xs={3}>
                            <span className="fa fa-arrow-down" style={{color: "#fff", fontSize: 10, fontWeight: "bold"}}><a onClick={() => {
                                this.setState({
                                    showWallets: "block"
                                })
                            }} href="#" style={{color: "#fff"}}>Switch Wallet</a></span>
                        </Col>       
                    </Row>   
                         
                </Container>
                <br />
                <p style={{color: "#fff", fontSize: 12, fontWeight: "100", marginBottom: 0}}>AICB NAIRA</p>
                <p style={{color: "#fff", fontSize: 25, fontWeight: "800", marginBottom: 0}}>{this.state.balance}</p>
                <p style={{color: "#fff", fontSize: 12, fontWeight: "100", marginBottom: 0}}>= NGN {this.state.balance}</p>
                </div>
                <div className="row" style={{padding:20}}>
               
                <div onClick={() => {
                    this.setState({
                        showFlight: true
                    })
                }} className="col-3 desktop-btn" style={{background: "#fff", color: "#BA36E5", padding: 5, borderRadius: 5}}>
                    <h6 style={{fontSize: 12,textAlign: "center"}}>Send</h6>
                </div>
                <div className="col-1">

                </div>
                <div onClick={() => {
                    this.setState({
                        showFlight: true
                    })
                }} className="col-3 desktop-btn" style={{background: "#fff", color: "#BA36E5", padding: 5, borderRadius: 5}}>
                    <h6 style={{fontSize: 12,textAlign: "center"}}>Receive</h6>
                </div>
                <div className="col-1">
                    
                </div>
                <div onClick={() => {
                    this.setState({
                        showFlight: true
                    })
                }} className="col-3 desktop-btn" style={{background: "#fff", color: "#BA36E5", padding: 5, borderRadius: 5}}>
                    <h6 style={{fontSize: 12,textAlign: "center"}}>Buy</h6>
                </div>
                
            </div> 
            </div>
            
            </div>  
            
        </Container>
       
                <div className="destop-wallet-div" style={{background: "#fff", width: "95%", borderRadius: 10,}}>
                    <div className="row">
                        <div onClick={() => {this.setState({
                            showPortfolio: "block",
                            showWatchlist: "none",
                            showExplore: "none",
                            portfolio: "#7CC5E3",
                            watchlist: "#fff",
                            explore: "#fff",
                        })}} className="col-4" style={{background: this.state.portfolio, justifyContent: "center", alignContent: "center", alignItems: "center", flex: 1}}>
                            <p style={{color:"#5F49DB", marginTop: 10, textAlign: "center"}}>Portfolio</p>
                        </div>
                        <div onClick={() => {this.setState({
                            showPortfolio: "none",
                            showWatchlist: "block",
                            showExplore: "none",
                            portfolio: "#fff",
                            watchlist: "#7CC5E3",
                            explore: "#fff",
                        })}} className="col-4" style={{background: this.state.watchlist}}>
                            <p style={{color:"#5F49DB", marginTop: 10, textAlign: "center"}}>Watchlist</p>
                        </div>
                        <div onClick={() => {this.setState({
                            showPortfolio: "none",
                            showWatchlist: "none",
                            showExplore: "block",
                            portfolio: "#fff",
                            watchlist: "#fff",
                            explore: "#7CC5E3",
                        })}} className="col-4" style={{background: this.state.explore}}>
                            <p style={{color:"#5F49DB", marginTop: 10, textAlign: "center"}}>Explore</p>
                        </div>
                    </div>


                    <div style={{display: this.state.showPortfolio}}>
                    <div onClick={() => {
                    this.setState({
                        showFlight: true
                    })
                }} className="row" style={{marginTop: 30}}>
                        <div className="col-2">
                            <img src="https://png.pngitem.com/pimgs/s/124-1245793_ethereum-eth-icon-ethereum-png-transparent-png.png" width="50px"></img>
                        </div>
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Ethereum</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>ETH</p>
                        </div>
                        
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0, textAlign: "right"}}>0.0ETH</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0, textAlign: "right"}}>NGN 7,980.00</p>
                        </div>
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    <div className="row" onClick={() => {
                    this.setState({
                        showFlight: true
                    })
                }} style={{marginTop: 10}}>
                        <div className="col-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/2000px-BTC_Logo.svg.png" width="50px"></img>
                        </div>
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Bitcoin</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>BTC</p>
                        </div>
                        
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0, textAlign: "right"}}>0.0BTC</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0, textAlign: "right"}}>NGN 7,980.00</p>
                        </div>
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    <div className="row" onClick={() => {
                    this.setState({
                        showFlight: true
                    })
                }} style={{marginTop: 30}}>
                        <div className="col-2">
                            <img src="https://assets.coingecko.com/coins/images/1203/large/neutron.png?1548086028" width="50px"></img>
                        </div>
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Neutron</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>NTRN</p>
                        </div>
                        
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0, textAlign: "right"}}>0.0NTRN</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0, textAlign: "right"}}>NGN 7,980.00</p>
                        </div>
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    <div className="row" onClick={() => {
                    this.setState({
                        showFlight: true
                    })
                }} style={{marginTop: 30}}>
                        <div className="col-2">
                            <img src="https://assets.coingecko.com/coins/images/11941/large/trnd-ico-200.png?1605147194" width="50px"></img>
                        </div>
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Trendering</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>TRND</p>
                        </div>
                        
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0, textAlign: "right"}}>0.0TRND</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0, textAlign: "right"}}>NGN 7,980.00</p>
                        </div>
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    <div className="row" onClick={() => {
                    this.setState({
                        showFlight: true
                    })
                }} style={{marginTop: 30}}>
                        <div className="col-2">
                            <img src="https://assets.coingecko.com/coins/images/4038/large/biotron.png?1547039163" width="50px"></img>
                        </div>
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Biotron</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>BTRN</p>
                        </div>
                        
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0, textAlign: "right"}}>0.0BTRN</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0, textAlign: "right"}}>NGN 7,980.00</p>
                        </div>
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    </div>




                    <div className="" style={{display: this.state.showWatchlist}}>
                    <div className="row" style={{marginTop: 30}}>
                        <div className="col-2">
                            <img src="https://png.pngitem.com/pimgs/s/124-1245793_ethereum-eth-icon-ethereum-png-transparent-png.png" width="50px"></img>
                        </div>
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Ethereum</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>ETH</p>
                        </div>
                        
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0, textAlign: "right"}}>0.0ETH</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0, textAlign: "right"}}>NGN 7,980.00</p>
                        </div>
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    <div className="row" style={{marginTop: 10}}>
                        <div className="col-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/2000px-BTC_Logo.svg.png" width="50px"></img>
                        </div>
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Bitcoin</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>BTC</p>
                        </div>
                        
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0, textAlign: "right"}}>0.0BTC</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0, textAlign: "right"}}>NGN 7,980.00</p>
                        </div>
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    <div className="row" style={{marginTop: 30}}>
                        <div className="col-2">
                            <img src="https://assets.coingecko.com/coins/images/1203/large/neutron.png?1548086028" width="50px"></img>
                        </div>
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Neutron</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>NTRN</p>
                        </div>
                        
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0, textAlign: "right"}}>0.0NTRN</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0, textAlign: "right"}}>NGN 7,980.00</p>
                        </div>
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    <div className="row" style={{marginTop: 30}}>
                        <div className="col-2">
                            <img src="https://assets.coingecko.com/coins/images/11941/large/trnd-ico-200.png?1605147194" width="50px"></img>
                        </div>
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Trendering</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>TRND</p>
                        </div>
                        
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0, textAlign: "right"}}>0.0TRND</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0, textAlign: "right"}}>NGN 7,980.00</p>
                        </div>
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    <div className="row" style={{marginTop: 30}}>
                        <div className="col-2">
                            <img src="https://assets.coingecko.com/coins/images/4038/large/biotron.png?1547039163" width="50px"></img>
                        </div>
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Biotron</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>BTRN</p>
                        </div>
                        
                        <div className="col-5">
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0, textAlign: "right"}}>0.0BTRN</p>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0, textAlign: "right"}}>NGN 7,980.00</p>
                        </div>
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    </div>
                    





                    <div className="" style={{display: this.state.showExplore}}>
                    <div className="row" style={{marginTop: 30, padding: 10, background: "#f0f0f0"}}>
                        <div className="col-4">
                            <img src="https://www.aljazeera.com/wp-content/uploads/2021/02/bitcoin.jpg?resize=770%2C513" width="100%"></img>
                        </div>
                        <div className="col-8">
                            <strong><p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Bitcoin Pump</p></strong>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0}}>Elon Musk will pum Bitcoin tommorrow. Buy as many as possible please. Trade with sense anyways</p>
                        </div>
                        
                        
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    <div className="row" style={{marginTop: 30, padding: 10, background: "#f0f0f0"}}>
                        <div className="col-4">
                            <img src="https://www.aljazeera.com/wp-content/uploads/2021/02/bitcoin.jpg?resize=770%2C513" width="100%"></img>
                        </div>
                        <div className="col-8">
                            <strong><p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Bitcoin Pump</p></strong>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0}}>Elon Musk will pum Bitcoin tommorrow. Buy as many as possible please. Trade with sense anyways</p>
                        </div>
                        
                        
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    <div className="row" style={{marginTop: 30, padding: 10, background: "#f0f0f0"}}>
                        <div className="col-4">
                            <img src="https://www.aljazeera.com/wp-content/uploads/2021/02/bitcoin.jpg?resize=770%2C513" width="100%"></img>
                        </div>
                        <div className="col-8">
                            <strong><p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Bitcoin Pump</p></strong>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0}}>Elon Musk will pum Bitcoin tommorrow. Buy as many as possible please. Trade with sense anyways</p>
                        </div>
                        
                        
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    <div className="row" style={{marginTop: 30, padding: 10, background: "#f0f0f0"}}>
                        <div className="col-4">
                            <img src="https://www.aljazeera.com/wp-content/uploads/2021/02/bitcoin.jpg?resize=770%2C513" width="100%"></img>
                        </div>
                        <div className="col-8">
                            <strong><p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Bitcoin Pump</p></strong>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0}}>Elon Musk will pum Bitcoin tommorrow. Buy as many as possible please. Trade with sense anyways</p>
                        </div>
                        
                        
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    <div className="row" style={{marginTop: 30, padding: 10, background: "#f0f0f0"}}>
                        <div className="col-4">
                            <img src="https://www.aljazeera.com/wp-content/uploads/2021/02/bitcoin.jpg?resize=770%2C513" width="100%"></img>
                        </div>
                        <div className="col-8">
                            <strong><p style={{color: "#5F49DB", fontSize: 14, fontWeight: "bold", marginBottom: 0}}>Bitcoin Pump</p></strong>
                            <p style={{color: "#5F49DB", fontSize: 14, fontWeight: "200", marginBottom: 0}}>Elon Musk will pum Bitcoin tommorrow. Buy as many as possible please. Trade with sense anyways</p>
                        </div>
                        
                        
                    </div>
                    <hr style={{color: "#000", width: "100%", marginLeft: 0, marginTop: 5, height: 0.1, background: "#000"}} />
                    </div>
                </div>




                


            
            

            

            <div className="desktop-fixed" style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showBill, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "70%", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>International Transfer</h6></strong>
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
                        <p style={{fontSize: 10}}>You are sending</p>
                                
                        <form style={{ display: "inline"}}>
                            <input style={{padding: 10, width: "50%", display: "inline", background: "#f0f0f0", height: 40,}} value="1,000" className="form-control"></input>
                        </form>
                        <form style={{ display: "inline"}}>
                            <select style={{border: "0px", color: "#fff", fontWeight: "bold", width: "47%", background: "#2A0E59", height: 40, marginLeft: 5}}>
                                <option>CB GBP</option>
                            </select>
                        </form>
                        <br />
                        <p style={{fontSize: 10}}>Recipient gets</p>
                                
                        <form style={{ display: "inline"}}>
                            <input style={{padding: 10, width: "50%", display: "inline", background: "#f0f0f0", height: 40,}} value="546,000" className="form-control"></input>
                        </form>
                        <form style={{ display: "inline"}}>
                            <select style={{border: "0px", color: "#fff", fontWeight: "bold", width: "47%", background: "#2A0E59", height: 40, marginLeft: 5}}>
                                <option>CB NGN</option>
                            </select>
                        </form>
                        <br />

                    <div className="row" style={{marginTop: 10, background: "#F6F0F0"}}>
                        <div className="col-4">
                            <p style={{color: "#000", fontWeight: "700", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Transfer Fee</p>
                                
                        </div>
                            
                        <div className="col-8">
                            <p style={{color: "#000", fontWeight: "700", float: "right", fontSize: 12, fontWeight: "100", marginBottom: 0}}>1,555.53</p>
                        </div>
                        <br />
                        <div className="col-4">
                            <p style={{color: "#000", fontWeight: "700", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Convert Rate</p>                                
                        </div>                       
                            
                        <div className="col-8">
                            <p style={{color: "#000", fontWeight: "700", float: "right", fontSize: 12, fontWeight: "100", marginBottom: 0}}>1 CB GBP = 546 CB NGN</p>
                        </div>
                        <br />
                        <div className="col-4">
                            <p style={{color: "#000", fontWeight: "700", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Arrival Time</p>                                
                        </div>                       
                            
                        <div className="col-8">
                            <p style={{color: "#000", fontWeight: "700", float: "right", fontSize: 12, fontWeight: "100", marginBottom: 0}}>Within 30 minutes</p>
                        </div>
                    </div>
                    <br />
                    <center>
                        <button onClick={() => {
                                    this.setState({
                                        showBill: "none",
                                        showTv: true
                                    })
                                }} style={{width: "95%"}} className="btn btn-primary">Continue</button><br /><br />
                        
                    </center>
                    
                </div>
            </div>
                  
            

            <div className="desktop-fixed" style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showAirtime, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
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
        

            
            

            <div className="desktop-fixed" style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showElectricity, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
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

            <div className="desktop-fixed" style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showTv, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
                <div style={{background: "rgba(255, 255, 255, 1)", height: "70%", overflowY: "auto", padding: 30, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99999}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <strong><h6>Recipient's Details</h6></strong>
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
                        <p style={{fontSize: 10, marginBottom: 0}}>Wallet Address</p>
                        <input placeholder="AICB Wallet Address" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />
                        <p style={{fontSize: 10, marginBottom: 0}}>Phone Number</p>
                        <input placeholder="+234  090909090909" style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control"></input>      
                        <br />
                        <p style={{fontSize: 10, marginBottom: 0}}>Country</p>
                        <select style={{background: "#f0f0f0", border: "0px", width: "100%"}} className="form-control">
                            <option value="BEDC">Nigeria</option>
                        </select>  
                        <br />  
                        <p style={{fontSize: 10, marginBottom: 0}}>Note (Optional)</p>
                        <input placeholder="Amount" style={{background: "#f0f0f0", border: "0px", height: 50, width: "100%"}} className="form-control"></input>      
                        <br />      
                        <button style={{width: "100%"}} className="btn btn-primary">Continue</button>  
                    </form>
                </div>
            </div>

            <div className="desktop-fixed" style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showInternet, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
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

            <div className="desktop-fixed" style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showHotel, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999}}>
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

            <div className="desktop-fixed" style={{background: "rgba(000, 000, 000, .5)", overflowY: "auto", display: this.state.showHotelDetails, height: "100%", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 9999999}}>
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
                
                <BottomNavigationAction onClick={() => window.location.replace("/user-wallet")} style={{color: "#fff", background: "#2A0E59"}} label="" 
                                        icon={<WalletIcon />} />
                <BottomNavigationAction onClick={() => window.location.replace("/wallet")} value="wallet" style={{color: "#7CC5E3",}} label=""
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
