import {
    GET_REPOS,
    GET_REPOS_SUCCESS,
    GET_REPOS_ERROR,
    REMOVE_ITEM
} from './constants'
import { fromJS } from 'immutable';

const initialState = fromJS({
    repos: {
      loading: false,
      error: false,
      data : []
    },
  });

export default function reducer(state = initialState, action) {
  console.log(state)
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
          .setIn(['repos','data'], action.data);
    case GET_REPOS_ERROR:
      return state
          .setIn(['repos','error'], 'Error while fetching repositories')
          .setIn(['repos','loading'], false)
          .setIn(['repos','data'], []);
    case REMOVE_ITEM:
        return state
            .setIn(['repos','data'], state.getIn(['repos', 'data']).filter(i => i.id != action.payload.id))
    default:
      return state;
  }
}

export function listRepos(search) {
      return {
        type: GET_REPOS,
        search
      };
    }

export function removeItem(id) {

    return {
        type: REMOVE_ITEM,
        payload: {
            id
        }
    }
}