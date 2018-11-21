import {
    GET_REPOS,
    GET_REPOS_SUCCESS,
    GET_REPOS_ERROR
} from './constants'

export default function reducer(state = { repos: [] }, action) {
  switch (action.type) {
    case GET_REPOS:
      return { 
          ...state, 
          loading: true };
    case GET_REPOS_SUCCESS:
      return { 
          ...state,
          loading: false,
          repos: action.payload.data };
    case GET_REPOS_ERROR:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching repositories'
      };
    default:
      return state;
  }
}

export function listRepos(search) {
    return {
      type: GET_REPOS,
      payload: {
        request: {
          url: `search/repositories?q=${search}&sort=created&order=desc`
        }
      }
    };
  }