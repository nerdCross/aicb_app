import logo from './logo.svg';
import './App.css';
import { Button, Nav, Container, Row, Col } from 'react-bootstrap';
import BottomNavigation from 'reactjs-bottom-navigation'
import backupIcon from './caution.png';
import 'reactjs-bottom-navigation/dist/index.css'
import { HomeOutlined, SearchOutlined, BellOutlined, MenuOutlined } from '@ant-design/icons';
import CreateWallet from './Create';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  
  return (
    <div className="App">   
      <Link to="/multicoin">
        <span className="fa fa-arrow-left" style={{fontSize: 20, color: "#000", marginTop: 20, marginLeft: 20}}></span>
      </Link>   
      <br />
      <Container style={{marginTop: -60}}>
        <Row>
          <Col className="col-md-12">
            <center>
            <img style={{marginTop: 150, marginLeft: "auto", marginRight: "auto"}} src={backupIcon} width="200px" />
            </center>
            
            <div className="btn-div">
                <div style={{width: "80%", alignSelf: "center", margin: "10px auto"}}>              
                    <p style={{fontSize: 11, textAlign: "left"}}><span style={{color: "orange"}} className="fa fa-exclamation-triangle"></span>The recovery phrase is the master key to your funds. Never share it with anyone else.</p>
                    <p style={{fontSize: 11, textAlign: "left"}}><span style={{color: "orange"}} className="fa fa-exclamation-triangle"></span>AICB will never ask you to share your recovery phrase.</p>
                    <p style={{fontSize: 11, textAlign: "left"}}><span style={{color: "orange"}} className="fa fa-exclamation-triangle"></span>If you lose your recovery phrase, not even AICB can recover your funds.</p>
                </div>
              <center>
                <p style={{fontSize: 10,fontWeight: "bold", textAlign: "left", paddingLeft: 40, paddingRight: 40}}>
                <form>
                    <label>
                        <input id="accept" type="checkbox" name="name" />  
                        I understand the risk.
                    </label>
                    </form>
                   </p>
                <a onClick={proceed} style={{width: "80%"}} class="btn btn-primary">Continue</a>
              </center>
              
            </div>
          </Col>
         
        </Row>
       
      </Container>
      
    </div>
  );
}
function proceed(){
    var checkeds = document.getElementById("accept");
    if(checkeds.checked){
      window.location.replace("/recovery-phrase-2")
    }else{
        alert("Please accept condition")
    }
}

export default App;
