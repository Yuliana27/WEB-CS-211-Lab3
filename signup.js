import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            first_name: "",
            last_name: "",
            password: "",
            password2: "",
            errors:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/user/create/', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            });
            return response;
        } catch (error) {
            console.log(error.stack);
            this.setState({
                errors:error.response.data
            });
        }
    }

    render() {
        return (
           <div className="registrationblock">
            <div classNme="row">
                <h2 className="registration__name">Реєстрація</h2>
                <div className="col">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input name="email" type="email" className="email" value={this.state.email} onChange={this.handleChange}/>
                        { this.state.errors.email ? this.state.errors.email : null}
                    </label>
                     <label>
                        <input name="first_name" type="text" className="login" value={this.state.username} onChange={this.handleChange}/>
                        { this.state.errors.username ? this.state.errors.username : null}
                    </label>
                    <label>
                        <input name="last_name" type="text" className="login" value={this.state.username} onChange={this.handleChange}/>
                        { this.state.errors.username ? this.state.errors.username : null}
                    </label>
                    <label>
                        <input name="password" type="password" className="password" value={this.state.password} onChange={this.handleChange}/>
                        { this.state.errors.password ? this.state.errors.password : null}
                    </label>
                    <label>
                        <input name="password2" type="password" className="password" value={this.state.password} onChange={this.handleChange}/>
                        { this.state.errors.password ? this.state.errors.password : null}
                    </label>
                    <Button class="enter" type="submit">Зареєструватися</Button>
                    </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup;
