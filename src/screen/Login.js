import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { FormGroup, InputGroup, Button } from "@blueprintjs/core";

import { Backend } from "../func&var/Variables";
import cusLocalStorage from "../store/cusLocalStorage";

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
		isPasswordRight: true,
		isPasswordConfirmed: true,
	};

	async username() {
		//用户名输入框 onBlur 事件，验证用户名是否被占用
		if (this.state.username.match(/^([a-zA-Z0-9_\u4e00-\u9fa5]{2,9})$/)) {
			await this.setState({ isNameRight: true });
			await axios
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
			await this.setState({
				isNameRight: false,
			});
		}
	}

	async password(e) {
		await this.setState({ password: e.target.value });
		if (
			this.state.password.match(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
			)
		) {
			await this.setState({ isPasswordRight: true });
			await this.setState({
				isPasswordConfirmed:
					this.state.password === this.state.confirmPassword
						? true
						: false,
			});
		} else {
			await this.setState({ isPasswordRight: false });
		}
	}

	async confirm(e) {
		await this.setState({ confirmPassword: e.target.value });
		this.state.password === this.state.confirmPassword
			? await this.setState({ isPasswordConfirmed: true })
			: await this.setState({ isPasswordConfirmed: false });
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
					this.props.store.token = res.data.token;
					this.props.store.username = this.state.username;
					cusLocalStorage.set({
						username: this.state.username,
						token: res.data.token,
					});
					this.props.history.push("/");
				})
				.catch((err) => {
					console.error(err);
					if (err === "用户名不存在" || err === "密码错误") {
						alert(err);
					}
				});
		} else {
			axios
				.post(`${Backend}/register`, {
					username: this.state.username,
					password: this.state.password,
				})
				.then((res) => {
					if (res.data.isError) {
						throw res.data.error;
					}
					alert("注册成功，即将跳转登录页面");
					this.props.history.push("/login");
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
						labelInfo={
							this.state.isPasswordRight
								? ""
								: "请输入正确格式的密码"
						}
					>
						<InputGroup
							type={this.state.showPassword ? "text" : "password"}
							placeholder="请输入密码"
							value={this.state.password}
							onChange={(e) => this.password(e)}
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
						labelInfo={
							this.state.isPasswordConfirmed
								? ""
								: "请确保两次密码相同"
						}
					>
						<InputGroup
							type={
								this.state.showConfirmPassword
									? "text"
									: "password"
							}
							placeholder="请再次输入密码"
							value={this.state.confirmPassword}
							onChange={(e) => this.confirm(e)}
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
						onClick={() => {
							if (
								!this.state.username.match(
									/^([a-zA-Z0-9_\u4e00-\u9fa5]{2,9})$/
								)
							) {
								this.setState({
									isNameRight: false,
								});
							} else if (
								!this.state.password.match(
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
								)
							) {
								this.setState({
									isPasswordRight: false,
								});
							} else {
								this.login(this.props.match.path);
							}
						}}
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
