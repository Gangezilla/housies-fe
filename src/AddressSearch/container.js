import { getLatLng } from 'react-places-autocomplete';
import { compose, withHandlers } from 'recompose';
import { postInit } from '../util/helpers';

const handleHomeResponse = (home) => {
  console.log(home);
  if (home.reviewCount === 0) {
    console.log('no reviews, please make one');
  } else {
    console.log(home.reviews);
  }
};

const enhance = compose(
  withHandlers({
    searchForHome: props => async (result) => {
      console.log('lol', result);
      const latLng = await getLatLng(result);

      const home = {
        displayAddress: result.formatted_address,
        id: result.place_id,
        addressComponent: result.address_components,
        latLng,
      };

      if (result.types.indexOf('street_address') > -1) {
        const headers = postInit(JSON.stringify(home));
        fetch('/home/search', headers)
          // .then(res => console.log(res.json()));
          .then(homeResponse => handleHomeResponse(homeResponse));
        // .catch(err => handleError(err));
      } else {
        console.log('plz try an address');
      }
    },
  }),
);

export default enhance;
