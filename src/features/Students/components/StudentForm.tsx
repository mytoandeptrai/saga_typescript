import { Box, Button, CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';
import { InputField, RadioGroupField, SelectField } from '../../../components/FormFields';
import { Student } from '../../../models';
import { selectCityOption } from './../../City/citySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert } from '@material-ui/lab';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const schema = yup
  .object({
    name: yup.string().required('PLease enter name'),
    age: yup
      .number()
      .positive('Please enter a positive number')
      .min(18, 'Min is 18')
      .max(60, 'Max is 60')
      .integer('Please enter an integer')
      .required('Please enter age')
      .typeError('Please enter a valid number'),
    mark: yup
      .number()
      .positive('Please enter a positive number')
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter mark'),
    gender: yup
      .string()
      .required()
      .oneOf(['male', 'female'], 'Please select either male or female')
      .required('Please select gender'),
    city: yup.string().required('Please select city'),
  })
  .required();

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOption);
  const [error, setError] = React.useState('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      // Clear previous submission error
      setError('');

      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <Box maxWidth={400}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <InputField name="name" control={control} label="Full Name" />
          {/* <InputField name="gender" control={control} label="Gender" /> */}

          <RadioGroupField
            name="gender"
            control={control}
            label="Gender"
            options={[
              {
                label: 'Male',
                value: 'male',
              },
              {
                label: 'Female',
                value: 'female',
              },
              {
                label: 'Other',
                value: 'other',
              },
            ]}
          />

          <InputField name="age" control={control} label="Age" type="number" />
          <InputField name="mark" control={control} label="Mark" type="number" />

          <SelectField name="city" control={control} label="City" options={cityOptions} />

          {error && <Alert severity="error">{error}</Alert>}

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting ? true : false}
              type="submit"
            >
              {isSubmitting && <CircularProgress size={16} color="primary" />}
              &nbsp;Save
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
