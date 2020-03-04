import React, {Component} from 'react';
import UserService from '../services/users.sercice';
import {Redirect} from 'react-router-dom';


class AdminUsers extends Component {

       state = {
            users:[],
            username:"",
            email:"",
            user_role:""
        }

        componentWillMount() {
            if(sessionStorage.getItem("isAuth")) {
            } else {
                this.setState({redirect: true});
            }
        } 

        async componentDidMount(){
            // Get ALL USERS IN BDD
            let response = await UserService.list(); 
            if(response.ok){
                let data = await response.json();
                this.setState({users: data.users})
            }else{
                console.log(response.error);
            }
        }

        async delete(id){
            let response = await UserService.delete(id);
            let data="";
            if(response.ok){
                data = await response.json();
                this.setState({
                success:true,
                msgSuccess: "User deleted !"
                });
                this.componentDidMount();
            }else{
                this.setState({
                    msgERROR: data.message
                })
            };
        }

    render(){

        if (this.state.redirect) {
            return (<Redirect to={'/login'} />);
        }

        return (
            <div className="container">
            <h1>{this.state.title}</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <td>id</td>
                            <th>Username </th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                                {
                                    this.state.users.map((users) => {
                                        return(
                                            <tr className="hit">
                                            <td>{users._id}</td>
                                                <td>{users.username}</td>
                                                <td>{users.email}</td>
                                                <td>
                                                    <button  type="button" class="btn btn-danger" onClick={() => this.delete(users._id)}>Supprimer</button>
                                                </td>
                                                
                                            </tr> 
                                        )    
                                    })
                                }
                    </tbody>{
                                                     this.state.success === true ? <p class="correct">{this.state.msgSuccess}</p> : <p class="incorrect">{this.state.msgERROR}</p> 
                                                }
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                </table>
            </div>
            
        )
    }
}

export default AdminUsers;