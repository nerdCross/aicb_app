import logo from './logo.svg';
import './App.css';
import { Button, Nav, Container, Row, Col } from 'react-bootstrap';
import BottomNavigation from 'reactjs-bottom-navigation'
import backupIcon from './backup.jpg';
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
      <Link to="/recovery-phrase">
        <span className="fa fa-arrow-left" style={{fontSize: 20, color: "#000", marginTop: 20, marginLeft: 20}}></span>
      </Link>   
      <br />
      <Container style={{marginTop: -50}}>
        <Row>
          <Col className="col-md-12">
            <div className="onboarding-container">              
              <strong><h6>Verify Recovery Phrase</h6></strong>
              <p style={{fontSize: 11}}>
              Tap the words to put them next to each other in the correct order.
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
    <Container className="jumbotron" style={{marginTop: -50, padding: 20}}>
       
        <Row>
          <Col>
                <form>
                    <textarea id="veri-key" className="form-control textarea" placeholder="Paste your recovery key" style={{background: "transparent", border: 0, outline: "none", height: 100, padding: 20}}></textarea>
                </form>
          </Col>        
        </Row>
       
      </Container>
     
    </div>
  );
}
function proceed(){
    var keys = localStorage.getItem("r_keys");
    var veri_key = document.getElementById("veri-key").value;
    if(keys === veri_key){
        window.location.replace("/user-wallet")
    }else{
        alert("Invalid Recovery key. Please check well");
    }
    
}

export default App;
