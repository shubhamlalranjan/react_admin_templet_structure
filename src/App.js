import logo from "./logo.svg";
import "./App.css";
import MainComponent from "./components/MainComponent";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" render={(props) => <LoginPage {...props} />} />
        <Route path="/" render={(props) => <MainComponent {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
