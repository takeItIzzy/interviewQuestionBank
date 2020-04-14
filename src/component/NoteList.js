import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";

import NodeListItem from "./NoteListItem";
import ToolBar from "./ToolBar";

@withRouter
@inject("store")
@observer
class NoteList extends Component {
	render() {
		return (
			<div className="noteList">
				<div className={this.props.store.current_note_list.length === 0 ? "noNoteActive" : "noNote"} >
					<p>还没有笔记</p>
					<p>请新建笔记或选择其它小组</p>
				</div>
				<div className={this.props.store.current_note_list.length === 0 ? "noNote" : "noteListActive"} >
					{this.props.store.current_note_list.slice().map((item) => {
						return (
							<NodeListItem itemName={item.title} key={item._id} />
						);
					})}
				</div>
				<ToolBar>
					{() => {
						let noteObj = {
							nodeId: this.props.store.treeClickId,
						};
						return {
							placeholder: "新建笔记",
							addObj: noteObj,
							switchPath: "note",
						};
					}}
				</ToolBar>
			</div>
		);
	}
}

export default NoteList;
