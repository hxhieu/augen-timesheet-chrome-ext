<template>
  <Container :style="{ width, background }"></Container>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import { createComponent, ref, computed } from '@vue/composition-api'
import { useGetters, useState } from '@u3u/vue-hooks'
import { ITimesheet } from 'types'
import randomColour from 'randomcolor'

const Container = styled.div`
  background: #0aa;
  height: 100%;
  margin: 0 2px;
  border-radius: 4px;
`

export default createComponent({
  components: { Container },
  props: {
    duration: Number,
  },
  setup(props) {
    const { duration } = props
    const width = computed(() => `${(duration || 0) * 40}px`)
    const background = ref(randomColour())

    return {
      width,
      background,
    }
  },
})
</script>
