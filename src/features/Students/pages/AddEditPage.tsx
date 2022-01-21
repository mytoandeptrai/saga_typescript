import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../models';
import StudentForm from '../components/StudentForm';

export interface AddEditPageProps {}

export default function AddEditPage(props: AddEditPageProps) {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = React.useState<Student>();

  React.useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const response: Student = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = (formValues: Student) => {};

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  return (
    <>
      <Box>
        <Link to="/admin/students">
          <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
            <ChevronLeft /> &nbsp; Back to student list
          </Typography>
        </Link>

        <Typography variant="h4">{isEdit ? 'Edit student' : 'Add new student'}</Typography>

        {!isEdit ||
          (Boolean(student) && (
            <Box mt={3}>
              <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
            </Box>
          ))}
      </Box>
    </>
  );
}
