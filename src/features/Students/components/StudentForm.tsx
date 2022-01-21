import { Box, Button } from '@material-ui/core';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';
import { InputField, RadioGroupField, SelectField } from '../../../components/FormFields';
import { Student } from '../../../models';
import { selectCityOption } from './../../City/citySlice';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOption);

  const { control, handleSubmit } = useForm<Student>({
    defaultValues: initialValues,
  });

  const handleFormSubmit = (formValues: Student) => {
    console.log(formValues);
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

          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
