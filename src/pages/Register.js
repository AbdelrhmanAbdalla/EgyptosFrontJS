import React, {Component} from 'react';
import UserService from '../services/users.sercice';


class Register extends Component{

    state = {
        username: "",
        email: "",
        password: "",
        //user role a 0 = utilisateur normal
        user_role: 0
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    async submit(e){
        e.preventDefault();
        //submit les infos remplis dans les champs présents dans state
        let response = await UserService.create(this.state);
        if(response.ok){
            this.setState({
                success:true,
                msgSuccess: "Votre compte a bien été crée !"
            })
        }else{
            this.setState({
                success:false,
                msgERROR: "Une erreur est survenue veuillez réessayer"
            })
        }

    }

    render(){
        return (
           
            <div className="container">
            <form onSubmit={(e) => this.submit(e)}>

           <div className="form-group">
               <label>Username</label>
               <input type="text" id="username" className="form-control" required onChange={(e) => this.handleChange(e)}/>
           </div>

           <div className="form-group">
               <label>Email</label>
               <input type="text" id="email" className="form-control" required onChange={(e) => this.handleChange(e)}/>
           </div>
           
           <div className="form-group">
               <label>Password</label>
               <input type="password" id="password" className="form-control"  onChange={(e) => this.handleChange(e)}/>
           </div>
           
           <button type="submit" className="btn btn-primary" action="http://localhost:3000/">Inscription</button>
           </form>
           {
                this.state.success === true ? <p>{this.state.msgSuccess}</p> : <p>{this.state.msgERROR}</p>
            }
       </div>
           
            
        )
    }

}

export default Register;