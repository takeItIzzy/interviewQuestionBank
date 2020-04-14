import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";

import TreeNode from "../component/TreeNode";
import ToolBar from "./ToolBar";

@withRouter
@inject("store")
@observer
class SideBar extends Component {
	state = {
		inputVal: "",
	};

	componentDidMount() {
		this.props.store.queryTree();
	}

	render() {
		return (
			<div className="sideBar">
				<div className="tree">
					<ul>
						{this.props.store.current_tree.slice().map((item) => {
							return (
								<li key={item._id} className="treeLi">
									<TreeNode {...item} />
								</li>
							);
						})}
					</ul>
				</div>
				<ToolBar>
					{() => {
						let regionObj = {
							cusid:
								this.props.store.current_tree.length === 0
									? "1"
									: (
											this.props.store.current_tree[
												this.props.store.current_tree
													.length - 1
											].cusid *
												1 +
											1
									  ).toString(), //id 为当前笔记树的最后一个元素的 id+1，不用长度做id是避免删除某一节点以后id不连续，以长度为id可能导致id重复，而以最后一个元素id+1做id只要保证每个树节点按顺序排列就好了
							level: 1,
							parentId: null,
							type: "folder",
						};
						return {
							placeholder: "新建分区",
							addObj: regionObj,
							switchPath: "region"
						};
					}}
				</ToolBar>
			</div>
		);
	}
}

export default SideBar;
