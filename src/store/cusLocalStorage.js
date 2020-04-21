class cusLocalstorage {
	get(name) {
		return localStorage.getItem(name) ? localStorage.getItem(name) : "";
	}

	set(items) {
		for (const key in items) {
			if (items.hasOwnProperty(key)) {
				const name = items[key];
				localStorage.setItem(key, name);
			}
		}
	}

	remove(items) {
		for (let i = 0; i < items.length; i++) {
			const key = items[i];
			localStorage.removeItem(key);
		}
	}
}

export default new cusLocalstorage();
