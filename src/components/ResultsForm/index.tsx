import React from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { CitySelect } from '../CitySelect'
import { DatePicker } from '../DatePicker'
import { MAX_PASSENGERS_COUNT } from '../../constants'
import { FormInitialValues } from '../../types'

type Props = {
  initialValues: FormInitialValues
}

export const ResultsForm = ({ initialValues }: Props) => {
  return (
    <Box>
      <Box sx={sx.fieldWrap}>
        <CitySelect
          initialValue={initialValues['origin']}
          onChange={() => {}}
          title="City of origen"
          disabled
        />
      </Box>
      {(initialValues['stops'] || []).map((el, index: number) => (
        <Box sx={sx.fieldWrap} key={index}>
          <CitySelect initialValue={el} onChange={() => {}} title="Intermediate City" disabled />
        </Box>
      ))}
      <Box sx={sx.fieldWrap}>
        <CitySelect
          initialValue={initialValues['destination']}
          onChange={() => {}}
          title="City of destination"
          disabled
        />
      </Box>
      <Box sx={sx.fieldWrap}>
        <DatePicker
          label="Trip date"
          initialValue={initialValues['tripDate']}
          onChange={() => {}}
          disabled
        />
        <Box sx={sx.selectWrap}>
          <FormControl fullWidth>
            <InputLabel>Passengers</InputLabel>
            <Select
              value={initialValues['passengers']}
              onChange={() => {}}
              autoWidth
              label="Passengers"
              disabled>
              {[...Array(MAX_PASSENGERS_COUNT)].map((__, i) => (
                <MenuItem value={i + 1} key={i}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  )
}

const sx = {
  fieldWrap: {
    mb: '20px',
    display: 'flex',
    alignItems: 'stretch',
  },
  selectWrap: {
    minWidth: '100px',
    ml: '20px',
  },
}
