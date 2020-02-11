<template>
  <Container>
    <!-- <TimesheetBlock
      v-for="(record, idx) in records"
      :key="record.TimesheetId"
      :record="record"
      :last="idx === records.length - 1"
      @size="blockResize"
      @move="blockMove"
    />-->
  </Container>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import { createComponent, ref, computed, watch } from '@vue/composition-api'
import { useGetters, useState, useMutations, dayjs } from '@u3u/vue-hooks'
import { ITimesheet } from 'types'
import Draggable from 'vuedraggable'
import { UPDATE_TIMESHEET_BLOCK } from '../store/types'

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
  components: { Container, TimesheetBlock, Draggable },
  props: {
    employee: String,
    date: String,
  },
  setup(props) {
    const state = {
      ...useGetters('WeeklyTimesheet', ['getDayTimesheet']),
      ...useState('WeeklyTimesheet', ['employees', 'commit']),
    }

    const dispatch = {
      ...useMutations('WeeklyTimesheet', [UPDATE_TIMESHEET_BLOCK]),
    }

    const { getDayTimesheet, commit } = state
    const { employee, date } = props
    const records = ref<ITimesheet[]>([])

    watch(commit, () => {
      // console.log(commit.value)
      records.value = getDayTimesheet.value(employee, date)
    })

    const blockResize = ({
      id,
      left,
      x,
    }: {
      id: number
      left: boolean
      x: number
    }) => {
      console.log(left, x)
      const { Start, End } = records.value[id]
      const start = dayjs(Start)
      const end = dayjs(End)
      const deltaTime = Math.sign(x) * 15

      const newStart = left ? start.add(deltaTime, 'minute') : start
      const newEnd = left ? end : end.add(deltaTime, 'minute')

      dispatch[UPDATE_TIMESHEET_BLOCK]({
        employee,
        date,
        timesheetId: id,
        start: newStart.toDate().toString(),
        end: newEnd.toDate().toString(),
      })
      // console.log(id, left, x)
    }

    const blockMove = ({ id, dx }: { id: number; dx: number }) => {
      console.log(id, dx)
    }

    return {
      records,
      blockResize,
      blockMove,
    }
  },
})
</script>

<style scoped>
.gauge-container,
.gauge-group {
  width: 100%;
  height: 100%;
}
.gauge-group {
  display: flex;
}
</style>
