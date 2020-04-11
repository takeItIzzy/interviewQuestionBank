import { observable, action } from "mobx";
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
	@observable treeClickId = ""; //树节点点击变色，其它节点恢复颜色
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
				console.error(err.toString());
			});
	}
	@action changeTree(tree) {
		this.current_tree = JSON.parse(tree)
	}
}

export default new AppState();
