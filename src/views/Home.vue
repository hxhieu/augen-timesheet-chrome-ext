<template>
  <div class="home">
    {{ state.hello }}
    <el-switch v-model="state.value"> </el-switch>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'

export default createComponent({
  name: 'Home',
  setup() {
    const state = reactive({
      hello: 'world',
      value: true,
    })

    return {
      state,
    }
  },
})
</script>
