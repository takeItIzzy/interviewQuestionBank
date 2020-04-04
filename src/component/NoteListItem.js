import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";

@withRouter
@inject("store")
@observer
class NoteListItem extends Component {
	render() {
		return <div className="item">{this.props.itemName}</div>;
	}
}

export default NoteListItem;
