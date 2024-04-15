import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './components/homePage'
import LoginForm from './components/loginForm'
import RegisterForm from './components/registerForm'
import Dashboard from './components/dashboard'
import NotFound from './components/notFound'
import Input from './components/common/_input';
import Form from './components/common/_form';
import Books from './components/books';
import BookForm from './components/bookForm';





class App extends Component {
  
  state = {
    inputs: [
      { label: 'Name', name:'name', id:'name',type:'text'},
      {label: 'Password', name:'password', id:'password',type:'password'},
      { label: 'Email', name: 'email', id: 'email', type:'email'}
    ]
  }
  
  
  render() { 
    return (
      <>
        {/* <Form inputsNo={this.state.inputs} /> */}
        <Routes>
          <Route path='/' element={<Home />}>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/dashboard/:id'element={<Dashboard />}>
            <Route path='books' element={<Books/>} />
            <Route path='bookForm' element={<BookForm/>} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    );
  }
}

export default App;

{/* <Input name='test' label='Test' /> */}