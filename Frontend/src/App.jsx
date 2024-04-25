import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

import Home from './components/homePage'
import LoginForm from './pages/loginForm'
import RegisterForm from './components/registerForm'
import Logout from './pages/logout';
import NotFound from './components/notFound'
import DashboardContainer from './components/dashboardContainer';
import * as config from '../config.json'





class App extends Component {
  
  state = {
    inputs: [
      { label: 'Name', name:'name', id:'name',type:'text'},
      {label: 'Password', name:'password', id:'password',type:'password'},
      { label: 'Email', name: 'email', id: 'email', type:'email'}
    ],
    users:[],
    books: [],
    errors: {},
    user: {}
    
  }

  componentDidMount(){
    try {
      const jwt = localStorage.getItem('token')
      const user = jwtDecode(jwt)
      this.setState({user})
    } catch (ex) {
      
    }
  }
  
  
  render() { 
    return (
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm errorss={this.state.errors } />} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/dashboard/*' element={<DashboardContainer user={this.state.user} />}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    );
  }
}

export default App;

{/* <Input name='test' label='Test' /> */}