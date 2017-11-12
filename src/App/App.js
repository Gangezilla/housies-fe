import React from 'react';
import './App.css';
import Header from '../Header';
import AddressSearch from '../AddressSearch';
import ReviewModal from '../ReviewModal';
import Loader from '../Loader';
import Reviews from '../Reviews';
import Errors from '../Errors';
import { getInit } from '../util/helpers';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isShowingReviewModal: true, // SHOULD BE FALSE, only true for testing.
      currentHome: null,
      isShowingLoader: false,
      user: null,
      reviews: {
        reviewCount: 0,
        reviews: [],
      },
      errors: [],
      currentLocation: {
        latitude: null,
        longitude: null,
      },
    };
    this.showReviewModal = this.showReviewModal.bind(this);
    this.updateCurrentHome = this.updateCurrentHome.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.updateLoggedInUser = this.updateLoggedInUser.bind(this);
    this.updateCurrentReviews = this.updateCurrentReviews.bind(this);
    this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    this.createVisibleError = this.createVisibleError.bind(this);
    this.removeVisibleError = this.removeVisibleError.bind(this);
  }

  componentWillMount() {
    this.retrieveLoggedInUser();
  }

  componentDidMount() {
    this.getUsersCurrentLocation();
  }

  getUsersCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({ currentLocation });
      });
    }
  }

  retrieveLoggedInUser() {
    fetch('/auth/check/', getInit)
      .then(((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return null;
      }
      ))
      .then(user => this.updateLoggedInUser(user));
  }

  updateLoggedInUser(user) {
    this.setState({
      user,
    });
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

  updateCurrentReviews(reviews) {
    this.setState({
      reviews,
    });
  }

  checkIfLoggedIn() {
    if (this.state.user) {
      return true;
    } return false;
  }

  createVisibleError(error) {
    const errors = this.state.errors.slice(0);
    const index = errors.indexOf(error);
    if (index === -1) {
      errors.push(error);
      this.setState({ errors });
    }
  }

  removeVisibleError(error) {
    const errors = this.state.errors.slice(0);
    const index = errors.indexOf(error);
    if (index > -1) {
      errors.splice(index, 1);
      this.setState({ errors });
    }
  }

  render() {
    console.log('wubbalubbadubdub', this.state);
    return [
      <Header
        key="Header"
        user={this.state.user}
        updateLoggedInUser={this.updateLoggedInUser}
        showLoader={this.showLoader}
        removeVisibleError={this.removeVisibleError}
      />,
      this.state.isShowingLoader &&
      <Loader
        key="loader"
      />,
      this.state.errors.length > 0 &&
      <Errors
        key="Errors"
        errors={this.state.errors}
      />,
      <AddressSearch
        key="AddressSearch"
        showReviewModal={this.showReviewModal}
        updateCurrentHome={this.updateCurrentHome}
        currentHome={this.state.currentHome}
        updateCurrentReviews={this.updateCurrentReviews}
        currentLocation={this.state.currentLocation}
        showLoader={this.showLoader}
        checkIfLoggedIn={this.checkIfLoggedIn}
        createVisibleError={this.createVisibleError}
        removeVisibleError={this.removeVisibleError}
      />,
      this.state.isShowingReviewModal &&
      this.state.user &&
      <ReviewModal
        key="ReviewModal"
        currentHome={this.state.currentHome}
        showLoader={this.showLoader}
        createVisibleError={this.createVisibleError}
        removeVisibleError={this.removeVisibleError}
        checkIfLoggedIn={this.checkIfLoggedIn}
        showReviewModal={this.showReviewModal}
      />,
      this.state.reviews.reviews.length > 0 &&
      <Reviews
        key="Reviews"
        reviews={this.state.reviews}
        showReviewModal={this.showReviewModal}
      />,
    ];
  }
}

export default App;

// maybe you can even ping a google api or something and get a photo of the house, or just put it on a map. cool.
