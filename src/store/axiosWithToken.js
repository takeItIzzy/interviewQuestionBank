import axios from "axios";

class axiosWithToken {
	token = "";
	setToken(token) {
		this.token = token;
	}
	async post(url, params) {
		params.token = this.token;
		const data = await axios.post(url, params);
		if (data.data && data.data.isError && data.data.errorCode === 10000) {
			window.location = "/login";
		}
		return data;
	}
}

export default new axiosWithToken();
