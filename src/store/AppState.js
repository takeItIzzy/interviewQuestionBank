import { observable } from "mobx";

class AppState {
	@observable appname = "面试题库";
	@observable current_tree = [
		{
			id: "1",
			level: 1,
			name: "HTML",
			parentId: null,
			child: [
				{
					id: "1_1",
					level: 2,
					name: "富媒体",
					parentId: "1",
					child: [],
				},
				{
					id: "1_2",
					level: 2,
					name: "元素和标签",
					parentId: "1",
					child: [],
				},
				{
					id: "1_3",
					level: 2,
					name: "表单及其组件",
					parentId: "1",
					child: [],
				},
			],
		},
		{
			id: "2",
			level: 1,
			name: "CSS",
			parentId: null,
			child: [
				{
					id: "2_1",
					level: 2,
					name: "伪类",
					parentId: "2",
					child: [],
				},
				{
					id: "2_2",
					level: 2,
					name: "选择器",
					parentId: "2",
					child: [],
				},
				{
					id: "2_3",
					level: 2,
					name: "弹性盒子",
					parentId: "2",
					child: [],
				},
				{
					id: "2_4",
					level: 2,
					name: "布局",
					parentId: "2",
					child: [],
				},
			],
		},
		{
			id: "3",
			level: 1,
			name: "JS",
			parentId: null,
			child: [
				{
					id: "3_1",
					level: 2,
					name: "函数",
					parentId: "3",
					child: [],
				},
				{
					id: "3_2",
					level: 2,
					name: "ES6",
					parentId: "3",
					child: [],
				},
				{
					id: "3_3",
					level: 2,
					name: "异步",
					parentId: "3",
					child: [],
				},
				{
					id: "3_4",
					level: 2,
					name: "语法",
					parentId: "3",
					child: [
						{
							id: "3_4_1",
							level: 3,
							name: "闭包",
							parentId: "3_4",
							child: [],
						},
						{
							id: "3_4_2",
							level: 3,
							name: "原型",
							parentId: "3_4",
							child: [],
						},
					],
				},
			],
		},
	];
	@observable current_note_list = [
		{
			name: "查询优化查询优化查询优化查询优化查询优化查询优化查询优化",
			relyon: "1_1",
			id: 13,
		},
		{ name: "MongoDB安装指南", relyon: "1_1", id: 14 },
		{
			name: "MongoDBMongoDBMongoDBMongoDBMongoDBMongoDB",
			relyon: "1_1",
			id: 15,
		},
		{ name: "MySQL查询优化", relyon: "1_1", id: 1 },
		{ name: "MongoDB安装指南", relyon: "1_1", id: 2 },
		{ name: "MySQL查询优化", relyon: "1_1", id: 3 },
		{ name: "MongoDB安装指南", relyon: "1_1", id: 4 },
		{ name: "MySQL查询优化", relyon: "1_1", id: 5 },
		{ name: "MongoDB安装指南", relyon: "1_1", id: 6 },
		{ name: "MySQL查询优化", relyon: "1_1", id: 7 },
		{ name: "MongoDB安装指南", relyon: "1_1", id: 8 },
		{ name: "MySQL查询优化", relyon: "1_1", id: 9 },
		{ name: "MongoDB安装指南", relyon: "1_1", id: 10 },
		{ name: "MySQL查询优化", relyon: "1_1", id: 11 },
		{ name: "MongoDB安装指南", relyon: "1_1", id: 12 },
	];
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
	@observable isEditing = false;
	@observable clickId = "";
}

export default new AppState();
