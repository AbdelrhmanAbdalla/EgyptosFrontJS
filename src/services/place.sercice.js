const baseUrl = "http://localhost:3005";

class PlaceService{

    static async create(body){
        let init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        let call = await fetch(`${baseUrl}/places`, init);
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
        let call = await fetch(`${baseUrl}/places`, init);
        return call;    
    }

    static async delete(id){
        let init = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        let call = await fetch(`${baseUrl}/places/${id}`, init);
        return call;
    }

    static async update(id,body){
        let init={
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            }, 
            body:JSON.stringify(body)
        }
        let call = await fetch(`${baseUrl}/places/${id}`,init);
        return call;
    }

    static async details(id){
        let init={
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        };
        let call = await fetch(`${baseUrl}/places/${id}`,init);
        return call;
    }

}

export default PlaceService;