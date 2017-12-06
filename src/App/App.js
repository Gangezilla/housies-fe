import React from 'react';
import Header from '../Header';
import AddressSearch from '../AddressSearch';
import ReviewModal from '../ReviewModal';
import Loader from '../Loader';
import Reviews from '../Reviews';
import Errors from '../Errors';
import Footer from '../Footer';
import { getInit } from '../util/helpers';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isShowingReviewModal: false,
      currentHome: null,
      isShowingLoader: false,
      user: null,
      reviews: {
        reviewCount: 1, // 0
        reviews: [{ // []
          reviewId: 1234,
          homeId: 'test',
          title: 'This is a short title.',
          description: 'This is a long description. This is a long description. This is a long description. This is a long description. This is a long description. This is a long description. This is a long description. This is a long description. This is a long description. This is a long description. This is a long description. ',
          rating: 3,
          tips: 'These are some useful tips. These are some useful tips. These are some useful tips. These are some useful tips. These are some useful tips. These are some useful tips. These are some useful tips. These are some useful tips. These are some useful tips. These are some useful tips. These are some useful tips. These are some useful tips. These are some useful tips. These are some useful tips. ',
          firstName: 'Scott',
          lastName: 'Gangemi',
          profilePic: 'http://placehold.it/100x100',
        }],
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
    // this.cleanUpErrors();
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

  // cleanUpErrors() {
  //   setTimeout(() => {
  //     // if (!self.isMounted()) { return; } // abandon 
  //     // self.poll(); // do it once and then start it up ...
  //     // self._timer = setInterval(self.poll.bind(self), 15000);
  //     const timestamp = Math.round((new Date()).getTime() / 1000);
  //   }, 1000);
  // }

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
    const index = errors.map((existingError) => {
      return existingError.description;
    }).indexOf(error);
    if (index === -1) {
      const errorWithTime = Object.assign({}, {
        description: error,
        timestamp: Math.floor(Date.now() / 1000),
      });
      errors.push(errorWithTime);
      this.setState({ errors });
    }
  }

  removeVisibleError(error) {
    const errors = this.state.errors.slice(0);
    console.log(errors);
    const index = errors.map((existingError) => {
      return existingError.description;
    }).indexOf(error.description);
    if (index.length === 0) {
      errors.splice(index, 1);
      this.setState({ errors });
    }
  }

  render() {
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
      <Footer
        key="Footer"
      />,
    ];
  }
}

export default App;
