import 'regenerator-runtime/runtime';
import { takeEvery, put, call } from 'redux-saga/effects';
import { REQUEST_SEARCH } from './actions';
import mapManage from '../services/yandex-map';
import { addRoute, REQUEST, REQUEST_SUCCESS, requestError } from '../actions';

export default function* watchAsyncRequests() {
  yield takeEvery(REQUEST_SEARCH, querySearchGeoObject);
}

export function* querySearchGeoObject(action) {
  try {
    yield put({ type: REQUEST });
    const coords = yield call(mapManage.searchRouteCoords, action.route);
    yield put({ type: REQUEST_SUCCESS });
    const id = yield mapManage.createPlaceMark(action.route, coords);
    yield put(addRoute(action.route, id));
  } catch (error) {
    yield put(requestError(error.message));
  }
}
