import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import DocumentTitle from "react-document-title";

import Navbar from "../component/Navbar";
import SideBar from "../component/SideBar";
import NoteList from "../component/NoteList";
import NotePage from "../component/NotePage";

@withRouter
@inject("store")
@observer
export default class Editor extends Component {
	componentDidMount() {
		if (window.innerWidth < 800) {
			this.props.store.viewType = 1;
		}
	}
	render() {
		const main = (
			<>
				<Navbar />
				<div className="editorBox">
					{(this.props.store.viewType === 0 ||
						this.props.store.viewType === 1) && <SideBar />}
					{(this.props.store.viewType === 0 ||
						this.props.store.viewType === 2) && <NoteList />}
					{(this.props.store.viewType === 0 ||
						this.props.store.viewType === 3) && <NotePage />}
				</div>
			</>
		);
		return (
			<DocumentTitle title={this.props.store.appname}>
				{main}
			</DocumentTitle>
		);
	}
}
