export const FETCH_TODOS_BEGIN   = 'FETCH_TODOS_BEGIN';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

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

export function fetchTodos () {
  console.log('fetchTodos')
  return (dispatch) => {
    dispatch(fetchTodosBegin());
      return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(responce => responce.json())
        .then(data => {dispatch(fetchTodosSuccess(data)); return data})
        .catch(error => dispatch(fetchTodosFailure(error)));
  }
}