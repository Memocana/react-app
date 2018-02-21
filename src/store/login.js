// Actions
const TEST = 'reducer/TEST';

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        status: action.status,
      };
    default: return state;
  }
}

// Action Creators
export function testStatus(dispatch, status) {
    return dispatch({
        type: TEST,
        status : status
    });
}
