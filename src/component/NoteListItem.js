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

import { Backend } from "../func&var/Variables";
import axiosWithToken from "../axiosWithToken";

@withRouter
@inject("store")
@observer
@ContextMenuTarget
class NoteListItem extends Component {
	state = {
		title: this.props.title,
		copyTitle: this.props.title, //复制标题，用来取消重命名
	};

	leftClick() {
		this.props.store.noteClickId = this.props._id;
		this.props.store.noteClickTitle = this.props.title;

		this.props.store.queryMD(this.props._id);
	}

	renameNote() {
		this.props.store.noteRenameId = this.props._id;
	}

	async saveRename() {
		await new axiosWithToken(this.props.store.token)
			.post(`${Backend}/notelist/saverename`, {
				user: this.props.store.username, //用户名
				cusid: this.props._id, // 列表选项id
				nodeId: this.props.nodeId, //列表所属树节点 id
				title: this.state.title, //列表标题
			})
			.then((res) => {
				if (res.data.isError) {
					throw res.data.error;
				}
				this.props.store.noteRenameId = "";
				this.props.store.changeNoteList(JSON.parse(res.data.noteList));
				this.props.store.noteClickTitle = this.state.title;
				this.setState({
					copyTitle: this.state.title,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	cancelRename() {
		this.setState({
			title: this.state.copyTitle,
		});
		this.props.store.noteRenameId = "";
	}

	async deleteNote() {
		if (!confirm("确定删除吗？")) return false;
		await new axiosWithToken(this.props.store.token)
			.post(`${Backend}/notelist/deletenote`, {
				user: this.props.store.username, //用户名
				cusid: this.props._id, //列表选项id
				nodeId: this.props.nodeId, //列表所在树节点id
			})
			.then((res) => {
				if (res.data.isError) {
					throw res.data.error;
				}
				this.props.store.changeNoteList(JSON.parse(res.data.noteList));
			})
			.catch((error) => {
				console.error(error);
			});
	}

	//渲染右键菜单
	renderContextMenu() {
		return (
			<Menu className="rightMenu">
				<Menu.Item
					icon="annotation"
					onClick={() => this.renameNote()}
					text="重命名"
				/>
				<Menu.Divider />
				<Menu.Item
					icon="delete"
					onClick={() => this.deleteNote()}
					text="删除该项"
				/>
			</Menu>
		);
	}
	render() {
		return (
			<div
				className={
					this.props.store.noteClickId === this.props._id
						? "itemActive"
						: "item"
				}
				onClick={() => this.leftClick()}
			>
				{this.props.store.noteRenameId === this.props._id ? (
					<ControlGroup fill vertical={false}>
						<InputGroup
							value={this.state.title}
							onChange={(e) =>
								this.setState({ title: e.target.value })
							}
						/>
						<Button
							icon="small-tick"
							onClick={() => this.saveRename()}
						/>
						<Button
							icon="small-cross"
							onClick={() => this.cancelRename()}
						/>
					</ControlGroup>
				) : (
					this.state.title
				)}
			</div>
		);
	}
}

export default NoteListItem;
