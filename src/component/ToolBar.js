import React, { Component } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import { observer, inject } from "mobx-react";
import axios from "axios";
import { Backend } from "../func&var/Variables";

@inject("store")
@observer
class ToolBar extends Component {
	state = {
		inputVal: "",
	};

	async add(addObj, switchPath) {
		this.state.inputVal === "" &&
			(await this.setState({ inputVal: "未命名" }));

		if (switchPath === "region") {
			addObj.name = this.state.inputVal;
			await axios
				.post(`${Backend}/nodeTree/addregion`, {
					user: this.props.store.username,
					region: addObj,
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
					console.error(err.toString());
				});
		} else if (switchPath === "note") {
			if (addObj.nodeId === "") {
				alert("请选择一个小组");
				return false;
			}
			addObj.title = this.state.inputVal;
			await axios
				.post(`${Backend}/notelist/addnote`, {
					user: this.props.store.username,
					note: addObj,
				})
				.then((res) => {
					if (res.data.isError) {
						throw res.data.error;
                    }
					this.props.store.changeNoteList(
						JSON.parse(res.data.noteList)
					);
				})
				.catch((err) => {
					console.error(err.toString());
				});
		}
	}

	render() {
		return (
			<div className="toolBar toolBarAdd">
				<InputGroup
					placeholder={this.props.children().placeholder}
					value={this.state.inputVal}
					onChange={(e) =>
						this.setState({ inputVal: e.target.value })
					}
					rightElement={
						<Button
							icon="plus"
							minimal={true}
							onClick={() =>
								this.add(
									this.props.children().addObj,
									this.props.children().switchPath
								)
							}
						/>
					}
				/>
			</div>
		);
	}
}

export default ToolBar;
