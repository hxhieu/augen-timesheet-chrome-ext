import { random, lorem, company, commerce } from 'faker'
import moment from 'moment'
import { ITimesheet, IChargeSummaryItem } from 'types'

const { number: randomInt, boolean: randomBool, alphaNumeric } = random

const code = ['CODIG', 'PLAN', 'MEETG', 'DAILY', 'ANLYS']

const getRandomCode = () => code[randomInt(4)]

const fakeTimesheetByLoginAndDate = (date: string): ITimesheet[] => {
  const d = moment(date, 'dd-mm-yyyy')
  const count = randomInt({ min: 1, max: 6 })
  const result: ITimesheet[] = []
  for (let i = 0; i < count; i++) {
    result.push({
      Charge: randomBool() ? undefined : 'N/C',
      Code: getRandomCode(),
      Description: lorem.sentence(),
      End: d.add(4, 'hours').toDate(),
      EndText: '',
      Hours: 4,
      OrganizationName: company.companyName(),
      Phase: '01',
      Planned: true,
      PlannedText: 'Yes',
      ProjectId: randomInt(90000),
      ProjectName: commerce.productName(),
      RateId: randomInt(90000),
      RateName: commerce.productName(),
      Ref: alphaNumeric(3).toUpperCase(),
      Start: d.toDate(),
      StartText: '',
      TimesheetId: randomInt(90000),
    })
  }
  return result
}

const fakeChangeSummary = (periodStart: string): IChargeSummaryItem[] => {
  const result: IChargeSummaryItem[] = []

  for (let i = 1; i <= 7; i++) {
    const fullDay = randomInt({ min: 6, max: 10 })
    const charge = randomInt({ min: 0, max: fullDay })
    result.push({
      WeekDay: i,
      Charge: charge,
      NonCharge: fullDay - charge,
    })
  }

  return result
}

export { fakeTimesheetByLoginAndDate, fakeChangeSummary }