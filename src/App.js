import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./index.scss";
import Editor from "./screen/Editor";
import Login from "./screen/Login";

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" component={Editor} exact />
					<Route path="/login" component={Login} exact />
					<Route path="/register" component={Login} exact />
				</Switch>
			</Router>
		);
	}
}

export default App;
