import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import { querySearchGeoObject } from '../app/sagas';
import { REQUEST_SEARCH } from '../app/sagas/actions';
import {
  REQUEST,
  REQUEST_SUCCESS,
  addRoute,
  REQUEST_ERROR,
} from '../app/actions';
import mapManage from '../app/services/yandex-map';

jest.mock('../app/services/yandex-map');

describe('test sagas', () => {
  const action = { route: 'Moscow', type: REQUEST_SEARCH };
  const genFunc = querySearchGeoObject(action);
  const coords = mapManage.searchRouteCoords(action.route);

  it('dispatch REQUEST', () => {
    expect(genFunc.next().value).toEqual(put({ type: REQUEST }));
  });

  it('calling api search', () => {
    expect(genFunc.next().value).toEqual(
      call(mapManage.searchRouteCoords, action.route),
    );
  });

  it('dispatch SUCCESS_REQUEST', () => {
    expect(genFunc.next().value).toEqual(put({ type: REQUEST_SUCCESS }));
  });

  it('call mapManage.createPlaceMark', () => {
    expect(genFunc.next().value).toEqual(
      mapManage.createPlaceMark(action.route, coords),
    );
  });

  it('dispatch addRoute()', () => {
    expect(genFunc.next().value).toEqual(
      put(addRoute(action.route, undefined)),
    );
  });

  it('sagas done', () => {
    expect(genFunc.next().done).toBe(true);
  });
});

describe('Saga request error handle', () => {
  const action = { route: 1, type: REQUEST_SEARCH };
  const error = new Error(`can't find ${action.route}`);
  const { message } = error;
  it('Throw error', () =>
    expectSaga(querySearchGeoObject, mapManage)
      .put({ type: REQUEST })
      .provide([
        [
          matchers.call.fn(mapManage.searchRouteCoords, action.route),
          throwError(error),
        ],
      ])
      .put({ type: REQUEST_ERROR, message })
      .run());
});
