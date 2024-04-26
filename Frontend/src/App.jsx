import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'


import Home from './components/homePage'
import LoginForm from './pages/loginForm'
import RegisterForm from './components/registerForm'
import Logout from './pages/logout';
import NotFound from './components/notFound'
import DashboardContainer from './components/dashboardContainer';
import { ToastContainer } from 'react-toastify';

import auth from '../services/authService';






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
    const user= auth.getCurrentUser()
    this.setState({ user })
  }
  handleAdd = async (data) => {
    const {response:user} = await axios.post(config.apiUrl, data);
    const users = { ...this.state.users, user };
    this.setState({ users });
  }
  handleDelete = async (data) => {
    const originalData = { ...this.state.users };
    const users = this.state.users.filter(user => (user.id !== data.id));
    this.setState({ users });
    try {
      const { response: user } = await axios.delete(config.apiUrl + "/" + data.id);

    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert('user already deleted');
      this.setState({users: originalData });
    }
    
  }
  
  render() { 
    return (
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
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