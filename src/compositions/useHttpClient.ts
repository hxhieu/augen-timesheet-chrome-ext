import { TimesheetApiEndpoint, IHttpResponse } from 'types'
import * as axios from 'axios'

const client = axios.default.create({
  withCredentials: true,
  baseURL: `${process.env.VUE_APP_HOST_URL}/api`,
})

const get = async (endpoint: string, query?: any): Promise<IHttpResponse> =>
  new Promise<IHttpResponse>(async resolve => {
    try {
      let url: string = endpoint
      if (query) {
        url += '?'
        Object.keys(query).forEach(x => {
          url += `${x}=${encodeURIComponent(query[x])}&`
        })
        url = url.substring(0, url.length - 1)
      }

      const response = await client.get(url)
      const { status, data } = response
      return resolve({
        status,
        data,
      })
    } catch (err) {
      resolve({
        status: err.status,
        error: err.message,
      })
    }
  })

export const useHttpClient = (endpoint: TimesheetApiEndpoint = 'timesheet') => {
  return {
    get: (query?: any) => get(endpoint, query),
  }
}
