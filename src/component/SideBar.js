import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import Tree from "../component/Tree";
import { Button } from "@blueprintjs/core";

@withRouter
@inject("store")
@observer
class SideBar extends Component {
	render() {
		// const DBReq = window.indexedDB.open("nodeTree");
		// try {
		// 	DBReq.onerror = function(event) {
		// 		throw "数据库打开错误";
		// 	};
		// 	DBReq.onsuccess = function(event) {
		// 		console.log(DBReq.result);
		// 	};
		// } catch (error) {
		// 	console.log(error.toString());
		// }
		return (
			<div className="sideBar">
				<div className="tree">
					<Tree />
				</div>
				<div className="toolBar">
					<Button icon="plus" minimal={true} />
					<Button icon="search" minimal={true} />
				</div>
			</div>
		);
	}
}

export default SideBar;
