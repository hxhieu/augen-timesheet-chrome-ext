import dayjs from 'dayjs'

const getWeekDays = (date: Date, format: string = 'DD-MM-YYYY'): string[] => {
  let d = dayjs(date).startOf('week')
  const result = []
  for (let i = 0; i < 7; i++) {
    result.push(d.format(format))
    d = d.add(1, 'day')
  }
  return result
}

export { getWeekDays }
