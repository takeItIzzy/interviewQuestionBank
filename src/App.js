import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.scss";
import Editor from "./screen/Editor";

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" component={Editor} />
				</Switch>
			</Router>
		);
	}
}

export default App;