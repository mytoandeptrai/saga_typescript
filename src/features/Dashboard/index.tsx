import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@material-ui/icons';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import StatictisItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  const classes = useStyles();

  React.useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <>
      <Box className={classes.root}>
        {/* Loading  */}

        {loading && <LinearProgress className={classes.loading} />}

        {/* Statistics Section  */}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <StatictisItem
              icon={<PeopleAlt fontSize="large" color="primary" />}
              label="male"
              value={statistics.maleCount}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatictisItem
              icon={<ChatRounded fontSize="large" color="primary" />}
              label="female"
              value={statistics.femaleCount}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatictisItem
              icon={<ChatBubble fontSize="large" color="primary" />}
              label="mark >= 8"
              value={statistics.highMarkCount}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatictisItem
              icon={<LinearScaleSharp fontSize="large" color="primary" />}
              label="mark <= 5"
              value={statistics.lowMarkCount}
            />
          </Grid>
        </Grid>

        {/* All Students Ranking  */}
        <Box mt={4}>
          <Typography variant="h4">All Students</Typography>

          <Box mt={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <Widget title="Student with highest mark">
                  <StudentRankingList studentList={highestStudentList} />
                </Widget>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Widget title="Student with highest mark">
                  <StudentRankingList studentList={lowestStudentList} />
                </Widget>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Ranking by city  */}
        <Box mt={4}>
          <Typography variant="h4">Rankings by city</Typography>

          <Box mt={3}>
            <Grid container spacing={3}>
              {rankingByCityList.map((ranking) => (
                <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                  <Widget title={ranking.cityName}>
                    <StudentRankingList studentList={ranking.rankingList} />
                  </Widget>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
