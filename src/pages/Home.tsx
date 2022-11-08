import { useSearchParams } from 'react-router-dom'

import { SearchForm } from '../components/SearchForm'
import { getFormInitialValues } from '../helpers'

export const Home = () => {
  const [searchParams] = useSearchParams()

  const initialValues = getFormInitialValues(searchParams)

  return <SearchForm initialValues={initialValues} />
}
