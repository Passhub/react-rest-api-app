export const FETCH_TODOS_BEGIN   = 'FETCH_TODOS_BEGIN';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const TODOS_CHANGED = 'TODOS_CHANGED';
export const TODOS_ID_REWRITE = 'TODOS_ID_REWRITE';

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

export const todosChanged = todo => ({
  type: TODOS_CHANGED,
  payload:  todo 
});

export const todosIdRewrite = (id) => ({
  type: TODOS_ID_REWRITE,
  payload: { id }
})

export const fetchTodos  = () => {
  console.log('fetchTodos');
  return (dispatch) => {
    dispatch(fetchTodosBegin());
      return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(responce => responce.json())
        .then(data => {dispatch(fetchTodosSuccess(data)); return data})
        .catch(error => dispatch(fetchTodosFailure(error)));
  }
}

export const changeTodos = (title) => {
  console.log('changeTodos', title);
  return (dispatch) => dispatch(todosChanged(title));
}