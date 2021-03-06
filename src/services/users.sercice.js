const baseUrl = "http://localhost:3005";

class UserService{

    static async auth(body){
        let init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        let call = await fetch(`${baseUrl}/users/authenticate`, init);
        return call;
    }

    static async create(body){
        let init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        let call = await fetch(`${baseUrl}/users`, init);
        return call;
    }

    static async list(body){
        let init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        let call = await fetch(`${baseUrl}/users`, init);
        return call;
    }

    static async delete(id){
        let init={
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }
        let call = await fetch(`${baseUrl}/users/${id}`,init);
        return call;
    }

    static async details(id){
        let init={
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        };
        let call = await fetch(`${baseUrl}/users/${id}`,init);
        return call;
    }


}

export default UserService;