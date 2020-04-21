import axios from "axios";

class axiosWithToken {
	constructor(token) {
		this.token = token;
	}
	async post(url, params) {
		params.token = this.token;
		const data = await axios.post(url, params);
		if (data.data && data.data.isError && data.data.errorCode === 10000) {
			alert("token 错误，请重新登录");
			window.location = "/login";
		}
		return data;
	}
}

export default axiosWithToken;
