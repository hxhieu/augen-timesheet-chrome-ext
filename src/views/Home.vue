<template>
  <Container>
    <Text1>Hour today</Text1>
    <TextHour>{{dayHours}}</TextHour>
    <!-- <TimesheetDayGauge
      v-for="date in weekDays"
      :key="date"
      :date="date"
      :employee="employee"
    />-->
  </Container>
</template>

<script lang="ts">
import { createComponent, ref, computed } from '@vue/composition-api'
import { useHttpClient } from '../compositions/useHttpClient'
import { IChargeSummaryItem, IHttpResponse } from 'types'
import { useState, useActions } from '@u3u/vue-hooks'
import styled from 'vue-styled-components'
import { getWeekDays } from '@/utils'
import dayjs from 'dayjs'

const Container = styled.div`
  text-align: center;
`
const Text1 = styled.div`
  font-size: 4em;
`
const TextHour = styled.div`
  font-size: 8em;
`

const TimesheetDayGauge = () =>
  import(
    /* webpackChunkName: "containers-timesheet-daygauge" */ '@/containers/TimesheetDayGauge.vue'
  )

export default createComponent({
  components: { Container, Text1, TextHour, TimesheetDayGauge },
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

    const { get } = useHttpClient()
    const dayHours = ref(0)
    get({
      employeeID: 'hugh.hoang',
      periodStartDate: dayjs()
        .startOf('week')
        .add(1, 'day')
        .format('MMM DD YYYY'),
      periodEndDate: dayjs()
        .endOf('week')
        .add(1, 'day')
        .format('MMM DD YYYY'),
    }).then(result => {
      const { Charge, NonCharge } = result.data[dayjs().day() - 1]
      dayHours.value = Charge + NonCharge
    })

    return {
      dayHours,
    }
  },
})
</script>
