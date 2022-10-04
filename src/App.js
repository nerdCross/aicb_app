import logo from './logo.svg';
import './App.css';
import { Button, Nav, Container, Row, Col } from 'react-bootstrap';
import BottomNavigation from 'reactjs-bottom-navigation'
import secureIcon from './secure.png';
import 'reactjs-bottom-navigation/dist/index.css'
import { HomeOutlined, SearchOutlined, BellOutlined, MenuOutlined } from '@ant-design/icons';
import HomePage from './Home';
import CreateWallet from './Create';
import Recov from './Recovery'
import Wallet from './Wallet'
import Settings from './Settings'
import WalletSettings from './WalletSettings'
import MultiCoins from './MultiCoin'
import ShowConfirms from './ShowConfirm'
import RecoveryPhrases from './RecoveryPhrase'
import SecuritiesPage from './Security'
import Preferences from './Preference'
import VerifyRecov from './VerifyRecovery'
import PushNotifications from './PushNotification'
import PriceAlerts from './PriceAlert'
import Abouts from './About'
import Utilities from './Utility'
import Managements from './Management'
import Swaps from './Swap'
import Liquidities from './Liquidity'
import Farms from './Farm'
import Pools from './Pool'
import WalletPages from './WalletPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  
  return (
    <Router>
    <Switch>
          <Route path="/recovery-phrase-2">
            <RecoveryPhrase />
          </Route>
          <Route path="/user-wallet">
            <WalletPage />
          </Route>
          <Route path="/pool">
            <Pool />
          </Route>
          <Route path="/farm">
            <Farm />
          </Route>
          <Route path="/liquidity">
            <Liquidity />
          </Route>
          <Route path="/swap">
            <Swap />
          </Route>
          <Route path="/management">
            <Management />
          </Route>
          <Route path="/utility">
            <Utility />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/price-alert">
            <PriceAlert />
          </Route>
          <Route path="/notification">
            <PushNotification />
          </Route>
          <Route path="/preference">
            <Preference />
          </Route>
          <Route path="/security">
            <Securities />
          </Route>
          <Route path="/confirm-show-recovery">
            <ShowConfirm />
          </Route>
          <Route path="/multicoin">
            <MultiCoin />
          </Route>
          <Route path="/wallet-settings">
            <WalletSetting />
          </Route>
          <Route path="/settings">
            <Setting />
          </Route>
          <Route path="/wallet">
            <Dashboard />
          </Route>
          <Route path="/verify-recovery-phrase">
            <VerifyRecovery />
          </Route>
          <Route path="/recovery-phrase">
            <Recovery />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/login">
            <Create />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

function Home() {
  return <HomePage />;
}

function Create() {
  return <CreateWallet />;
}

function Login() {
  return <CreateWallet />;
}
function Recovery() {
  return <Recov />;
}
function VerifyRecovery() {
  return <VerifyRecov />;
}
function Dashboard() {
  return <Wallet />;
}
function Setting() {
  return <Settings />;
}

function WalletSetting() {
  return <WalletSettings />;
}
function MultiCoin() {
  return <MultiCoins />;
}
function ShowConfirm() {
  return <ShowConfirms />;
}

function RecoveryPhrase() {
  return <RecoveryPhrases />;
}
function Securities() {
  return <SecuritiesPage />;
}
function Preference() {
  return <Preferences />;
}
function PushNotification() {
  return <PushNotifications />;
}
function PriceAlert() {
  return <PriceAlerts />;
}
function Utility() {
  return <Utilities />;
}
function About() {
  return <Abouts />;
}
function Management() {
  return <Managements />;
}
function Swap() {
  return <Swaps />;
}

function Liquidity() {
  return <Liquidities />;
}

function Farm() {
  return <Farms />;
}


function Pool() {
  return <Pools />;
}

function WalletPage() {
  return <WalletPages />;
}


export default App;
