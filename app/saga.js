import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

import {
    GET_REPOS,
    GET_REPOS_SUCCESS,
    GET_REPOS_ERROR
} from './constants'

function fetchRepos(search) {
    return axios({
        method: "get",
        url: `https://api.github.com/search/repositories?q=${search}&sort=created&order=desc`
    });
}

function* workerSaga(action) {
    try {
        const response = yield call(fetchRepos, action.search);
        const data = response.data.items
        yield put({ type: GET_REPOS_SUCCESS, data });
    } catch (error) {
        yield put({ type: GET_REPOS_ERROR, error });
    }
}

export  function* watcherSaga() {
  yield takeLatest(GET_REPOS, workerSaga);
}