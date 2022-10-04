import logo from './logo.svg';
import './App.css';
import { Button, Nav, Container, Row, Col } from 'react-bootstrap';
import BottomNavigation from 'reactjs-bottom-navigation'
import secureIcon from './secure.png';
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
  var check = localStorage.getItem("r_keys");
  if(check !== null && check !== ""){
    window.location.replace("./wallet");
  }
  return (
    <div className="App">      
      <br />
      <Container>
        <Row>
          <Col className="col-md-12">
            <div className="onboarding-container">
              <img src={secureIcon} width="200px" sty />
              <strong><h6>Private and Secure</h6></strong>
              <p style={{fontSize: 11}}>We use private keys that never leave your phone</p>
            </div>
            <div className="btn-div">
              <center>
              <Link to="/create"><a class="btn btn-primary">Create a wallet</a></Link><br /><br />
                <a class="btn btn-outline-primary">I already have a wallet</a>
              </center>
              
            </div>
          </Col>
         
        </Row>
       
      </Container>
      
    </div>
  );
}

export default App;
