import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmitWThen(event){
        event.preventDefault();
        axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            }).then(
                result => {
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                    localStorage.setItem('access_token', result.data.access);
                    localStorage.setItem('refresh_token', result.data.refresh);
                }
            ).catch (error => {
                throw error;
            })
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            return response;
        } catch (error) {
            throw error;
        }
    }

    render() {
        return (
            <div class="loginblock">
                <div class="row">
                    <h2 class="autorization__name">Авторизація</h2>
                <div class="col">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input name="email" type="text" className="login" value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <label>
                        <input name="password" type="password" className="password" value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <button class="enter" type="submit">Увійти</button>
                     <div class="forgot_password">
                          <button class="btn">Забули пароль?</button>
                      </div>
                      </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default Login;