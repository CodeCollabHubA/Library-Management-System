import React, { Component } from 'react';
import auth from '../../services/authService';
import { toast } from 'react-toastify';
class Logout extends Component {
    
    componentDidMount() {
        auth.logout()
        window.location = '/' 
        
    }
    render() { 
        return null;
    }
}
 
export default Logout;