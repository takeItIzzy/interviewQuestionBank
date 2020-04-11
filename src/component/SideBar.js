import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import TreeNode from "../component/TreeNode";
import { Button, InputGroup } from "@blueprintjs/core";

import { Backend } from "../func&var/Variables";

@withRouter
@inject("store")
@observer
class SideBar extends Component {
	state = {
		inputVal: "",
	};

	async addRegion() {
		this.state.inputVal === "" && this.setState({ inputVal: "未命名" });
		let regionObj = {
			cusid:
				this.props.store.current_tree.length === 0
					? "1"
					: (
							this.props.store.current_tree[
								this.props.store.current_tree.length - 1
							].cusid *
								1 +
							1
					  ).toString(), //id 为当前笔记树的最后一个元素的 id+1，不用长度做id是避免删除某一节点以后id不连续，以长度为id可能导致id重复，而以最后一个元素id+1做id只要保证每个树节点按顺序排列就好了
			level: 1,
			name: this.state.inputVal === "" ? "未命名" : this.state.inputVal,
			parentId: null,
			type: "folder",
		};
		await axios
			.post(`${Backend}/nodeTree/addregion`, {
				user: this.props.store.username,
				region: regionObj,
			})
			.then((res) => {
				if (res.data.isError) {
					throw res.data.error;
				}
				this.props.store.changeTree(res.data.tree.currentTree);
			})
			.catch((err) => {
				console.error(err.toString());
			});
	}

	componentDidMount() {
		this.props.store.queryTree();
	}

	render() {
		return (
			<div className="sideBar">
				<div className="tree">
					<ul>
						// TODO 对节点进行修改会触发 sideBar 的 rerender，但是视图不更新，不知道原因，可能是因为这里 map 返回了新数组而不是直接操作 mobx 全局属性？明天再看吧
						{this.props.store.current_tree.map((item) => {
							return (
								<li key={item.cusid} className="treeLi">
									<TreeNode {...item} />
								</li>
							);
						})}
					</ul>
				</div>
				<div className="toolBar">
					<Button
						icon="plus"
						minimal={true}
						onClick={() => this.addRegion()}
					/>
					<InputGroup
						placeholder="新建分区 || 搜索小组"
						value={this.state.inputVal}
						onChange={(e) =>
							this.setState({ inputVal: e.target.value })
						}
					/>
					<Button icon="search" minimal={true} />
				</div>
			</div>
		);
	}
}

export default SideBar;
