import { Dayjs } from 'dayjs'

export type City = [string, number, number]
export type CitySelectOption = { label: string; value: City }

export type FormInitialValues = {
  origin: CitySelectOption | null
  destination: CitySelectOption | null
  stops: (CitySelectOption | null)[] | null
  tripDate: Dayjs | null
  passengers: string | null
}

export type CalculationResult = [string, number | null][]
