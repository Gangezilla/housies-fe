import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Header from '../Header/header';
import AddressSearch from '../AddressSearch';

const App = () => {
  return [
    <Header key="Header" />,
    <AddressSearch key="AddressSearch" />,
  ];
};

export default App;
