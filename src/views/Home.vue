<template>
  <Container>
    <!-- <SummaryList>
      <SummaryItem v-for="item in summary" :key="item.WeekDay">{{
        item.Charge
      }}</SummaryItem>
    </SummaryList> -->
    <apexchart
      width="500"
      type="bar"
      :options="options"
      :series="series"
    ></apexchart>
  </Container>
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'
import { useHttpClient } from '../compositions/useHttpClient'
import { IChargeSummaryItem, IHttpResponse } from 'types'
import { useState } from '@u3u/vue-hooks'
import moment from 'moment'
import styled from 'vue-styled-components'

const Container = styled.div``
const SummaryList = styled.div``
const SummaryItem = styled.div``

export default createComponent({
  name: 'Home',
  components: { Container, SummaryList, SummaryItem },
  setup() {
    const summary = ref<IChargeSummaryItem>([])
    const options = ref({
      chart: {
        id: 'vuechart-example',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    })
    const { get } = useHttpClient()
    const { employee } = useState('Shell', ['employee'])

    const start = moment().startOf('isoWeek')
    const end = start.add(7, 'd')

    watch(async () => {
      const items = await get({
        employeeID: employee.value,
        periodStartDate: start.format('DD-MM-YYYY'),
        periodEndDate: end.format('DD-MM-YYYY'),
      })

      summary.value = items.data
    })

    return {
      summary,
    }
  },
})
</script>
