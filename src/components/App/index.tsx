import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Result, Home } from '../../pages'
import { Main } from '../../layouts/Main'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="" element={<Home />} />
        <Route path="result" element={<Result />} />
      </Route>
    </Routes>
  )
}
