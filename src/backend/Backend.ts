import cities from './cities.json'
import { haversineDistance } from '../helpers'
import { CalculationResult, City } from '../types'

export class Backend {
  static getCityByPattern(pattern: string): Promise<City[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (pattern === 'fail') {
          reject('500 Internal Server Error')
        }

        const result = (cities as City[]).filter(
          (el) => el[0].toLowerCase().search(pattern.toLowerCase()) !== -1,
        )

        resolve(result)
      }, 500)
    })
  }

  static calculateDistance(cities: City[]): Promise<CalculationResult> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result: CalculationResult = []

        for (let i = 0; i < cities.length; i++) {
          if (cities[i][0] === 'Dijon') {
            reject('Server error occurred when calculating distance to Dijon')
          }

          if (cities[i + 1]) {
            result.push([cities[i][0], haversineDistance(cities[i], cities[i + 1])])
          } else {
            result.push([cities[i][0], null])
          }
        }

        resolve(result)
      }, 2000)
    })
  }
}
