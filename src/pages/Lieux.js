import React, {Component} from 'react';
import PlaceService from '../services/place.sercice';
import Card from 'react-bootstrap/Card';


class Lieux extends Component {

        state = {
            title:"Les plus beau endroits d'Egypte",
            places:[],
            place:"",
            image:"",
            description:"",
            users:[]
        }
        async componentDidMount(){
            // Get ALL PLACES IN BDD
            let response = await PlaceService.list(); 

            if(response.ok){
                let data = await response.json();
                console.log(data)
                this.setState({places: data.places})
                
            }else{
                console.log(response.error);
            }
        }

        componentWillMount() {
            if(sessionStorage.getItem("isAuth")) {
            } else {
                this.setState({redirect: true});
            }
        } 

        render(){
            return (
                
                <div class="container">
                <h1>{this.state.title}</h1>
                <div class="row" align="center">
                {
                    this.state.places.map((places) => {
                    return(
                            <div class="col-sm-6" >
                                <Card style={{ width: '18rem' }}>
                                <Card.Img class="img-fluid" alt="" variant="top" src={places.image} />
                                <Card.Body>
                                    <Card.Title>{places.place}</Card.Title>
                                    <Card.Text>
                                    Description : {places.description}
                                    </Card.Text>
                                    <Card.Text>
                                     Ajouté par : {places.userId.username}
                                    </Card.Text>
                                </Card.Body>
                                </Card>
                            </div>
                            
                            ) 
                        })            
                }
                </div>
                <br /><br />
                </div>

             )
        }
}

export default Lieux;