<template>
  <Container>
    <Text1>Hour today</Text1>
    <TextHour>{{ dayHours }}</TextHour>
    <!-- <TimesheetDayGauge
      v-for="date in weekDays"
      :key="date"
      :date="date"
      :employee="employee"
    />-->
    <Button @click="fix">Fix It</Button>
    <Visit :href="`${hostUrl}/Timesheet2`" target="_blank">Visit</Visit>
  </Container>
</template>

<script lang="ts">
import { createComponent, ref, computed } from '@vue/composition-api'
import { useHttpClient } from '../compositions/useHttpClient'
import { IChargeSummaryItem, IHttpResponse } from 'types'
import { useState, useActions } from '@u3u/vue-hooks'
import styled from 'vue-styled-components'
import { getWeekDays } from '@/utils'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
dayjs.extend(utc)

const Container = styled.div`
  text-align: center;
`
const Text1 = styled.div`
  font-size: 4em;
`
const TextHour = styled.div`
  font-size: 8em;
`

const Button = styled.button`
  font-size: 2em;
  padding: 10px 20px;
`

const Visit = styled.a`
  font-size: 2em;
  display: block;
  margin: 20px;
`

const TimesheetDayGauge = () =>
  import(
    /* webpackChunkName: "containers-timesheet-daygauge" */ '@/containers/TimesheetDayGauge.vue'
  )

export default createComponent({
  components: { Container, Text1, TextHour, TimesheetDayGauge, Button, Visit },
  setup() {
    // const state = {
    //   ...useState('Shell', ['employee']),
    //   ...useState('WeeklyTimesheet', ['weekStart']),
    // }
    // const { weekStart, employee } = state
    // const actions = {
    //   ...useActions('WeeklyTimesheet', ['fetchEmployeeWeekly']),
    // }
    // const { fetchEmployeeWeekly } = actions
    // fetchEmployeeWeekly(employee.value)
    // const weekDays = computed(() => getWeekDays(weekStart.value))
    // return {
    //   weekDays,
    //   employee,
    // }

    // https://intranet.augensoftwaregroup.com/Timesheet2/api/timesheet?login=hugh.hoang&date=12-02-2020

    const { get, post } = useHttpClient()
    const dayHours = ref(0)
    const hostUrl = ref('https://intranet.augensoftwaregroup.com')

    const getToday = async () => {
      const result = await get({
        login: 'hugh.hoang',
        date: dayjs().format('DD-MM-YYYY'),
      })
      return {
        hours: result.data.reduce(
          (hours: any, next: any) => hours + next.Hours,
          0,
        ),
        last:
          result.data && result.data.length
            ? dayjs.utc(result.data[result.data.length - 1].End)
            : dayjs.utc().startOf('day'),
      }
    }

    const refresh = () => {
      getToday().then(result => {
        const { hours } = result
        dayHours.value = hours
        chrome.browserAction.setIcon({
          path: dayHours.value < 4 ? 'augen-icon-warn.png' : 'augen-icon.png',
        })
      })
    }

    const payload = {
      TimesheetId: 0,
      OrganizationName: 'Augen (NZ) Limited',
      ProjectId: '200041',
      ProjectName: 'Augen - Technology Role',
      ProjectDescription: '200041-Augen - Technology Role',
      Phase: '01',
      RateId: 0,
      RateName: 'Zero-rate',
      Code: 'ANLYS',
      Ref: '',
      Hours: 2,
      Charge: 'N/C',
      Description: 'Tech session preps',
      Start: '2020-02-12T20:00:00.000Z',
      End: '2020-02-12T22:00:00.000Z',
      Planned: true,
      WorkItemId: '',
      PlannedText: 'Yes',
      StartText: '20:00',
      EndText: '22:00',
      EmployeeID: 'hugh.hoang',
      IsViolated: false,
      IsEditting: false,
      IsPastLastWeekEntry: false,
    }

    const fix = async () => {
      let { last: start } = await getToday()
      if (start.get('hour') === 0) {
        start = start.add(8, 'hour')
      }
      const end = start.add(4, 'hour')

      await post({
        ...payload,
        Start: start.toDate(),
        End: end.toDate(),
      })
      refresh()
    }

    refresh()

    return {
      dayHours,
      fix,
      hostUrl,
    }
  },
})
</script>
