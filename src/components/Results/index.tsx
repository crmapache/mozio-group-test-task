import { useEffect, useMemo, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'

import { Backend } from '../../backend/Backend'
import { CalculationResult, CitySelectOption } from '../../types'

type Props = {
  origin: CitySelectOption | null
  destination: CitySelectOption | null
  stops: CitySelectOption[] | null
  errorHandler: (e: string) => void
}

export const Results = ({ origin, destination, stops, errorHandler }: Props) => {
  const [results, setResults] = useState<CalculationResult>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!origin || !destination) {
      errorHandler('Data is incorrect')
    } else {
      const cities = [origin.value, ...(stops?.map((stop) => stop.value) || []), destination.value]

      Backend.calculateDistance(cities)
        .then((data) => {
          setResults(data)
        })
        .catch((e: string) => {
          errorHandler(e)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  const totalDistance = useMemo(() => {
    return results.reduce((sum, el) => sum + (el[1] || 0), 0)
  }, [results])

  return (
    <Box sx={sx.resultsWrap}>
      {loading && <CircularProgress />}
      {!loading && (
        <Box>
          {results.map((el, i) => {
            const cityName = el[0]
            const distance = el[1]

            return (
              <Box sx={sx.result} key={i}>
                <Box sx={sx.resultCityName}>{cityName}</Box>
                {distance !== null && <Box sx={sx.resultDistance}>{distance} km</Box>}
              </Box>
            )
          })}
          <Box sx={{ ...sx.resultDistance, ...sx.resultDistanceTotal }}>{totalDistance} km</Box>
        </Box>
      )}
    </Box>
  )
}

const sx = {
  resultsWrap: {
    mt: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  result: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  resultCityName: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#fff',
    backgroundColor: '#5d5d5d',
    borderRadius: '10px',
    padding: '15px 25px',
    position: 'relative',
    mb: '20px',
    '&:after': {
      content: '""',
      position: 'absolute',
      left: 'calc(50% - 10px)',
      bottom: '-20px',
      border: '10px solid transparent',
      borderTop: '10px solid #5d5d5d',
    },
  },
  resultDistance: {
    textAlign: 'center',
    mb: '20px',
    fontSize: '20px',
    color: '#2196f3',
  },
  resultDistanceTotal: {
    color: '#ff5722',
  },
}
