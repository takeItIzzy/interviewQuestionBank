import { observable, action, trace, set, get, autorun } from "mobx";
import axios from "axios";
import { Backend } from "../func&var/Variables";

import axiosWithToken from "../axiosWithToken";
import cusLocalStorage from "./cusLocalStorage";

class AppState {
	@observable appname = "面试题库";
	@observable viewType = 0; //0 说明笔记树、笔记列表、文章全部显示
	@observable username = cusLocalStorage.get("username");
	@observable token = cusLocalStorage.get("token");
	@observable current_tree = []; //笔记树
	@observable current_note_list = []; //笔记列表
	@observable current_markdown = ""; //当前显示的笔记内容
	@observable isEditing = false; //文章是否正在编辑
	@observable treeClickId = ""; //当前点击的树节点
	@observable treeRenameId = ""; //树节点是否正在重命名
	@observable noteClickId = ""; //当前点击的笔记节点
	@observable noteClickTitle = ""; //当前点击的笔记节点标题
	@observable noteRenameId = ""; //笔记列表是否正在重命名
	@observable createNode = ""; //树节点右键菜单点击新建显示分区名或者小组名
	@action async queryTree() {
		//向数据库查询当前用户的笔记树
		await new axiosWithToken(this.token)
			.post(`${Backend}/nodeTree`, { user: this.username })
			.then((res) => {
				if (res.data.isError) {
					throw { ...res.data };
				}
				this.current_tree = JSON.parse(res.data.tree.currentTree);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	@action changeTree(tree) {
		//树节点每次增删改之后后端返回最新树，改变当前树
		this.current_tree = tree;
	}

	@action changeNoteList(noteList) {
		//笔记列表每次增删改查返回最新列表，改变当前列表
		this.current_note_list = noteList;
	}

	@action async queryNoteList(node) {
		//查询当前树节点笔记列表
		await new axiosWithToken(this.token)
			.post(`${Backend}/noteList`, {
				user: this.username,
				node,
			})
			.then((res) => {
				if (res.data.isError) {
					throw res.data.error;
				}
				this.current_note_list = JSON.parse(res.data.noteList);
			})
			.catch((err) => {
				console.error(err.toString());
			});
	}

	@action async queryMD(id) {
		//查询当前笔记的 markdown
		await new axiosWithToken(this.token)
			.post(`${Backend}/notepage`, {
				user: this.username,
				_id: id,
			})
			.then((res) => {
				if (res.data.isError) {
					throw res.data.error;
				}
				if (JSON.parse(res.data.markdown) !== null) {
					this.current_markdown = JSON.parse(res.data.markdown);
				} else {
					this.current_markdown = "";
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	@action changeMD(markdown) {
		this.current_markdown = markdown;
	}
}

export default new AppState();
