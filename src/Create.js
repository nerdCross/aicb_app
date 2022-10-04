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
      <Link to="/">
        <span className="fa fa-arrow-left" style={{fontSize: 20, color: "#000", marginTop: 20, marginLeft: 20}}></span>
      </Link>   
      <br />
      <Container style={{marginTop: -60}}>
        <Row>
          <Col className="col-md-12">
            <div className="onboarding-container">              
              <strong><h6>Backup your wallet Now!</h6></strong>
              <p style={{fontSize: 11}}>In the next step you will see 12 words that allows you to recover a wallet.</p>
            </div>
            <center>

            <img style={{marginTop: -70, marginLeft: "auto", marginRight: "auto"}} src={backupIcon} width="200px" />
            </center>
            <div className="btn-div">
              <center>
                <p style={{fontSize: 10,fontWeight: "bold", textAlign: "left", paddingLeft: 40, paddingRight: 40}}>
                <form>
                    <label>
                        <input id="accept" type="checkbox" name="name" />  
                        I understand that if I lose my recovery words, I will not be able to access my wallet.
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
      window.location.replace("/recovery-phrase")
    }else{
        alert("Please accept condition")
    }
}

export default App;
