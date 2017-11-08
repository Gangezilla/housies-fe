import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './AddressSearch.css';
import { postInit } from '../util/helpers';

class AddressSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false,
      isShowingAlertBox: false,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleHomeResponse(home) {
    this.props.updateCurrentHome(home);
    console.log(home);
    if (home.reviewCount === 0) {
      this.setState({ isShowingAlertBox: true });
    } else {
      console.log(home.reviews);
    }
  }

  async searchForHome(result) {
    const latLng = await getLatLng(result);
    const home = {
      displayAddress: result.formatted_address,
      id: result.place_id,
      addressComponent: result.address_components,
      latLng,
    };
    if (result.types.indexOf('street_address') > -1) {
      const headers = postInit(JSON.stringify(home));
      const testHome = {
        reviewCount: 0,
      };
      this.handleHomeResponse(testHome);
      // fetch('/home/search', headers)
      //   .then(res => res.json())
      //   .then(homeResponse => this.handleHomeResponse(homeResponse));
      // .catch(err => handleError(err));
    } else {
      console.log('plz try an address');
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
      loading: true,
    });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
          geocodeResults: { lat, lng },
          loading: false,
        });
      })
      .catch((error) => {
        // error => handleError(error);
      });
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null,
    });
  }

  handleAlertAction(choice) {
    this.props.showReviewModal(choice);
    this.setState({ isShowingAlertBox: false });
  }

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

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <PlacesAutocomplete
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

export default AddressSearch;
