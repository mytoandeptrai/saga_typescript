import {
  Box,
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import * as React from 'react';
import { City, Student } from '../../../models';
import { capitalizeString, getMarkColor } from './../../../utils/common';
import './style.css';

const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 650,
  },
  edit: {
    marginRight: theme.spacing(2),
  },
}));

export interface StudentTableProps {
  studentList: Student[];
  cityMap: { [key: string]: City };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell width={200}>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{capitalizeString(student.gender)}</TableCell>
              <TableCell>
                <Box color={getMarkColor(student.mark)} fontWeight="bold">
                  {student.mark}
                </Box>
              </TableCell>
              <TableCell>{cityMap[student.city]?.name}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="primary"
                  onClick={() => onEdit?.(student)}
                  className={classes.edit}
                >
                  Edit
                </Button>
                <Button size="small" color="secondary" onClick={() => onRemove?.(student)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
