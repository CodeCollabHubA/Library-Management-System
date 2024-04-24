import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './components/homePage'
import LoginForm from './pages/loginForm'
import RegisterForm from './components/registerForm'
import NotFound from './components/notFound'
import DashboardContainer from './components/dashboardContainer';
import axios from 'axios';
import * as config from '../config.json'





class App extends Component {
  
  state = {
    inputs: [
      { label: 'Name', name:'name', id:'name',type:'text'},
      {label: 'Password', name:'password', id:'password',type:'password'},
      { label: 'Email', name: 'email', id: 'email', type:'email'}
    ],
    users:[],
    books:[],
    
  }

  async componentDidMount(){
    const respose = await axios.get(`http://localhost:5053/api/User`);

    console.log(respose.data);
  }
  
  
  render() { 
    return (
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/dashboard/*' element={<DashboardContainer/>}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    );
  }
}

export default App;

{/* <Input name='test' label='Test' /> */}