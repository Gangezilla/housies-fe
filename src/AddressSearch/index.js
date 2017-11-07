import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './AddressSearch.css';
import enhance from './container';

class AddressSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    geocodeByAddress(this.state.address)
      .then(results => this.props.searchForHome(results[0]))
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
    );
  }
}

export default enhance(AddressSearch);
