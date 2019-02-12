import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  REWRITE_POSTS_ID,
  UPDATE_POST,
  DELETE_POST
} from "../Actions/posts";

const v4 = require('uuid/v4');

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

    case REWRITE_POSTS_ID:
    return {
      ...state,
      items: [...state.items.filter(item =>
        item.id = v4()  
      )]
    }

    case UPDATE_POST:
    return {
      ...state,
      items: [...state.items.filter(item => {
        if(item.id === action.payload.post.id){
          item.body = action.payload.post.body
        }
        return item;
      }
      )]
    }
    
    case DELETE_POST:
      return {
        ...state,
        items: [...state.items.filter(item =>
          item.id !== action.payload 
        )]
      }


    default: 
      return state;
  }
}