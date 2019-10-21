<template>
  <Container>
    <!-- <SummaryList>
      <SummaryItem v-for="item in summary" :key="item.WeekDay">{{
        item.Charge
      }}</SummaryItem>
    </SummaryList> -->
    <apexchart
      width="100%"
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
    const options = ref({
      colors: ['rgb(5, 124, 0)', 'rgb(253, 1, 0)'],
      chart: {
        id: 'summary-chart',
        stacked: true,
        toolbar: {
          show: false,
        },
        events: {
          click: (event: any, chartContext: any, config: any) => {
            console.log(config.dataPointIndex)
          },
        },
      },
      // yaxis: {
      //   tickAmount: 20,
      // },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
    })
    const series = ref([
      {
        name: 'N/C',
        data: [],
      },
      {
        name: 'Charge',
        data: [],
      },
    ])
    const { get } = useHttpClient()
    const { employee } = useState('Shell', ['employee'])

    const start = moment()
      .startOf('isoWeek')
      .subtract(7, 'd')
    const periodStartDate = `Mon ${start.format('DD MMM YYYY')}`
    const end = start.add(6, 'd')
    const periodEndDate = `Sun ${end.format('DD MMM YYYY')}`

    watch(async () => {
      const items = await get({
        employeeID: employee.value,
        periodStartDate,
        periodEndDate,
      })
      series.value = [
        {
          name: 'N/C',
          data: items.data.map((x: IChargeSummaryItem) => x.NonCharge),
        },
        {
          name: 'Charge',
          data: items.data.map((x: IChargeSummaryItem) => x.Charge),
        },
      ]
      // series.value[0].data = items.data.map(
      //   (x: IChargeSummaryItem) => x.NonCharge,
      // )
      // series.value[1].data = items.data.map((x: IChargeSummaryItem) => x.Charge)
      // console.log(series.value)
    })

    return {
      options,
      series,
    }
  },
})
</script>
