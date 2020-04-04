import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import DocumentTitle from "react-document-title";

import SideBar from "../component/SideBar";
import NoteList from "../component/NoteList";
import NotePage from '../component/NotePage';

@withRouter
@inject("store")
@observer
export default class Editor extends Component {
	render() {
		const main = (
			<div className="editorBox">
				<SideBar />
				<NoteList />
				<NotePage />
			</div>
		);
		return (
			<DocumentTitle title={this.props.store.appname}>
				{main}
			</DocumentTitle>
		);
	}
}
