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
        <strong><h5 style={{fontWeight: "700", marginTop: 20}}>Security</h5></strong> 
        <Container>
            <Link to="#show-pass" style={{color: "#000"}}onClick={() => {
                        this.setState({
                            showPass: "block"
                        })
                    }} >
                <Row style={{marginTop: 15, background: "#fff", justifyContent: "flex-start", height: "auto", padding: 2, borderRadius: 5}}>
                    <Col xs={2}>
                        <div style={{background: "#000", width: 35, height: 35, padding: 5}}>
                            <span className="fas fa-lock" style={{color: "#fff", fontSize: 24}}></span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <p style={{fontWeight: "700", marginTop: 14, fontSize: 14}}>Change Passcode</p>
                    </Col>
                    <Col xs={1} style={{alignContent: "flex-end"}}>
                        <span className="fa fa-chevron-right" style={{color: "#000", fontSize: 16,marginTop: 14, alignSelf: "flex-end"}}></span>
                    </Col>    
                </Row>
            </Link>
                <Row style={{marginTop: 15, background: "#fff", justifyContent: "flex-start", height: "auto", padding: 2, borderRadius: 5}} onClick={() => {
                    var getSettingspin = localStorage.getItem("pinSet");
                    if(getSettingspin === null || getSettingspin === undefined || getSettingspin === ""){
                        this.setState({
                            pinToggle: "fas fa-toggle-on"
                        })
                        localStorage.setItem("pinSet", "Yes");
                    }else if(getSettingspin === "Yes"){
                        this.setState({
                            pinToggle: "fas fa-toggle-off"
                        })
                        localStorage.setItem("pinSet", "No");
                    }else if(getSettingspin === "No"){
                        this.setState({
                            pinToggle: "fas fa-toggle-on"
                        })
                        localStorage.setItem("pinSet", "Yes");
                    }
                }}>
                    <Col xs={2}>
                        <div style={{background: "#000", width: 35, height: 35, padding: 5}}>
                            <span className="fas fa-key" style={{color: "#fff", fontSize: 24}}></span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <p style={{fontWeight: "700", marginTop: 14, fontSize: 14}}>Passcode</p>
                    </Col>
                    <Col xs={1} style={{alignContent: "flex-end"}}>
                        <a><span className={this.state.pinToggle} style={{color: "#000", fontSize: 16, alignSelf: "flex-end", marginTop: 5}}></span></a>
                    </Col>    
                </Row>
             
            
            <p style={{fontSize: 10, marginTop: 10}}>If you lose access to this device, your funds will be lost, unless you back up.</p>
        </Container>   
        <div className="slideout" style={{height: "85%", display: this.state.showPass, paddingTop: 40, boxShadow: "1px 1px 11px 1px #c4c5c6", width: "100%", position: "fixed", bottom: "0", background: "#fff", left: 0, borderTopRightRadius: 0,borderTopLeftRadius: 0, zIndex: 500, textAlign: "center"}}>
                <h6>Enter Previous Passcode</h6>
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
                                newPassStepOne: "block"
                            })
                        }else{
                            alert("Incorrect pin");
                        }
                    }} className="btn btn-primary">Continue</button>
                    <br /><br />
                    <button className="btn btn-outline-primary" onClick={() => {
                        this.setState({
                            showPass: "none"
                        })
                    }}>Cancel</button>
                </div>
        </div>     
        


        <div className="slideout" style={{height: "85%", display: this.state.newPassStepOne, paddingTop: 40, boxShadow: "1px 1px 11px 1px #c4c5c6", width: "100%", position: "fixed", bottom: "0", background: "#fff", left: 0, borderTopRightRadius: 0,borderTopLeftRadius: 0, zIndex: 500, textAlign: "center"}}>
                <h6>Enter New Passcode</h6>
                <form>
                    <input id="pinBoxStepOne" type="password" placeholder="* * * *" style={{width: 200, wordSpacing: 18, textAlign: "center", border: "0px", fontSize: 30, color: "#000",alignSelf: "center", fontWeight: 900, margin: "20px auto"}} className="form-control" disabled></input>
                </form>
                <div className="container">
                    <br />
                    <div className="row">
                        <div className="col-3">
                           
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepOne(1)} style={{fontWeight: "100", fontSize: 22}}>1</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepOne(2)} style={{fontWeight: "100", fontSize: 22}}>2</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepOne(3)} style={{fontWeight: "100", fontSize: 22}}>3</p>
                        </div>
                        <div className="col-3">
                            
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-3">
                           
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepOne(4)} style={{fontWeight: "100", fontSize: 22}}>4</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepOne(5)} style={{fontWeight: "100", fontSize: 22}}>5</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepOne(6)} style={{fontWeight: "100", fontSize: 22}}>6</p>
                        </div>
                        <div className="col-3">
                            
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-3">
                           
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepOne(7)} style={{fontWeight: "100", fontSize: 22}}>7</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepOne(8)} style={{fontWeight: "100", fontSize: 22}}>8</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepOne(9)} style={{fontWeight: "100", fontSize: 22}}>9</p>
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
                            <p onClick={() => pinClickStepOne(0)} style={{fontWeight: "100", fontSize: 22}}>0</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => deleteBoxStepOne()} style={{fontWeight: "100", fontSize: 22}}><span className="fa fa-backspace"></span></p>
                        </div>
                        <div className="col-3">
                            
                        </div>
                    </div>
                    <button onClick={() => checkPinStepOne()} className="btn btn-primary">Continue</button>
                    <br /><br />
                    <button className="btn btn-outline-primary" onClick={() => {
                        this.setState({
                            newPassStepOne: "none"
                        })
                    }}>Cancel</button>
                </div>
        </div> 

        <div className="slideout" style={{height: "85%", display: this.state.newPassStepTwo, paddingTop: 40, boxShadow: "1px 1px 11px 1px #c4c5c6", width: "100%", position: "fixed", bottom: "0", background: "#fff", left: 0, borderTopRightRadius: 0,borderTopLeftRadius: 0, zIndex: 500, textAlign: "center"}}>
                <h6>Confirm New Passcode</h6>
                {this.state.error}
                <form>
                    <input id="pinBoxStepTwo" type="password" placeholder="* * * *" style={{width: 200, wordSpacing: 18, textAlign: "center", border: "0px", fontSize: 30, color: "#000",alignSelf: "center", fontWeight: 900, margin: "20px auto"}} className="form-control" disabled></input>
                </form>
                <div className="container">
                    <br />
                    <div className="row">
                        <div className="col-3">
                           
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepTwo(1)} style={{fontWeight: "100", fontSize: 22}}>1</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepTwo(2)} style={{fontWeight: "100", fontSize: 22}}>2</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepTwo(3)} style={{fontWeight: "100", fontSize: 22}}>3</p>
                        </div>
                        <div className="col-3">
                            
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-3">
                           
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepTwo(4)} style={{fontWeight: "100", fontSize: 22}}>4</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepTwo(5)} style={{fontWeight: "100", fontSize: 22}}>5</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepTwo(6)} style={{fontWeight: "100", fontSize: 22}}>6</p>
                        </div>
                        <div className="col-3">
                            
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-3">
                           
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepTwo(7)} style={{fontWeight: "100", fontSize: 22}}>7</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepTwo(8)} style={{fontWeight: "100", fontSize: 22}}>8</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => pinClickStepTwo(9)} style={{fontWeight: "100", fontSize: 22}}>9</p>
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
                            <p onClick={() => pinClickStepTwo(0)} style={{fontWeight: "100", fontSize: 22}}>0</p>
                        </div>
                        <div className="col-2">
                            <p onClick={() => deleteBoxStepTwo()} style={{fontWeight: "100", fontSize: 22}}><span className="fa fa-backspace"></span></p>
                        </div>
                        <div className="col-3">
                            
                        </div>
                    </div>
                    <button onClick={() => checkPinStepTwo()} className="btn btn-primary">Continue</button>
                    <br /><br />
                    <button className="btn btn-outline-primary" onClick={() => {
                        this.setState({
                            newPassStepTwo: "none"
                        })
                    }}>Cancel</button>
                </div>
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
 function checkPin(){
    var pinBoxVal = document.getElementById("pinBox").value;
    if(pinBoxVal.length < 4){
        alert("Minimum of 4 numbers")
    }else if(pinBoxVal.length == 4){

    }
 }

 function pinClickStepOne(args){
    var pinBox = document.getElementById("pinBoxStepOne").value; 
    if(pinBox.length == 4){
        
    }else if(pinBox.length < 4){
       var newVal = pinBox += args;
       document.getElementById("pinBoxStepOne").value = newVal;
    }
}
function deleteBoxStepOne(){
   var pinBoxVal = document.getElementById("pinBoxStepOne").value;
   var newStr = pinBoxVal.substring(0, pinBoxVal.length - 1);
   document.getElementById("pinBoxStepOne").value = newStr;
}

function pinClickStepTwo(args){
    var pinBox = document.getElementById("pinBoxStepTwo").value; 
    if(pinBox.length == 4){
        
    }else if(pinBox.length < 4){
       var newVal = pinBox += args;
       document.getElementById("pinBoxStepTwo").value = newVal;
    }
}
function deleteBoxStepTwo(){
   var pinBoxVal = document.getElementById("pinBoxStepTwo").value;
   var newStr = pinBoxVal.substring(0, pinBoxVal.length - 1);
   document.getElementById("pinBoxStepTwo").value = newStr;
}

export default App;
