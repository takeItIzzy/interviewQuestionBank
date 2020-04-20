import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { FormGroup, InputGroup, Button } from "@blueprintjs/core";

import { Backend } from "../func&var/Variables";

@withRouter
@inject("store")
@observer
export default class Login extends Component {
	state = {
		showPassword: false,
		showConfirmPassword: false,
		username: "",
		password: "",
		confirmPassword: "",
		isNameUsed: false,
		isNameRight: true,
	};

	username() {
		//用户名输入框 onBlur 事件，验证用户名是否被占用
		if (this.state.username.match(/^([a-zA-Z0-9_\u4e00-\u9fa5]{2,9})$/)) {
			this.setState({
				isNameRight: true,
			});
			axios
				.post(`${Backend}/register/isNameUsed`, {
					username: this.state.username,
				})
				.then((res) => {
					if (res.data.isError) {
						throw res.data.errror;
					}
					if (!res.data.isNameUsed) {
						this.setState({
							isNameUsed: false,
						});
					}
				})
				.catch((err) => {
					console.error(err);
					this.setState({
						isNameRight: false,
					});
				});
		} else {
			this.setState({
				isNameRight: false,
			});
		}
	}

	password() {
		//TODO 明天修改密码失焦验证和确认密码验证，写后端注册登录逻辑
		if (this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/)) {
			this.iconKey = { fill: "#4bc081" };
			this.ispassRight = true;
			if (this.password === this.confirm) {
				this.iconConfirm = { fill: "#4bc081" };
				this.isConfirmed = true;
			} else {
				this.iconConfirm = { fill: "#dc3030" };
				this.isConfirmed = false;
			}
		} else {
			this.iconKey = { fill: "#dc3030" };
			this.ispassRight = false;
		}
	}

	confirm() {
		if (this.password === this.confirm) {
			this.iconConfirm = { fill: "#4bc081" };
			this.isConfirmed = true;
		} else {
			this.iconConfirm = { fill: "#dc3030" };
			this.isConfirmed = false;
		}
	}

	login(path) {
		if (path === "/login") {
			axios
				.post(`${Backend}/login`, {
					username: this.state.username,
					password: this.state.password,
				})
				.then((res) => {
					if (res.data.isError) {
						throw res.data.error;
					}
					console.log(res.data);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}

	render() {
		return (
			<div className="loginBox">
				<div className="login">
					<h2 style={{ margin: "30px 0" }}>
						{this.props.match.path === "/login"
							? "请登录"
							: "请注册"}
					</h2>
					<FormGroup
						helperText="2-9位用户名，可包含中英文、数字、下划线"
						label="用户名："
						labelFor="text-input"
						labelInfo={
							this.state.isNameRight
								? this.state.isNameUsed
									? "用户名已被占用"
									: ""
								: "请输入正确格式的用户名"
						}
					>
						<InputGroup
							placeholder="请输入用户名"
							leftIcon="user"
							value={this.state.username}
							onChange={(e) =>
								this.setState({ username: e.target.value })
							}
							onBlur={() => this.username()}
						/>
					</FormGroup>
					<FormGroup
						helperText="8-16位密码，须包含 1 大写字母、1 小写字母、1 数字"
						label="密码："
						labelFor="password-input"
					>
						<InputGroup
							type={this.state.showPassword ? "text" : "password"}
							placeholder="请输入密码"
							value={this.state.password}
							onChange={(e) =>
								this.setState({ password: e.target.value })
							}
							leftIcon="key"
							rightElement={
								<Button
									icon={
										this.state.showPassword
											? "unlock"
											: "lock"
									}
									minimal={true}
									onClick={() =>
										this.setState({
											showPassword: !this.state
												.showPassword,
										})
									}
								/>
							}
						/>
					</FormGroup>
					<FormGroup
						className={
							this.props.match.path === "/register"
								? "show"
								: "hide"
						}
						label="确认密码："
						labelFor="password-input"
					>
						<InputGroup
							type={
								this.state.showConfirmPassword
									? "text"
									: "password"
							}
							placeholder="请再次输入密码"
							value={this.state.confirmPassword}
							onChange={(e) =>
								this.setState({
									confirmPassword: e.target.value,
								})
							}
							leftIcon="key"
							rightElement={
								<Button
									icon={
										this.state.showConfirmPassword
											? "unlock"
											: "lock"
									}
									minimal={true}
									onClick={() =>
										this.setState({
											showConfirmPassword: !this.state
												.showConfirmPassword,
										})
									}
								/>
							}
						/>
					</FormGroup>
					<Button
						rightIcon="arrow-right"
						intent="success"
						text={
							this.props.match.path === "/login"
								? "确认登录"
								: "确认注册"
						}
						style={{ margin: "20px 0" }}
						onClick={() => this.login(this.props.match.path)}
					/>

					{this.props.match.path === "/login" ? (
						<span>
							还没有账户？<Link to="/register">去注册</Link>
						</span>
					) : (
						<span>
							已有帐户？<Link to="/login">去登录</Link>
						</span>
					)}
				</div>
			</div>
		);
	}
}
