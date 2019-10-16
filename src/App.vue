<template>
  <ThemeProvider :theme="theme">
    <Container id="app">
      <h1>HELLO WORLD</h1>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-view />
    </Container>
  </ThemeProvider>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import { createComponent, reactive } from '@vue/composition-api'
import { ThemeProvider } from 'vue-styled-components'

const Container = styled.div`
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 750px;
  height: 540px;
  overflow: hidden;
  padding: 20px;
  background: ${(props: any) => props.theme.bg};
  color: ${(props: any) => props.theme.colour};
`

export default createComponent({
  components: { ThemeProvider, Container },
  setup() {
    // TODO: Hook to the store
    const theme = reactive({
      bg: '#f0f0f0',
      colour: '#333',
    })

    return {
      theme,
    }
  },
})
</script>
