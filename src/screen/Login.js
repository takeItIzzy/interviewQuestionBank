import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";

@withRouter
@inject("store")
@observer
export default class Login extends Component {
	render() {
        //TODO 明天写登录页面和后端登陆验证
		return (
			<div>

            </div>
		);
	}
}
