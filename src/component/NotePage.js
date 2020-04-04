import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button } from "@blueprintjs/core";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

@withRouter
@inject("store")
@observer
class NotePage extends Component {
	state = {
		selectedTab: "write"
	};
	render() {
		return (
			<div className="notePage">
				<div className="toolBar">
					{this.props.store.isEditing ? (
						<div>
							<Button
								icon="arrow-left"
								onClick={() =>
									(this.props.store.isEditing = false)
								}
								minimal={true}
							/>

							<Button
								icon="floppy-disk"
								onClick={() =>
									(this.props.store.isEditing = false)
								}
								minimal={true}
							/>
						</div>
					) : (
						<Button
							icon="edit"
							minimal={true}
							onClick={() => (this.props.store.isEditing = true)}
						/>
					)}
					<Button icon="cross" minimal={true} />
				</div>
				<div className="contentBox">
					{this.props.store.isEditing ? (
						<ReactMde
							selectedTab={this.state.selectedTab}
							onTabChange={(tab) =>
								this.setState({ selectedTab: tab })
							}
							onChange={(md) =>
								(this.props.store.current_markdown = md)
							}
							l18n={{ write: "编辑", preview: "预览" }}
							minEditorHeight={"calc(100vh - 150px)"}
							value={this.props.store.current_markdown}
							generateMarkdownPreview={async (markdown) => {
								return <ReactMarkdown source={markdown} />;
							}}
						/>
					) : (
						<ReactMarkdown
							source={this.props.store.current_markdown}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default NotePage;