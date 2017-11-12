import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './AddressSearch.css';
import { postInit } from '../util/helpers';

class AddressSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      geocodeResults: null,
      isShowingAlertBox: false,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleReviewResponse(reviews) {
    this.props.updateCurrentReviews(reviews);
    if (reviews.reviewCount === 0) {
      this.setState({ isShowingAlertBox: true });
    } else {
      this.props.updateCurrentReviews(reviews);
    }
  }

  handleError(err) {
    console.error('error', err);
    console.log('state', this.state);
  }

  async searchForHome(result) {
    const addressError = 'Please try an address, not a country or anything like that';
    const latLng = await getLatLng(result);
    const home = {
      displayAddress: result.formatted_address,
      id: result.place_id,
      addressComponent: result.address_components,
      latLng,
    };
    if (result.types.indexOf('street_address') > -1) {
      this.props.removeVisibleError(addressError);
      this.props.showLoader(true);
      const headers = postInit(JSON.stringify(home));
      this.props.updateCurrentHome(home);
      fetch('/home/search', headers)
        .then(res => res.json())
        .then(reviewResponse => this.handleReviewResponse(reviewResponse))
        .then(() => this.props.showLoader(false))
        .catch(err => this.handleError(err));
    } else {
      this.props.createVisibleError(addressError);
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    geocodeByAddress(this.state.address)
      .then(results => this.searchForHome(results[0]))
      .catch(error => console.error('Error', error));
  }

  handleSelect(address) {
    this.setState({
      address,
    });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
          geocodeResults: { lat, lng },
          loading: false,
        });
      })
      .catch(error => this.handleError(error));
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null,
    });
  }

  // THIS IS GROSS, REFACTOR IT.
  handleAlertAction(choice) {
    const fbError = 'Please log in with Facebook first.';
    if (choice === true) {
      if (this.props.checkIfLoggedIn()) {
        this.props.showReviewModal(choice);
        this.props.removeVisibleError(fbError);
        this.setState({ isShowingAlertBox: false });
      } else {
        this.props.createVisibleError(fbError);
      }
    } else {
      this.setState({ isShowingAlertBox: false });
    }
  }
  // THIS IS GROSS, REFACTOR IT. ^^^

  render() {
    const cssClasses = {
      root: 'form-group',
      input: 'AddressSearch__search-input',
      autocompleteContainer: 'AddressSearch__autocomplete-container',
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="AddressSearch__suggestion-item">
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>);

    const AlertBox = () => (
      <div className="alert-box">
        <span> We don‘t have any reviews for that home yet. Would you like to write our first? </span>
        <button onClick={() => this.handleAlertAction(true)}>
          Sure
        </button>
        <button onClick={() => this.handleAlertAction(false)}>
          No thanks.
        </button>
      </div>
    );

    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => {},
      onFocus: () => {},
      autoFocus: true,
      placeholder: 'Search Places',
      name: 'Housies__input',
      id: 'AddressSearch-id',
    };

    const options = {
      location: new google.maps.LatLng(this.props.currentLocation.latitude, this.props.currentLocation.longitude), // eslint-disable-line
      radius: 2000,
      types: ['address'],
    };

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <PlacesAutocomplete
            options={options}
            inputProps={inputProps}
            classNames={cssClasses}
            onEnterKeyDown={this.handleSelect}
            onSelect={this.handleSelect}
            autocompleteItem={AutocompleteItem}
          />
          <button type="submit">Submit</button>
        </form>
        {this.state.isShowingAlertBox && AlertBox()}
      </div>
    );
  }
}

AddressSearch.propTypes = {
  showReviewModal: PropTypes.func.isRequired,
  updateCurrentHome: PropTypes.func.isRequired,
  updateCurrentReviews: PropTypes.func.isRequired,
  currentLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  showLoader: PropTypes.func.isRequired,
  checkIfLoggedIn: PropTypes.func.isRequired,
  createVisibleError: PropTypes.func.isRequired,
  removeVisibleError: PropTypes.func.isRequired,
};

AddressSearch.defaultProps = {
  user: null,
  currentLocation: null,
};

export default AddressSearch;
