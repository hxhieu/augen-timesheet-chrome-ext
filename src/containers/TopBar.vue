<template>
  <Container>
    <Title>Let's Timesheet</Title>
  </Container>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import { createComponent } from '@vue/composition-api'

const Container = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  border-bottom: 1px solid #dedede;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
`

const Title = styled.label`
  margin: 0;
  padding: 0;
  font-size: 1.5em;
`

export default createComponent({
  components: { Container, Title },
})
</script>
