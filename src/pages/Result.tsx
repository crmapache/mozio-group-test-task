import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Button } from '@mui/material'

import { getFormInitialValues } from '../helpers'
import { ResultsForm } from '../components/ResultsForm'
import { Results } from '../components/Results'
import { CitySelectOption } from '../types'

export const Result = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  /**
   * TODO: create some unified notifications for errors or use some package.
   */

  const [error, setError] = useState<string | null>(null)

  const initialValues = getFormInitialValues(searchParams)

  return (
    <>
      {!error && (
        <>
          <ResultsForm initialValues={initialValues} />
          <Results
            origin={initialValues['origin']}
            stops={initialValues['stops'] as CitySelectOption[] | null}
            destination={initialValues['destination']}
            errorHandler={setError}
          />
        </>
      )}
      {error && (
        <Box sx={sx.errorWrap}>
          <Box sx={sx.errorTitle}>{error}</Box>
          <Button variant="contained" color="success" onClick={() => navigate('/')}>
            Go to home page
          </Button>
        </Box>
      )}
    </>
  )
}

const sx = {
  errorWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorTitle: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#f44336',
    mb: '20px',
  },
}
