const postReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_POSTS':
      return {
        ...state,
        posts: action.payload,
      };
    case 'DETAIL_POST':
      return {
        ...state,
        post: action.payload,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
