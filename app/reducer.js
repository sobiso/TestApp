import {
    GET_REPOS,
    GET_REPOS_SUCCESS,
    GET_REPOS_ERROR
} from './constants'
import { fromJS } from 'immutable';

const initialState = fromJS({
    repos: {
      loading: false,
      error: false,
      data : []
    },
    user: {
        loading: false,
    }
  });

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_REPOS:
      return state 
        .setIn(['repos','loading'], true)
        .setIn(['repos','error'], false)
        .setIn(['repos','data'], []);
    case GET_REPOS_SUCCESS:
        return state
            .setIn(['repos','loading'], false)
            .setIn(['repos','error'], false)
            .setIn(['repos','data'], (action.payload.data || {}).items);
    case GET_REPOS_ERROR:
        return state
            .setIn(['repos','error'], 'Error while fetching repositories')
            .setIn(['repos','loading'], false)
            .setIn(['repos','data'], []);
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