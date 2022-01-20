import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import * as React from 'react';
import { City } from '../../../models';
import { ListParams } from './../../../models/common';

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({
  filter,
  cityList,
  onChange,
  onSearchChange,
}: StudentFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };

    onSearchChange(newFilter);
  };

  const handleCityChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      city: e.target.value || undefined,
      _page: 1,
    };

    onChange(newFilter);
  };

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
              <OutlinedInput
                id="searchByName"
                label="Search By Name"
                endAdornment={<Search />}
                onChange={handleSearchChange}
                defaultValue={filter.name_like || ''}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="filterByCity">Filter By City</InputLabel>
              <Select
                labelId="filterByCity"
                value={filter.city || ''}
                onChange={handleCityChange}
                label="Filter By City"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {cityList.map((city) => (
                  <MenuItem key={city.code} value={city.code}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
