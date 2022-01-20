import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

export interface IStatictisItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: '20px',
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export default function StatictisItem({ icon, label, value }: IStatictisItemProps) {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <Box>{icon}</Box>
        <Box>
          <Typography variant="h5" align="right">
            {value}
          </Typography>
          <Typography variant="caption">{label}</Typography>
        </Box>
      </Paper>
    </>
  );
}
