import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './AddressSearch.css';
import { postInit } from '../util/helpers';
import Button from '../Common/Button';

const Container = styled.div`
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.16);
  flex-direction: column;
`;

const Form = styled.form`
  width: 90%;
  max-width: 800px;
  display: flex;
`;

const SubmitButton = styled.button`
  padding: 16px;
  border-radius: 0 2px 2px 0;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
  outline: none;
  box-sizing: border-box;
  border: honeydew;
  height: 51px;
  background: white;
  color: #7ab8e3;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: white;
    background: #7ab8e3;
    border: #7ab8e3;
  }
`;

class AddressSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      geocodeResults: null,
      isShowingAlertBox: true, // should be false!
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
        .catch(err => this.createVisibleError('Sorry, something went wrong. Can you try again?', err));
    } else {
      this.props.createVisibleError(addressError);
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    geocodeByAddress(this.state.address)
      .then(results => this.searchForHome(results[0]))
      .catch(err => this.createVisibleError('Sorry, something went wrong. Can you try again?', err));
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
      .catch(error => this.props.createVisibleError('Sorry, something went wrong. Can you try again?', error));
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

    const AlertBoxContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px 0;
    `;

    const ButtonContainer = styled.div`
      display: flex;
      width: 100%;
      justify-content: space-around;
      margin-top: 15px;
    `;

    const AlertSpan = styled.span`
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
    `;

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="AddressSearch__suggestion-item">
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>);

    const AlertBox = () => (
      <AlertBoxContainer>
        <AlertSpan> We don‘t have any reviews for that home yet. Would you like to write our first? </AlertSpan>
        <ButtonContainer>
          <Button onClick={() => this.handleAlertAction(true)}>
          Sure
          </Button>
          <Button onClick={() => this.handleAlertAction(false)}>
          No thanks.
          </Button>
        </ButtonContainer>
      </AlertBoxContainer>
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
      <Container>
        <Form onSubmit={this.handleFormSubmit}>
          <PlacesAutocomplete
            options={options}
            inputProps={inputProps}
            classNames={cssClasses}
            onEnterKeyDown={this.handleSelect}
            onSelect={this.handleSelect}
            autocompleteItem={AutocompleteItem}
          />
          <SubmitButton type="submit">Search</SubmitButton>
        </Form>
        {this.state.isShowingAlertBox && AlertBox()}
      </Container>
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
