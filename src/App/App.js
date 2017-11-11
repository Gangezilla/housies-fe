import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Header from '../Header/header';
import AddressSearch from '../AddressSearch';
import ReviewModal from '../ReviewModal';
import Loader from '../Loader';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isShowingReviewModal: true, // SHOULD BE FALSE, only true for testing.
      numberOfReviewsForCurrentProperty: 0,
      currentHome: null,
      isShowingLoader: false,
    };
    this.showReviewModal = this.showReviewModal.bind(this);
    this.updateCurrentHome = this.updateCurrentHome.bind(this);
    this.showLoader = this.showLoader.bind(this);
  }

  showLoader(shouldShow) {
    this.setState({
      isShowingLoader: shouldShow,
    });
  }

  showReviewModal(shouldShow) {
    this.setState({
      isShowingReviewModal: shouldShow,
    });
  }

  updateCurrentHome(home) {
    this.setState({ currentHome: home });
  }

  render() {
    return [
      <Header key="Header" />,
      this.state.isShowingLoader && <Loader key="loader" isShowingLoader={this.state.isShowingLoader} />,
      <AddressSearch
        key="AddressSearch"
        showReviewModal={this.showReviewModal}
        updateCurrentHome={this.updateCurrentHome}
        currentHome={this.state.currentHome}
      />,
      this.state.isShowingReviewModal &&
      <ReviewModal
        key="ReviewModal"
        currentHome={this.state.currentHome}
        showLoader={this.showLoader}
      />,
    ];
  }
}

export default App;

// need to get this attached to the back end somehow.
// search by address id, if nothing is there then return that nothing is there and invite someone to make a new review.
// maybe you can even ping a google api or something and get a photo of the house, or just put it on a map. cool.
