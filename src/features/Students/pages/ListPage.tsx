import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import * as React from 'react';
import { selectCityMap } from '../../City/citySlice';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import { selectStudenLoading, selectStudentPagination, studentActions } from '../studentSlice';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { selectStudentList, selectStudentFilter } from './../studentSlice';
import { selectCityList } from './../../City/citySlice';
import { ListParams } from './../../../models/common';
import { Student } from '../../../models';
import studentApi from '../../../api/studentApi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

export interface ListPageProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row, nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  loading: {
    width: '100%',
    position: 'absolute',
    top: theme.spacing(-1),
  },
}));

export default function ListPage(props: ListPageProps) {
  const match = useRouteMatch();
  const history = useHistory();

  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudenLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  const dispatch = useAppDispatch();
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      await studentApi.remove(student?.id || '');

      dispatch(studentActions.setFilter({ ...filter }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditStudent = async (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <>
      <Box className={classes.root}>
        {loading && <LinearProgress className={classes.loading} />}
        <>
          <Box className={classes.titleContainer}>
            <Typography variant="h4">Students</Typography>
            <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Add new student
              </Button>
            </Link>
          </Box>
          {/* Filter  */}
          <Box mb={3}>
            <StudentFilters
              filter={filter}
              cityList={cityList}
              onSearchChange={handleSearchChange}
              onChange={handleFilterChange}
            />
          </Box>
          {/* Student Table */}
          <StudentTable
            cityMap={cityMap}
            studentList={studentList}
            onRemove={handleRemoveStudent}
            onEdit={handleEditStudent}
          />
          {/* Pagination  */}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              color="primary"
              count={Math.ceil(pagination._totalRows / pagination._limit)}
              page={pagination._page}
              onChange={handlePageChange}
            />
          </Box>{' '}
        </>
      </Box>
    </>
  );
}
