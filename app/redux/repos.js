import {
  GET_REPOS,
  GET_REPOS_SUCCESS,
  GET_REPOS_ERROR,
  REMOVE_ITEM
} from './../constants'
import {
  fromJS
} from 'immutable';

const initialState = fromJS({
  loading: false,
  error: false,
  data: []
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return state
        .set('loading', action.payload.repos.loading)
        .set('error', action.payload.repos.error)
        .set('data', action.payload.repos.data);
    case GET_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', []);
    case GET_REPOS_SUCCESS:
      console.log(action)
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', action.data);
    case GET_REPOS_ERROR:
      return state
        .set('error', 'Error while fetching repositories')
        .set('loading', false)
        .set('data', []);
    case REMOVE_ITEM:
      return state
        .set('data', state.get('data').filter(i => i.id != action.payload.id))
    default:
      return state;
  }
}

export function listRepos(search) {
  return {
    type: GET_REPOS,
    search
  }
}

export function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    payload: {
      id
    }
  }
}