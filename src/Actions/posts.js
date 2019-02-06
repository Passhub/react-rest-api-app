export const FETCH_POSTS_BEGIN   = 'FETCH_POSTS_BEGIN';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const fetchPostsBegin = () => ({
  type: FETCH_POSTS_BEGIN
});

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts }
});

export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error }
});

export function fetchPosts () {
  console.log('fetchPosts')
  return (dispatch) => {
    dispatch(fetchPostsBegin());
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(responce => responce.json())
        .then(data => {dispatch(fetchPostsSuccess(data)); return data})
        .catch(error => dispatch(fetchPostsFailure(error)));
  }
}