import { ITimesheet } from 'types'
import moment from 'moment'
import { WEEKLY_SET_EMPLOYEE_TIMESHEET, WEEKLY_SET_WEEKSTART } from '../types'
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
}

const actions = {
  fetchEmployeeWeekly: async (
    { commit }: { commit: any; state: IWeeklyTimesheetStore },
    login: string,
    selectedDate?: Date,
  ) => {
    const start = moment(selectedDate || new Date())
      .startOf('isoWeek')
      .toDate()
    commit(WEEKLY_SET_WEEKSTART, start)
    const weekDays = getWeekDays(start)
    const { get } = useHttpClient()
    for (const date of weekDays) {
      const { status, error, data } = await get({
        login,
        date: date,
      })

      if (status === 200) {
        commit(WEEKLY_SET_EMPLOYEE_TIMESHEET, {
          employee: login,
          date,
          records: data,
        })
      } else {
        // TODO: Alert error
        console.error(error)
      }
    }
  },
}

const getters = {
  weekStartDisplay: (state: IWeeklyTimesheetStore) =>
    moment(state.weekStart).format('DD MMM YYYY'),
}

export default {
  actions,
  getters,
  mutations,
  state,
  namespaced: true,
}
