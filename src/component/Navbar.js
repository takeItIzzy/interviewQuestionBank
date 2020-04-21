import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

@withRouter
@inject("store")
@observer
class Navbar extends Component {
	state = {};
	render() {
		return (
			<div
				className="navBar"
				style={{
					display: this.props.store.viewType === 0 ? "none" : "block",
				}}
			>
				<Button
					icon={this.props.store.viewType === 1 ? "circle" : "arrow-left"}
					minimal={true}
					intent="warning"
					onClick={() => {
						this.props.store.viewType > 1 &&
							(this.props.store.viewType -= 1);
					}}
				/>
                <span>{this.props.store.appname}</span>
			</div>
		);
	}
}

export default Navbar;
