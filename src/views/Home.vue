<template>
  <div class="home">
    {{ state.hello }}
    <el-switch v-model="state.value" active-value="ON" inactive-value="OFF" />
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import { useHttpClient } from '../compositions/useHttpClient'

export default createComponent({
  name: 'Home',
  setup() {
    const state = reactive({
      hello: 'world',
      value: true,
    })

    const { get } = useHttpClient('timesheet')

    const test = get()

    return {
      state,
    }
  },
})
</script>
