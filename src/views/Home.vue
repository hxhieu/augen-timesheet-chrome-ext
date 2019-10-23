<template>
  <Container>
    <TimesheetDayGauge
      v-for="date in weekDays"
      :key="date"
      :date="date"
      :employee="employee"
    />
  </Container>
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'
import { useHttpClient } from '../compositions/useHttpClient'
import { IChargeSummaryItem, IHttpResponse } from 'types'
import { useState, useActions } from '@u3u/vue-hooks'
import moment from 'moment'
import styled from 'vue-styled-components'
import { getWeekDays } from '@/utils'

const Container = styled.div``

const TimesheetDayGauge = () =>
  import(
    /* webpackChunkName: "containers-timesheet-daygauge" */ '@/containers/TimesheetDayGauge.vue'
  )

export default createComponent({
  components: { Container, TimesheetDayGauge },
  setup() {
    const weekDays = ref<string[]>([])
    const state = {
      ...useState('Shell', ['employee']),
      ...useState('WeeklyTimesheet', ['weekStart']),
    }
    const { weekStart, employee } = state

    const actions = {
      ...useActions('WeeklyTimesheet', ['fetchEmployeeWeekly']),
    }
    const { fetchEmployeeWeekly } = actions
    fetchEmployeeWeekly(employee.value)

    watch(weekStart, () => {
      weekDays.value = getWeekDays(weekStart.value)
    })

    return {
      weekDays,
      employee,
    }
  },
})
</script>
