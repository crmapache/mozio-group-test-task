import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { Dayjs } from 'dayjs'

type Props = {
  label: string
  initialValue: Dayjs | null
  onChange: (value: Dayjs | null) => void
  error?: boolean
  disabled?: boolean
}

export const DatePicker = ({
  label,
  initialValue,
  onChange,
  error = false,
  disabled = false,
}: Props) => {
  const [date, setDate] = useState<Dayjs | null>(initialValue)
  const [isTouched, setIsTouched] = useState(false)

  const dateOnChangeHandler = (value: Dayjs | null) => {
    /**
     * Change local and external values.
     */

    setDate(value)
    onChange(value)
  }

  return (
    <DesktopDatePicker
      label={label}
      inputFormat="DD/MM/YYYY"
      value={date}
      onChange={dateOnChangeHandler}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          error={isTouched ? error : false}
          onBlur={() => setIsTouched(true)}
        />
      )}
    />
  )
}
