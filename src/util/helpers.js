export const getInit = ({
  headers: new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
  method: 'GET',
  credentials: 'include',
});

export const postInit = body => ({
  headers: new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
  method: 'POST',
  credentials: 'include',
  body,
});
