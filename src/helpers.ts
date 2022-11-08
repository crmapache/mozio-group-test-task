import { City, FormInitialValues } from './types'

/**
 * Set or change URL param if value not nullish or if it nullish, just delete it.
*/
export const setOrDeleteSearchParams = (
  key: string,
  value: unknown,
  searchParams: URLSearchParams,
): URLSearchParams => {
  let data = value

  if (Array.isArray(data) && !data.length) {
    data = null
  }

  if (data) {
    searchParams.set(key, JSON.stringify(data))
  } else {
    searchParams.delete(key)
  }

  return searchParams
}

/**
 * Parse URL search parameter and handle errors.
 */
export const parseSearchParam = (value: string | null) => {
  if (value) {
    try {
      return JSON.parse(value)
    } catch (e) {
      /**
       * TODO: create some unified notifications for errors or use some package.
       */

      return null
    }
  }

  return null
}


/**
 * Parse URL search parameters and prepare object with initial form values.
 */
export const getFormInitialValues = (searchParams: URLSearchParams): FormInitialValues => {
  const origin = parseSearchParam(searchParams.get('origin'))
  const destination = parseSearchParam(searchParams.get('destination'))
  const stops = parseSearchParam(searchParams.get('stops'))
  const tripDate = parseSearchParam(searchParams.get('tripDate'))
  const passengers = parseSearchParam(searchParams.get('passengers'))

  return {
    origin,
    destination,
    stops,
    tripDate,
    passengers,
  }
}

/**
 * Calculate distance between two points on the sphere.
 */
export const haversineDistance = (city1: City, city2: City) => {
  const toRad = (x: number) => {
    return (x * Math.PI) / 180
  }

  const lon1 = city1[1]
  const lat1 = city1[2]

  const lon2 = city2[1]
  const lat2 = city2[2]

  const R = 6371

  const x1 = lat2 - lat1
  const dLat = toRad(x1)
  const x2 = lon2 - lon1
  const dLon = toRad(x2)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Math.ceil(R * c)
}
