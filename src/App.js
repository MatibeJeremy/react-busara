import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Form from "./Components/Form";
import Home from "./Components/Home";
import Questions from "./Components/Questions";
function App() {
  return (
      <Router basename={`/`}>
    <div className="App">
        <Navbar/>
        <Switch>
            <Route path="/login" component={Form} />
            <Route path="/home" component={Home} />
            <Route path="/questions" component={Questions} />
            <Redirect to="/login" />
        </Switch>
    </div>
      </Router>
  );
}

export default App;
