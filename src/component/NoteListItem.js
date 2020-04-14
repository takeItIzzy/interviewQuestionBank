import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import {
	Icon,
	Colors,
	Menu,
	ControlGroup,
	Button,
	InputGroup,
} from "@blueprintjs/core";
import { ContextMenuTarget } from "@blueprintjs/core/lib/esnext/components";

@withRouter
@inject("store")
@observer
@ContextMenuTarget
class NoteListItem extends Component {
	//TODO 刚把右键菜单复制过来，还没写重命名和删除逻辑
	renderContextMenu(e) {
		let clickedNode = e.target;
		return (
			<Menu className="rightMenu">
				<Menu.Item
					icon="annotation"
					onClick={() => this.renameNode(clickedNode)}
					text="重命名"
				/>
				<Menu.Divider />
				<Menu.Item
					icon="delete"
					onClick={() => this.deleteNode(clickedNode)}
					text="删除该项"
				/>
			</Menu>
		);
	}
	render() {
		return <div className="item">{this.props.itemName}</div>;
	}
}

export default NoteListItem;
