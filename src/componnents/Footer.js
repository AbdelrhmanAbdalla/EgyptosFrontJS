import React, {Component} from 'react';
import { render } from 'react-dom';

class Footer extends Component{  
   
  render(){
        return (

          <footer > 
            <div class="copyright text-center">
              Copyright &copy; 2020 <span>Egyptos</span>
              <br />
              Designed by Abdelrhman Abdalla
            </div>
        </footer>
     
      )
    }

}

export default Footer;