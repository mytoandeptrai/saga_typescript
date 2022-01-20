import { all } from 'redux-saga/effects';
import { authSaga } from '../features/Auth/authSaga';
import citySaga from '../features/City/citySaga';
import couterSaga from '../features/counter/couterSaga';
import dashboardSaga from '../features/Dashboard/dashboardSaga';
import studentSaga from '../features/Students/studentSaga';

export default function* rootSaga() {
  yield all([couterSaga(), authSaga(), dashboardSaga(), studentSaga(), citySaga()]);
}
