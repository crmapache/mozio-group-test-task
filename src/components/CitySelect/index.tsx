import React, { useState } from 'react'
import { Autocomplete, Box, TextField } from '@mui/material'

import { City, CitySelectOption } from '../../types'
import { Backend } from '../../backend/Backend'

type Props = {
  initialValue: CitySelectOption | null
  onChange: (value: CitySelectOption | null) => void
  title: string
  error?: boolean
  disabled?: boolean
}

export const CitySelect = ({
  initialValue,
  onChange,
  title,
  error = false,
  disabled = false,
}: Props) => {
  const [defaultValue] = useState(initialValue)
  const [isTouched, setIsTouched] = useState(false)
  const [options, setOptions] = useState<CitySelectOption[]>([])
  const [loading, setLoading] = useState(false)

  const onAutocompleteChange = (e: React.SyntheticEvent, value: CitySelectOption | null) => {
    /**
     * Autocomplete change handler.
     */

    onChange(value)
  }

  const onAutocompleteInputChange = async (e: React.SyntheticEvent, value: string) => {
    if (value !== '') {
      setLoading(true)

      try {
        const results = await Backend.getCityByPattern(value)
        setOptions(results.map((el: City) => ({ label: el[0], value: el })))
      } catch (e) {
        /**
         * TODO: create some unified notifications for errors or use some package.
         */

        console.log(e)
      }

      setLoading(false)
    }
  }

  const isOptionEqualToValue = (option: CitySelectOption, value: CitySelectOption) => {
    /**
     * Compare current value with options.
     */

    return option.value.reduce((acc, cur, index) => (acc ? cur === value.value[index] : acc), true)
  }

  return (
    <Box sx={sx.fieldWrap}>
      <Autocomplete
        defaultValue={defaultValue}
        onChange={onAutocompleteChange}
        onInputChange={onAutocompleteInputChange}
        loading={loading}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label={title}
            error={isTouched ? error : false}
            onBlur={() => setIsTouched(true)}
          />
        )}
        isOptionEqualToValue={isOptionEqualToValue}
        disabled={disabled}
      />
    </Box>
  )
}

const sx = {
  fieldWrap: {
    flex: '1 1 0',
  },
}
