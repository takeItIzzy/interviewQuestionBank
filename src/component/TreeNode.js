import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
	Icon,
	Colors,
	Menu,
	MenuItem,
	MenuDivider,
	ControlGroup,
	Button,
	InputGroup,
} from "@blueprintjs/core";
import { ContextMenuTarget } from "@blueprintjs/core/lib/esnext/components";

import { Backend } from "../func&var/Variables";

@withRouter
@inject("store")
@observer
@ContextMenuTarget
class TreeNode extends Component {
	state = {
		//! 这里遇到个大坑，切记！
		//! 一开始把 render() 递归时传进来的 store 都赋给了 state，这是错误的，会导致 mobx 监听不到属性变化，这是我刚学习 mobx 时犯下的错误
		//! 虽然这个错误示范我学了 mobx 一阵子就知道了，但是 render() 时使用 this.state.child.map 这里好久都没注意到，导致排查 bug 花了很久
		//! 后来调整的时候把大部分的 state 都删掉了，但是重命名时需要在输入框中进行 name 的双向绑定，所以保留了 name 的赋值
		name: this.props.name,
		copyName: this.props.name, //标签名备份，用于取消重命名时恢复原值
		isShow: true,
		isFile: true,
		newNodeName: "", //右键菜单中输入框
	};

	leftClickTreeLine() {
		//如果页面中有正在重命名的节点，中断点击事件
		if (this.props.store.treeRenameId != "") {
			return false;
		}
		//显示&隐藏列表
		this.setState((prev, next) => ({
			isShow: !this.state.isShow,
		}));

		//对类型为小组的节点进行相关操作
		if (this.props.type === "file") {
			this.props.store.treeClickId = this.props.cusid; //改变节点点击背景色

			//传递被点击节点的小组列表
			//TODO
		}
	}

	//新建小组和新建分区逻辑类似，放到一个函数中，通过参数区分是 folder 还是 file
	async createNode(clickedNode, createType) {
		// ? renderContextMenu 之后，this 指向会改变，只能把 state 里的属性通过 DOM 元素的自定义属性传进来
		let parentId = clickedNode.getAttribute("cusid"); //当前点击元素自定义 id，新建节点的parentId
		let level = clickedNode.getAttribute("cuslevel") * 1 + 1; // 新建节点层级
		let name =
			this.state.newNodeName === "" ? "未命名" : this.state.newNodeName; //新建节点的名字
		await axios
			.post(`${Backend}/treenode/createnode`, {
				user: this.props.store.username,
				parentId,
				level,
				name,
				type: createType,
			})
			.then((res) => {
				if (res.isError) {
					throw res.data.error;
				}
				this.props.store.changeTree(
					JSON.parse(res.data.tree.currentTree)
				);
				this.state.newNodeName = ""; // 每次新建节点后要把节点名置空
			})
			.catch((err) => {
				console.error(err);
			});
	}

	async deleteNode(clickedNode) {
		if (!confirm("确定删除吗？其下子节点也会一并删除")) return false;
		// 发送当前点击节点 cusid 到后台，包括其下子节点一起删除
		let id = clickedNode.getAttribute("cusid");
		await axios
			.post(`${Backend}/treenode/deletenode`, {
				user: this.props.store.username,
				deleteId: id,
			})
			.then((res) => {
				if (res.data.isError) {
					throw res.data.error;
				}
				this.props.store.changeTree(
					JSON.parse(res.data.tree.currentTree)
				);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	//右键菜单重命名节点，将视图从显示节点名变为显示输入框
	renameNode(clickedNode) {
		this.props.store.treeRenameId = clickedNode.getAttribute("cusid");
	}

	//取消重命名
	cancelRename() {
		this.setState({
			name: this.state.copyName,
		});
		this.props.store.treeRenameId = "";
	}

	//保存重命名
	async saveRename() {
		await axios
			.post(`${Backend}/treenode/saverename`, {
				user: this.props.store.username,
				cusid: this.props.cusid,
				name: this.state.name,
			})
			.then((res) => {
				if (res.data.isError) {
					throw res.data.error;
				}
				this.props.store.treeRenameId = "";
				this.props.store.changeTree(
					JSON.parse(res.data.tree.currentTree)
				);
				this.setState({
					copyName: this.state.name,
				});
			})
			.catch((error) => {
				console.error(JSON.parse(error));
			});
	}

	renderContextMenu(e) {
		let clickedNode = e.target;
		return (
			<Menu className="rightMenu">
				<InputGroup
					placeholder="分区/小组"
					onChange={(e) =>
						this.setState({ newNodeName: e.target.value })
					}
					leftIcon="new-drawing"
				/>
				<Menu.Divider />
				<Menu.Item
					icon="new-text-box"
					onClick={() => this.createNode(clickedNode, "folder")}
					text="新建分区"
					disabled={
						e.target.getAttribute("custype") === "file"
							? true
							: false
					}
				/>
				<Menu.Item
					icon="folder-new"
					onClick={() => this.createNode(clickedNode, "file")}
					text="新建小组"
					disabled={
						e.target.getAttribute("custype") === "file"
							? true
							: false
					}
				/>
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
		return (
			<div>
				<div
					className={
						this.props.store.treeClickId === this.props.cusid &&
						this.props.type === "file"
							? "treeLineActive"
							: "treeLine"
					}
					style={{
						paddingLeft: this.props.level * 15 + "px",
						display: "flex",
						alignItems: "center",
					}}
					onClick={() => this.leftClickTreeLine()}
					custype={this.props.type}
					cusid={this.props.cusid}
					cuslevel={this.props.level}
				>
					<Icon
						icon={
							this.props.type === "folder"
								? this.state.isShow
									? "chevron-down"
									: "chevron-right"
								: "folder-open"
						}
						iconSize={12}
						color={Colors.GRAY2}
						style={{ marginRight: 10 + "px" }}
					></Icon>
					{this.props.store.treeRenameId === this.props.cusid ? (
						<ControlGroup fill vertical={false}>
							<InputGroup
								value={this.state.name}
								onChange={(e) =>
									this.setState({ name: e.target.value })
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
						this.state.name
					)}
				</div>
				<ul
					style={{
						height: this.state.isShow ? "auto" : 0 + "px",
						overflow: "hidden",
					}}
				>
					{this.props.type === "folder" &&
						this.props.child &&
						this.props.child.slice().map((i, k) => {
							return (
								<li key={i._id}>
									<TreeNode {...i} store={this.props.store} />
								</li>
							);
						})}
				</ul>
			</div>
		);
	}
}

export default TreeNode;
