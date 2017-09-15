

/**
 * Don't pass any information, just pass the type to the reducer.
 * @param  {String} type
 * @return {ActionCreator}
 */
export const noop = type => () => ({ type });

/**
 * Given a type, create a function that accepts a payload and passes that with
 * the given type.
 * @param  {String} type
 * @return {ActionCreator}
 */
export const payload = type => p => ({ type, payload: p });

/**
 * Given a type, return a function that will pass it's argument as an error.
 * @param  {String} type
 * @return {ActionCreator}
 */
export const error = type => e => ({ type, error: e });

/**
 * given a type and a promise creator, return an action creator that will accept
 * the arguments to the promise, and on resolve, return a action.payload
 * funciton. On reject return an action.error.
 * @param  {String} type
 * @param  {Promise} prom
 * @return {ActionCreator}
 */
export const thunk = (type, prom) => (...args) => (dispatch) => {
  dispatch(noop(type)());
  return prom(...args)
    .then(
      p => dispatch(payload(`${type}/SUCCESS`)(p)),
      e => dispatch(error(`${type}/FAILURE`)(e)),
    );
};
