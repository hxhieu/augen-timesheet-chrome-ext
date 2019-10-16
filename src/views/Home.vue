<template>
  <div class="home">
    {{ state.hello }}
    <el-button @click="tryFetch()">Click</el-button>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import { useHttpClient } from '../compositions/useHttpClient'
import { IHttpResponse } from '@/types'

export default createComponent({
  name: 'Home',
  setup() {
    const state = reactive({
      hello: 'world as iit',
      value: true,
    })

    const { get } = useHttpClient('timesheet')

    return {
      state,
      tryFetch: async () => {
        const test = await get({
          login: 'hugh.hoang',
          date: '01-10-2019',
        })
        console.log(test.data)
      },
    }
  },
})
</script>
