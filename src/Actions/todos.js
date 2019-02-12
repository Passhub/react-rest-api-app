export const FETCH_TODOS_BEGIN   = 'FETCH_TODOS_BEGIN';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const ADD_TODO            = 'ADD_TODO';
export const REWRITE_TODOS_ID    = 'REWRITE_TODOS_ID';
export const DELETE_TODO         = 'DELETE_TODO';
export const UPDATE_TODO         = 'UPDATE_TODO';
export const ADD_TODO_TIME       = 'ADD_TODO_TIME';
export const CHECK_TODO_STATUS   = 'CHECK_TODO_STATUS';

export const fetchTodosBegin = () => ({
  type: FETCH_TODOS_BEGIN
});

export const fetchTodosSuccess = todos => ({
  type: FETCH_TODOS_SUCCESS,
  payload: { todos }
});

export const fetchTodosFailure = error => ({
  type: FETCH_TODOS_FAILURE,
  payload: { error }
});

export const addTodo = todo => ({
  type: ADD_TODO,
  payload:  todo 
});

export const todosIdRewrite = () => ({
  type: REWRITE_TODOS_ID,
})

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id 
})

export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  payload: { todo } 
})

export const addTodoTime = () => ({
  type: ADD_TODO_TIME, 
})

export const checkTodoStatus = (todo) => ({
  type: CHECK_TODO_STATUS, 
  payload: { todo }
})

export const fetchTodos  = () => {
  console.log('fetchTodos');
  return (dispatch) => {
    dispatch(fetchTodosBegin());
      return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(responce => responce.json())
        .then(data => {dispatch(fetchTodosSuccess(data)); return data})
        .then(setTimeout(() => {dispatch(todosIdRewrite())}, 1000))
        .then(setTimeout(() => {dispatch(addTodoTime())}, 1000))
        .catch(error => dispatch(fetchTodosFailure(error)));
  }
}

export const addNewTodo = (title) => {
  console.log('changeTodos', title);
  return (dispatch) => dispatch(addTodo(title));
}

export const updateOldTodo = (todo) => {
  console.log('updateOldTodo!:', todo);
  return (dispatch) => dispatch(updateTodo(todo));
}

export const todoDelete = (id) => {
  console.log('todoDelete:', id);
  return (dispatch) => dispatch(deleteTodo(id));
}

export const checkStatus = (todo) => {
console.log('checkStatus:', todo);
return (dispatch) => dispatch(checkTodoStatus(todo));
}