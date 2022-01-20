import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';
import { useAppDispatch } from './../../app/hooks';
import { cityActions } from '../City/citySlice';

export default function StudentFeature() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route path={match.path} exact>
          <ListPage />
        </Route>

        <Route path={`${match.path}/add`}>
          <AddEditPage />
        </Route>

        <Route path={`${match.path}/:studentId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </>
  );
}
