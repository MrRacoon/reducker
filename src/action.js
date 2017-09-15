

export const noop = type => () => ({ type });

export const payload = type => p => ({ type, payload: p });

export const error = type => e => ({ type, error: e });

export const thunk = (type, prom) => (...args) => (dispatch) => {
  dispatch(noop(type)());
  return prom(...args)
    .then(
      p => dispatch(payload(`${type}/SUCCESS`)(p)),
      e => dispatch(error(`${type}/FAILURE`)(e)),
    );
};
