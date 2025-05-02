import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from '../pages/Home'
import {Login} from '../pages/Login'
import {Register} from '../pages/Register'
import Product from '../pages/Product'
import SingleProduct from '../pages/SingleProduct'
const AllRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/product/:id' element={<SingleProduct/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/register' element={<Register/>}/>
    </Routes>
  )
}

export default AllRoute
