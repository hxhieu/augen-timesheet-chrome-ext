import { ITimesheet } from 'types'
import moment from 'moment'
import { WEEKLY_SET_EMPLOYEE_TIMESHEET, WEEKLY_SET_WEEKSTART } from '../types'
import { useHttpClient } from '@/compositions/useHttpClient'

type IWeeklyRecord = { [key: string]: { [key: string]: ITimesheet[] } }

interface IWeeklyTimesheetStore {
  weekStart: Date
  employees: IWeeklyRecord
}

const state: IWeeklyTimesheetStore = {
  weekStart: moment()
    .startOf('isoWeek')
    .toDate(),
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
    selectedDate: string | Date,
  ) => {
    let d = moment(selectedDate).startOf('isoWeek')
    commit(WEEKLY_SET_WEEKSTART, d.toDate())
    const { get } = useHttpClient()
    for (let i = 0; i < 7; i++) {
      const date = d.format('DD-MM-YYYY')
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
      d.add(1, 'd')
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
