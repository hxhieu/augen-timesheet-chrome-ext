<template>
  <Container>
    {{ date }}
    {{ employee }}
  </Container>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import { createComponent } from '@vue/composition-api'

const Container = styled.div``

export default createComponent({
  components: { Container },
  props: {
    employee: String,
    date: String,
  },
})
</script>
