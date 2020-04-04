import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Icon, Colors } from "@blueprintjs/core";
import { FLEX_EXPANDER } from "@blueprintjs/core/lib/esm/common/classes";

@withRouter
@inject("store")
@observer
class TreeNode extends Component {
	state = {
		id: this.props.id,
		name: this.props.name,
		level: this.props.level,
		child: this.props.child,
		isShow: true
	};

	leftClickTreeLine() {
		this.setState((prev, next) => ({
			isShow: !this.state.isShow,
		}));
	}

	render() {
		return (
			<div>
				<p
					className="treeLine"
					style={{
						paddingLeft: this.state.level * 15 + "px",
						display: "flex",
						alignItems: "center"
					}}
					onClick={() => this.leftClickTreeLine()}
				>
					<Icon
						icon={
							this.state.child.length > 0
								? this.state.isShow
									? "chevron-down"
									: "chevron-right"
								: "folder-open"
						}
						iconSize={12}
						color={Colors.GRAY2}
						style={{ marginRight: 10 + "px" }}
					></Icon>
					{this.state.name}
				</p>
				<ul
					style={{
						height: this.state.isShow ? "auto" : 0 + "px",
						overflow: "hidden",
					}}
				>
					{this.state.child.length > 0 &&
						this.state.child.map((i, k) => {
							return (
								<li key={i.id}>
									<TreeNode {...i}/>
								</li>
							);
						})}
				</ul>
			</div>
		);
	}
}

export default TreeNode;
