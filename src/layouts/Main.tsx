import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

export const Main = () => {
  return (
    <Box sx={sx}>
      <Outlet />
    </Box>
  )
}

const sx = {
  padding: '20px',
  margin: '0 auto',
  maxWidth: '900px',
}
