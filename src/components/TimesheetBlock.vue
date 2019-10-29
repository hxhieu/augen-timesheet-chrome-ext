<template>
  <Container ref="elem" :style="{ width, background }"></Container>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import { createComponent, ref, computed, onMounted } from '@vue/composition-api'
import { useGetters, useState } from '@u3u/vue-hooks'
import { ITimesheet } from 'types'

const Container = styled.div`
  background: #0aa;
  height: 100%;
  margin: 0 2px;
  border-radius: 4px;
`

export default createComponent({
  components: { Container },
  props: {
    record: Object,
  },
  setup(props) {
    const record = props.record as ITimesheet
    const width = computed(() => `${(record.Hours || 0) * 40}px`)
    const background = ref(record.Colour)
    const elem = ref(null)

    onMounted(() => {
      console.log(elem.value)
    })

    return {
      width,
      background,
      elem,
    }
  },
})
</script>
