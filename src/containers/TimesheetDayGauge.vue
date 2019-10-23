<template>
  <Container>
    <TimesheetBlock
      v-for="record in records"
      :key="record.TimesheetId"
      :duration="record.Hours"
    />
  </Container>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import { createComponent, ref, computed } from '@vue/composition-api'
import { useGetters, useState } from '@u3u/vue-hooks'
import { ITimesheet } from 'types'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    20deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 0, 0, 0.05) 100%
  );
  padding: 4px;
`

const TimesheetBlock = () =>
  import(
    /* webpackChunkName: "components-timesheet-block" */ '@/components/TimesheetBlock.vue'
  )

export default createComponent({
  components: { Container, TimesheetBlock },
  props: {
    employee: String,
    date: String,
  },
  setup(props) {
    const state = {
      ...useGetters('WeeklyTimesheet', ['getDayTimesheet']),
      ...useState('WeeklyTimesheet', ['employees']),
    }
    const { getDayTimesheet } = state
    const { employee, date } = props
    const records = computed(() => getDayTimesheet.value(employee, date))

    return {
      records,
    }
  },
})
</script>
