interface ITimesheet {
  Charge?: string
  Code: string
  Description: string
  EmployeeID?: string
  End: Date
  EndText: string
  FullName?: string
  Hours: number
  InvoiceId?: any
  IsPastLastWeekEntry?: boolean
  IsViolated?: boolean
  LastModifiedDate?: Date
  LastModifiedUser?: string
  OrganizationName: string
  Phase: string
  Planned: boolean
  PlannedText: string
  ProjectId: number
  ProjectName: string
  RateId: number
  RateName: string
  Ref: string
  Start: Date
  StartText: string
  TimesheetId: number
  WorkItemId?: any
  Colour: string
}

interface IChargeSummaryItem {
  WeekDay: number
  Charge: number
  NonCharge: number
}

export { ITimesheet, IChargeSummaryItem }
