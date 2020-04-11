// 将数据库查询的平铺结果递归生成树结构
export function DBResult2Tree(data) {
	// 删除 所有 children,以防止多次调用
	data.forEach(function (item) {
		delete item.child;
	});

	// 将数据存储为 以id为KEY的map索引数据列
	let map = {};
	data.forEach(function (item) {
		let itemId = item.id.toString();
		map[itemId] = item;
	});

	let val = [];
	data.forEach(function (item) {
		item.child=[];
		// 获得当前 node 的父 node
		var parent = map[item.parentId];
		// 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
		if (parent) {
			(parent.child || (parent.child = [])).push(item); //这里更改的是map对象的数据(索引数据)
		} else {
			//如果没有在map中找到对应的索引ID,那么直接把当前的item添加到 val结果集中，作为顶级
			val.push(item);
		}
	});

	return {
		currentTree: val, //树结构json数据 可以渲染html
		map, //索引数据 方便通过ID查找所有子节点ID
	};
}