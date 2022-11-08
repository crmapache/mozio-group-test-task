import React, { useEffect, useMemo, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import dayjs from 'dayjs'

import { CitySelect } from '../CitySelect'
import { DatePicker } from '../DatePicker'
import { setOrDeleteSearchParams } from '../../helpers'
import { MAX_PASSENGERS_COUNT, MAX_STOPS_COUNT } from '../../constants'
import { CitySelectOption, FormInitialValues } from '../../types'

type Props = {
  initialValues: FormInitialValues
  readOnly?: boolean
}

export const SearchForm = ({ initialValues, readOnly = false }: Props) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [cityOfOrigen, setCityOfOrigen] = useState(initialValues['origin'])
  const [cityOfDestination, setCityOfDestination] = useState(initialValues['destination'])
  const [intermediateCities, setIntermediateCities] = useState(initialValues['stops'] || [])
  const [tripDate, setTripDate] = React.useState(initialValues['tripDate'])
  const [passengers, setPassengers] = useState(initialValues['passengers'] || '1')

  useEffect(() => {
    /**
     * When some form values is updates i will put it in the URL
     */

    let params = setOrDeleteSearchParams('origin', cityOfOrigen, searchParams)
    params = setOrDeleteSearchParams('destination', cityOfDestination, params)
    params = setOrDeleteSearchParams('stops', intermediateCities, params)
    params = setOrDeleteSearchParams('tripDate', tripDate, params)
    params = setOrDeleteSearchParams('passengers', passengers, params)

    setSearchParams(params)
  }, [cityOfOrigen, cityOfDestination, intermediateCities, tripDate, passengers])

  const deleteStopButtonHandler = (index: number) => () => {
    /**
     * Delete intermediate city
     */

    setIntermediateCities((prevState) => prevState.filter((el, i) => i !== index))
  }

  const addStopButtonHandler = () => {
    /**
     * Add intermediate city.
     */

    setIntermediateCities((prevState) => [...prevState, null])
  }

  const IntermediateCityChangeHandler = (index: number) => (value: CitySelectOption | null) => {
    /**
     * Change intermediate city value.
     */

    setIntermediateCities((prevState) => prevState.map((el, i) => (i === index ? value : el)))
  }

  const calculateButtonHandler = () => {
    /**
     * Go to result page with correct URL params.
     */

    navigate({
      pathname: '/result',
      search: `?${createSearchParams({
        origin: JSON.stringify(cityOfOrigen),
        destination: JSON.stringify(cityOfDestination),
        stops: JSON.stringify(intermediateCities),
        tripDate: JSON.stringify(tripDate),
        passengers: JSON.stringify(passengers),
      }).toString()}`,
    })
  }

  const isCanCalculate = useMemo(() => {
    /**
     * If form is filled correct.
     */

    return (
      !!cityOfOrigen &&
      !!cityOfDestination &&
      intermediateCities.find((el) => el === null) === undefined &&
      dayjs().isBefore(tripDate, 'date')
    )
  }, [cityOfOrigen, cityOfDestination, intermediateCities, tripDate])

  return (
    <Box>
      <Box sx={sx.fieldWrap}>
        <CitySelect
          initialValue={cityOfOrigen}
          onChange={setCityOfOrigen}
          title="City of origen"
          error={!cityOfOrigen}
          disabled={readOnly}
        />
      </Box>
      {intermediateCities.map((el, index) => (
        <Box sx={sx.fieldWrap} key={index}>
          <CitySelect
            initialValue={el}
            onChange={IntermediateCityChangeHandler(index)}
            title="Intermediate City"
            error={!intermediateCities[index]}
            disabled={readOnly}
          />
          <Box sx={sx.deleteButtonWrap}>
            <Button
              variant="outlined"
              color="error"
              sx={sx.button}
              onClick={deleteStopButtonHandler(index)}
              disabled={readOnly}>
              Delete
            </Button>
          </Box>
        </Box>
      ))}
      {intermediateCities.length < MAX_STOPS_COUNT && (
        <Box sx={sx.addButtonWrap}>
          <Button
            variant="outlined"
            color="success"
            sx={sx.button}
            fullWidth
            onClick={addStopButtonHandler}
            disabled={readOnly}>
            Add Stop
          </Button>
        </Box>
      )}
      <Box sx={sx.fieldWrap}>
        <CitySelect
          initialValue={cityOfDestination}
          onChange={setCityOfDestination}
          title="City of destination"
          error={!cityOfDestination}
          disabled={readOnly}
        />
      </Box>
      <Box sx={sx.fieldWrap}>
        <DatePicker
          label="Trip date"
          initialValue={tripDate}
          error={!dayjs().isBefore(tripDate, 'date')}
          onChange={setTripDate}
          disabled={readOnly}
        />
        <Box sx={sx.selectWrap}>
          <FormControl fullWidth>
            <InputLabel>Passengers</InputLabel>
            <Select
              value={passengers}
              onChange={(e: SelectChangeEvent) => setPassengers(e.target.value)}
              autoWidth
              label="Passengers"
              disabled={readOnly}>
              {[...Array(MAX_PASSENGERS_COUNT)].map((__, i) => (
                <MenuItem value={i + 1} key={i}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {!readOnly && (
        <Box sx={sx.calculateButtonWrap}>
          <Button
            variant="contained"
            color="success"
            sx={sx.button}
            fullWidth
            onClick={calculateButtonHandler}
            disabled={!isCanCalculate}>
            Calculate
          </Button>
        </Box>
      )}
    </Box>
  )
}

const sx = {
  fieldWrap: {
    mb: '20px',
    display: 'flex',
    alignItems: 'stretch',
  },
  addButtonWrap: {
    mb: '20px',
  },
  deleteButtonWrap: {
    ml: '15px',
  },
  button: {
    padding: '15px',
    height: '56px',
  },
  calculateButtonWrap: {
    mt: '40px',
  },
  selectWrap: {
    minWidth: '100px',
    ml: '20px',
  },
}
