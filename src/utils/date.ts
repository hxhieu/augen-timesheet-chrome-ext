import moment from 'moment'

const getWeekDays = (date: Date, format: string = 'DD-MM-YYYY'): string[] => {
  const d = moment(date).startOf('isoWeek')
  const result = []
  for (let i = 0; i < 7; i++) {
    result.push(d.format(format))
    d.add(1, 'd')
  }
  return result
}

export { getWeekDays }
