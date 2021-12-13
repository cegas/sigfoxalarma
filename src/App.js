
import './App.css';
import Map from './components/Map';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  HashRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NavBar from './components/NavBar';
import Inicio from './pages/Inicio';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Registrarse from './pages/Registrarse';
import Reservar from './pages/Reservar';
import Historial from './pages/Historial';



function App() {
  return (
    <div >
      <HashRouter>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route exact path="/registro" component={Registrarse}/>

          <PrivateRoute exact path="/Reservar/" component={Reservar}/>

        </Switch>
      </HashRouter>

      {/* <Map/> */}
    </div>
  );
}

export default App;
