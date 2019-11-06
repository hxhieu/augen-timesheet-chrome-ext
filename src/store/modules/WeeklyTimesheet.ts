import { ITimesheet } from 'types'
import dayjs from 'dayjs'
import {
  WEEKLY_SET_EMPLOYEE_TIMESHEET,
  WEEKLY_SET_WEEKSTART,
  UPDATE_TIMESHEET_BLOCK,
} from '../types'
import { useHttpClient } from '@/compositions/useHttpClient'
import { getWeekDays } from '@/utils'

type IWeeklyRecord = { [key: string]: { [key: string]: ITimesheet[] } }

interface IWeeklyTimesheetStore {
  weekStart?: Date
  employees: IWeeklyRecord
}

const state: IWeeklyTimesheetStore = {
  employees: {},
}

const mutations = {
  [WEEKLY_SET_WEEKSTART]: (state: IWeeklyTimesheetStore, date: Date) => {
    state.weekStart = date
  },
  [WEEKLY_SET_EMPLOYEE_TIMESHEET]: (
    state: IWeeklyTimesheetStore,
    {
      employee,
      date,
      records,
    }: {
      employee: string
      date: string
      records: ITimesheet[]
    },
  ) => {
    if (!state.employees[employee]) {
      state.employees[employee] = {}
    }
    state.employees[employee][date] = records
  },
  [UPDATE_TIMESHEET_BLOCK]: (
    state: IWeeklyTimesheetStore,
    {
      employee,
      timesheetId,
      start,
      end,
    }: {
      employee: string
      timesheetId: number
      start: Date
      end: Date
    },
  ) => {},
}

const actions = {
  fetchEmployeeWeekly: async (
    { commit }: { commit: any; state: IWeeklyTimesheetStore },
    login: string,
    selectedDate?: Date,
  ) => {
    const start = dayjs(selectedDate || new Date())
      .startOf('week')
      .toDate()
    commit(WEEKLY_SET_WEEKSTART, start)
    const weekDays = getWeekDays(start)
    const { get } = useHttpClient()
    // Bundle the requests
    const requests = []
    for (const date of weekDays) {
      requests.push(
        get({
          login,
          date: date,
        }),
      )
    }

    // Execute the bundle
    const result = await Promise.all(requests)
    const weekTimesheet = result.map(x => x.data)

    // Update the state
    for (let i = 0; i < weekDays.length; i++) {
      commit(WEEKLY_SET_EMPLOYEE_TIMESHEET, {
        employee: login,
        date: weekDays[i],
        records: weekTimesheet[i],
      })
    }
  },
}

const getters = {
  weekStartDisplay: (state: IWeeklyTimesheetStore) =>
    dayjs(state.weekStart).format('DD MMM YYYY'),
  getDayTimesheet: (state: IWeeklyTimesheetStore) => (
    employee: string,
    date: string,
  ) => (state.employees[employee] && state.employees[employee][date]) || [],
}

export default {
  actions,
  getters,
  mutations,
  state,
  namespaced: true,
}
