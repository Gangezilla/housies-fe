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

// need to get this attached to the back end somehow.
// search by address id, if nothing is there then return that nothing is there and invite someone to make a new review.
// maybe you can even ping a google api or something and get a photo of the house, or just put it on a map. cool.
