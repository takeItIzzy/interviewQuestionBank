import { observable, action, trace, set, get, autorun } from "mobx";
import axios from "axios";
import { Backend } from "../func&var/Variables";

class AppState {
	@observable appname = "面试题库";
	@observable username = "zyx";
	@observable current_tree = []; //笔记树
	@observable current_note_list = [];
	@observable current_markdown = `# 说点啥呢

	## 我也不知道啊

	>随便整两句儿
	
	再来个普通文本
	
## 我也不知道啊

>随便整两句儿

再来个普通文本

## 我也不知道啊

>随便整两句儿

再来个普通文本

## 我也不知道啊

>随便整两句儿

再来个普通文本

## 我也不知道啊

>随便整两句儿

再来个普通文本

## 我也不知道啊

>随便整两句儿

再来个普通文本

## 我也不知道啊

>随便整两句儿

再来个普通文本

## 我也不知道啊

>随便整两句儿

再来个普通文本

## 我也不知道啊

>随便整两句儿

再来个普通文本

## 我也不知道啊

>随便整两句儿

再来个普通文本

## 我也不知道啊

>随便整两句儿

再来个普通文本

## 我也不知道啊

>随便整两句儿

再来个普通文本

## 我也不知道啊

>随便整两句儿

再来个普通文本

## 我也不知道啊

>随便整两句儿

再来个普通文本
`;
	@observable isEditing = false; //文章是否正在编辑
	@observable treeClickId = ""; //当前点击的树节点
	@observable treeRenameId = ""; //树节点是否正在重命名
	@observable createNode = ""; //树节点右键菜单点击新建显示分区名或者小组名
	@action async queryTree() {
		//向数据库查询当前用户的笔记树
		await axios
			.post(`${Backend}/nodeTree`, { user: this.username })
			.then((res) => {
				if (res.data.isError) {
					throw res.data.error;
				}
				this.current_tree = JSON.parse(res.data.tree.currentTree);
			})
			.catch((err) => {
				console.error(JSON.parse(err));
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
		await axios
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
}

export default new AppState();
