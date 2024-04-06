import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './components/homePage'
import Login from './components/login'
import SignUp from './components/signUp';
import Dashboard from './components/dashboad'
import ApiTut from '../apiTut'
import FormTut from '../formTut';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    fristName: yup.string()
      .when('mode', {
        is: 'signUp',
        then:(schema)=>schema.required('must enter a first name')
      }),
    lastName: yup.string()
      .when('mode', {
        is: 'signUp',
        then:(schema)=>schema.required('must enter a last name')
      }),
    password: yup.string().min(8).required('must enter a passward'),
    email: yup.string().email('Please enter a valid email address').required('must enter an email address'),
    phone: yup.string().when('mode',
      {
        is: 'signUp',
        then: (schema) => schema.test('custom-pattern', 'Invalid phone format', (value) => {
      const customPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      return customPattern.test(value);
    }).required('must enter your phone number')}),
    adminId:yup.string()
  }).required();


const App = () => {
  const mode='signUp'
  const { register, handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      mode
    }
  })

  const onSubmit = (data) => {
    console.log(data)
    console.log('subkkk')
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login register={register} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} />} />
        <Route path='/signUp' element={<SignUp register={register} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/* <Route path='/' element={<ApiTut />} /> */}
        {/* <Route path='/' element={<FormTut />} /> */}
      </Routes>
    </>
  );
}

export default App;

