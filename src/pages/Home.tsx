import { useSearchParams } from 'react-router-dom'

import { SearchForm } from '../components/SearchForm'
import { getFormInitialValues } from '../helpers'

export const Home = () => {
  const [searchParams] = useSearchParams()

  /**
   * Get initial values from URL to pass it in the form.
   */
  const initialValues = getFormInitialValues(searchParams)

  return <SearchForm initialValues={initialValues} />
}
