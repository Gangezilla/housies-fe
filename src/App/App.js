import React from 'react';
import './App.css';
import Header from '../Header';
import AddressSearch from '../AddressSearch';
import ReviewModal from '../ReviewModal';
import Loader from '../Loader';
import Reviews from '../Reviews';
import { getInit } from '../util/helpers';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isShowingReviewModal: true, // SHOULD BE FALSE, only true for testing.
      numberOfReviewsForCurrentProperty: 0,
      currentHome: null,
      isShowingLoader: false,
      user: null,
      reviews: [],
      currentLocation: {
        latitude: null,
        longitude: null,
      },
    };
    this.showReviewModal = this.showReviewModal.bind(this);
    this.updateCurrentHome = this.updateCurrentHome.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.updateLoggedInUser = this.updateLoggedInUser.bind(this);
    this.updateCurrentReviews.bind(this);
  }

  componentWillMount() {
    this.checkIfUserIsLoggedIn();
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

  checkIfUserIsLoggedIn() {
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

  render() {
    return [
      <Header
        key="Header"
        user={this.state.user}
        updateLoggedInUser={this.updateLoggedInUser}
        showLoader={this.showLoader}
      />,
      this.state.isShowingLoader &&
      <Loader
        key="loader"
        isShowingLoader={this.state.isShowingLoader}
      />,
      <AddressSearch
        key="AddressSearch"
        showReviewModal={this.showReviewModal}
        updateCurrentHome={this.updateCurrentHome}
        currentHome={this.state.currentHome}
        user={this.state.user}
        updateCurrentReviews={this.updateCurrentReviews}
        currentLocation={this.state.currentLocation}
      />,
      this.state.isShowingReviewModal &&
      this.state.user &&
      <ReviewModal
        key="ReviewModal"
        currentHome={this.state.currentHome}
        showLoader={this.showLoader}
      />,
      this.state.reviews.length > 0 &&
      <Reviews
        key="Reviews"
        reviews={this.state.reviews}
      />,
    ];
  }
}

export default App;

// maybe you can even ping a google api or something and get a photo of the house, or just put it on a map. cool.
