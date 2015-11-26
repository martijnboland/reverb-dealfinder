export default store => next => action => {
  const {
    types,
    callApi,
    shouldCallApi = () => true,
    transformResult = (result) => { return result },
    payload = {}
  } = action;

  if (!types) {
    // Normal action: pass it on
    return next(action);
  }

  if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
    throw new Error('Expected an array of three string types.');
  }

  if (typeof callApi !== 'function') {
    throw new Error('Expected fetch to be a function.');
  }

  if (!shouldCallApi(store.getState())) {
    return Promise.resolve();
  }

  const [ requestType, successType, failureType ] = types;

  store.dispatch({ ...payload, type: requestType });

  return callApi()
    .then(response => { 
      if (response.status >= 200 && response.status < 300) {
        return response.json()      
      } 
      if (response.status >= 400) {
        throw new Error(response.text());
      }
    })
    .then(json => store.dispatch({ ...payload, data: transformResult(json), type: successType }))
    .catch(error => store.dispatch({ ...payload, error: error, type: failureType }));
}