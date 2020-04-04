import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import TreeNode from "./TreeNode";

@withRouter
@inject("store")
@observer
class Tree extends Component {
	state = {
		tree: JSON.parse(JSON.stringify(this.props.store.current_tree))
	};
	render() {
		return (
			<div>
				<ul>
					{this.state.tree.map((item, key) => {
						return (
							<li key={item.id} className="treeLi">
								<TreeNode
									{...item}
								/>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default Tree;
