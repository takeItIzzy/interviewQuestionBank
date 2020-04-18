import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button } from "@blueprintjs/core";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import { Backend } from "../func&var/Variables";

@withRouter
@inject("store")
@observer
class NotePage extends Component {
	state = {
		selectedTab: "write",
	};

	async saveMD() {
		await axios
			.post(`${Backend}/notepage/savemd`, {
				user: this.props.store.username,
				noteId: this.props.store.noteClickId,
				content: this.props.store.current_markdown,
			})
			.then((res) => {
				if (res.data.isError) {
					throw res.data.error;
				}
				this.props.store.isEditing = false;
				this.props.store.changeMD(JSON.parse(res.data.markdown));
			})
			.catch((err) => {
				console.error(err);
			});
	}

	componentDidMount() {
		document.addEventListener("keydown", (e) => {
			if (this.props.store.noteClickId === "") return false;

			//当前被点击节点所在的对象
			let clickNoteObj = this.props.store.current_note_list.filter(
				(item) => item._id === this.props.store.noteClickId
			)[0];
			//当前被点击节点在列表中的位置
			let clickNoteIndex = this.props.store.current_note_list.indexOf(
				clickNoteObj
			);

			if (e.keyCode === 37) {
				// 左翻
				if (clickNoteIndex > 0) {
					this.props.store.noteClickId = this.props.store.current_note_list[
						clickNoteIndex - 1
					]._id; //改变点击节点id
					this.props.store.noteClickTitle = this.props.store.current_note_list[
						clickNoteIndex - 1
					].title; //改变点击节点标题
					this.props.store.queryMD(this.props.store.noteClickId); //重新请求文章
				} else {
					alert("已是第一篇笔记");
				}
			} else if (e.keyCode === 39) {
				//右翻
				if (
					clickNoteIndex + 1 ===
					this.props.store.current_note_list.length
				) {
					alert("已是最后一篇笔记");
				} else {
					this.props.store.noteClickId = this.props.store.current_note_list[
						clickNoteIndex + 1
					]._id;
					this.props.store.noteClickTitle = this.props.store.current_note_list[
						clickNoteIndex + 1
					].title;
					this.props.store.queryMD(this.props.store.noteClickId);
				}
			}
		});
	}

	render() {
		//TODO 明天写保存笔记和左右翻页功能
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
								onClick={() => this.saveMD()}
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
				</div>
				<h1 style={{ padding: "20px", margin: "0 auto" }}>
					{this.props.store.noteClickTitle}
				</h1>
				<div className="contentBox">
					{(() => {
						if (this.props.store.noteClickId === "") {
							return (
								<h2 style={{ color: "#cccccc" }}>
									请选择一道题目
								</h2>
							);
						} else if (
							(this.props.store.current_markdown === "") &
							!this.props.store.isEditing
						) {
							return (
								<h2 style={{ color: "#cccccc" }}>
									当前题目还没有答案
								</h2>
							);
						} else {
							return this.props.store.isEditing ? (
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
									generateMarkdownPreview={async (
										markdown
									) => {
										return (
											<ReactMarkdown source={markdown} />
										);
									}}
								/>
							) : (
								<ReactMarkdown
									source={this.props.store.current_markdown}
								/>
							);
						}
					})()}
				</div>
			</div>
		);
	}
}

export default NotePage;
