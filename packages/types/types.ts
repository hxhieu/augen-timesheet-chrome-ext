type TimesheetApiEndpoint = 'timesheet'
interface IHttpResponse {
  status: number
  data?: any
  error?: string
}

export { TimesheetApiEndpoint, IHttpResponse }
