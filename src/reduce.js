
/**
 * Given a state and an action, merge the action's payload into the state.
 * @param  {State} state
 * @param  {Action} action
 * @return {Reduction}
 */
export const merge = (state, action) =>
  Object.assign(state, action.payload);

/**
 * given a prop, set the action's payload prop at state.prop
 * @param  {String} prop
 * @return {Reduction}
 */
export const overwrite = prop => (state, action) =>
  Object.assign(state, { [prop]: action.payload });

/**
 * Given a prop, set the async start flag to true
 * @param  {String} prop
 * @return {Reduction}
 */
export const asyncStart = prop => state =>
  Object.assign(state, { async: Object.assign((state.async || {}), { [prop]: true }) });

/**
 * Given a prop, set the async start flag to false
 * @param  {String} prop
 * @return {Reduction}
 */
export const asyncEnd = prop => state =>
  Object.assign(state, { async: Object.assign((state.async || {}), { [prop]: false }) });

/**
 * adds an error to the `errors` list of a piece of state
 * @type {Reduction}
 */
export const addError = (state, action) =>
  Object.assign(state, { errors: (state.errors || []).concat(action.error) });

/**
 * resets the `errors` object back to the empty list.
 * @type {Reduction}
 */
export const clearErrors = state =>
  Object.assign(state, { errors: [] });

/**
 * given multiple reductions, combine them into a single reduction
 * @param  {...Reduction} reductions
 * @return {Reduction}
 */
export const compose = (...reductions) => (state, action) =>
  reductions.reduce((prevState, f) => f(prevState, action), state);

/**
 * Create a reducer with an initial state, and a reduction map (from type to
 * reduction)
 * @param  {State} init
 * @param  {ReductionMap} typeObj
 * @return {Reducer}         [description]
 */
export const byType = (init, typeObj) => (state = init, action) => {
  if (typeObj[action.type]) {
    return typeObj[action.type](state, action);
  }
  return state;
};
