<template>
  <Container>
    <TimesheetBlock
      v-for="(record, idx) in records"
      :key="record.TimesheetId"
      :record="record"
      :last="idx === records.length-1"
    />
    <!-- <Draggable class="gauge-container" v-model="records" v-bind="dragOptions">
      <transition-group type="transition" class="gauge-group">
        
      </transition-group>
    </Draggable>-->
  </Container>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import { createComponent, ref, computed, watch } from '@vue/composition-api'
import { useGetters, useState } from '@u3u/vue-hooks'
import { ITimesheet } from 'types'
import Draggable from 'vuedraggable'

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
      ...useState('WeeklyTimesheet', ['employees']),
    }
    const { getDayTimesheet } = state
    const { employee, date } = props
    const records = ref<ITimesheet[]>([])
    const dragOptions = ref({
      animation: 200,
      group: 'description',
      disabled: false,
      ghostClass: 'ghost',
    })

    watch(
      () => getDayTimesheet,
      () => {
        records.value = getDayTimesheet.value(employee, date)
      },
    )

    return {
      records,
      dragOptions,
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
