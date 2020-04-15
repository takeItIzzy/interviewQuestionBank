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
		selectedTab: "write",
	};
	render() {
		//TODO 明天开始实现笔记功能，notelist 呈现具体面试题目，notepage 展示题目和答案，监听左右键切换 note list 条目
		return (
			<div className="notePage">
				<div className="toolBar toolBarArticle">
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
