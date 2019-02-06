import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from "../Actions/posts";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function postsReducer(state = initialState, action){
  switch(action.type){
    case FETCH_POSTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.posts
      }

    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      }

    default: 
      return state;
  }
}