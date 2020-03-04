import React, {Component} from 'react';
import UserService from '../services/users.sercice';

import {Redirect} from 'react-router-dom';


class Login extends Component{

    state = {
        email: "",
        password: "",
        isAuth:false
    }

    //recup les modif présente dans les champs
    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    //connexion avec email et password
    async submit(e){
        e.preventDefault();
        this.setState({success: false});
        let body = {
            email: this.state.email,
            password: this.state.password
        }; 
        let response = await UserService.auth(body);
        let data = await response.json();
        if( response.ok ){
            this.setState({
                success: true,
                isAuth: true,
                msgSuccess: "User is connected with successfull"
            })
            console.log(data.user._id)
            sessionStorage.setItem("idUser", data.user._id);
            sessionStorage.setItem("login", true);
            sessionStorage.setItem('isAuth', true);
            if(body.email === "admin" && body.password === "admin"){
                sessionStorage.setItem('user_role', 1);
            }
            this.setState({redirect: true});
        } else {
            this.setState({msgERROR: data.message});  
            sessionStorage.setItem("login", false);
        }
    }

    render(){
        if (this.state.isAuth === true) {
            return (<Redirect to={'/'}  refresh="true" />);
        }

        return (
            <div className="container">
                
                <form onSubmit={(e) => this.submit(e)}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" id="email" className="form-control" required onChange={(e) => this.handleChange(e)}/>
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" id="password" className="form-control" required onChange={(e) => this.handleChange(e)}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Connexion</button>
                </form>

                {
                    this.state.success === true ? <p>{this.state.msgSuccess}</p> : <p>{this.state.msgERROR}</p> 
                }
            <br /><br /><br /><br /><br /><br /><br />
            </div>
            
        )
    }


}

export default Login;