<template>
  <Container id="app">
    <router-view />
  </Container>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import { createComponent } from '@vue/composition-api'

const Container = styled.div`
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 750px;
  height: 540px;
  overflow: hidden;
  padding: 20px;
`

export default createComponent({
  components: { Container },
})
</script>
