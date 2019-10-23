<template>
  <Container>
    {{ records.length }}
  </Container>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import { createComponent, watch, ref } from '@vue/composition-api'
import { useGetters, useState } from '@u3u/vue-hooks'
import { ITimesheet } from 'types'

const Container = styled.div``

export default createComponent({
  components: { Container },
  props: {
    employee: String,
    date: String,
  },
  setup(props) {
    const state = {
      ...useGetters('WeeklyTimesheet', ['getDayTimesheet']),
      ...useState('WeeklyTimesheet', ['employees']),
    }
    const { getDayTimesheet, employees } = state
    const { employee, date } = props
    const records = ref<ITimesheet[]>([])

    watch(
      () => employees,
      () => {
        records.value = getDayTimesheet.value(employee, date)
      },
    )

    return {
      records,
    }
  },
})
</script>
