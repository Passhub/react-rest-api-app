import {
  FETCH_TODOS_BEGIN,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODO,
  REWRITE_TODOS_ID,
  DELETE_TODO,
  UPDATE_TODO,
  ADD_TODO_TIME,
  CHECK_TODO_STATUS,
} from "../Actions/todos";

const v4 = require('uuid/v4');
const moment = require('moment')

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function todosReducer(state = initialState, action){
  switch(action.type){
    case FETCH_TODOS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.todos
      };

    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    case ADD_TODO:
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case REWRITE_TODOS_ID:
      return {
        ...state,
        items: [...state.items.filter(item =>
          item.id = v4()  
        )]
      }

    case DELETE_TODO:
      return {
        ...state,
        items: [...state.items.filter(item =>
          item.title !== action.payload 
        )]
      }

    case UPDATE_TODO:
      return {
        ...state,
        items: [...state.items.filter(item => {
          if(item.id === action.payload.todo.id){
            item.title = action.payload.todo.title
          }
          return item;
          }
        )]
      }
      
    case ADD_TODO_TIME:
    return {
      ...state,
      items: [...state.items.filter(item =>
        item.time = moment().valueOf() 
      )]
    }
      
    case CHECK_TODO_STATUS:
    return {
      ...state,
      items: [...state.items.filter(item => {
        if(item.id === action.payload.todo.id){
          item.completed = action.payload.todo.completed
        }
        return item
      }
      )]
    }

    default: 
      return state;
  }
}