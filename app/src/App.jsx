import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import UsersHome from "./components/users/Home";
import UsersCreate from "./components/users/Create";
import UsersUpdate from "./components/users/Update";
import UsersRead from "./components/users/Read";

import TelephonesHome from "./components/telephones/Home";
import TelephonesCreate from "./components/telephones/Create";
import TelephonesUpdate from "./components/telephones/Update";
import TelephonesRead from "./components/telephones/Read";

import PaymentsHome from "./components/payments/Home";
import PaymentsCreate from "./components/payments/Create";
import PaymentsUpdate from "./components/payments/Update";
import PaymentsRead from "./components/payments/Read";

import AddressesHome from "./components/addresses/Home";
import AddressesCreate from "./components/addresses/Create";
import AddressesUpdate from "./components/addresses/Update";
import AddressesRead from "./components/addresses/Read";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/users/" element={<UsersHome />}></Route>
        <Route path="/users/create" element={<UsersCreate />}></Route>
        <Route path="/users/update/:id" element={<UsersUpdate />}></Route>
        <Route path="/users/read/:id" element={<UsersRead />}></Route>

        <Route path="/payments/" element={<PaymentsHome />}></Route>
        <Route path="/payments/create" element={<PaymentsCreate />}></Route>
        <Route path="/payments/update/:id" element={<PaymentsUpdate />}></Route>
        <Route path="/payments/read/:id" element={<PaymentsRead />}></Route>

        <Route path="/addresses/" element={<AddressesHome />}></Route>
        <Route path="/addresses/create" element={<AddressesCreate />}></Route>
        <Route path="/addresses/update/:id" element={<AddressesUpdate />}></Route>
        <Route path="/addresses/read/:id" element={<AddressesRead />}></Route>

        <Route path="/telephones/" element={<TelephonesHome />}></Route>
        <Route path="/telephones/create" element={<TelephonesCreate />}></Route>
        <Route path="/telephones/update/:id" element={<TelephonesUpdate />}></Route>
        <Route path="/telephones/read/:id" element={<TelephonesRead />}></Route>

        <Route path='*' element={<h1>404 Not Found</h1>}></Route>

      </Routes>

    </BrowserRouter>

  )
}

export default App
