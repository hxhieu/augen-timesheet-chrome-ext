<template>
  <ThemeProvider :theme="theme">
    <TopBar />
    <Container id="app">
      <router-view />
    </Container>
  </ThemeProvider>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import Cookies from 'js-cookie'
import { createComponent, reactive } from '@vue/composition-api'
import { ThemeProvider } from 'vue-styled-components'

const Container = styled.div`
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 750px;
  height: 500px;
  overflow: hidden;
  background: ${(props: any) => props.theme.bg};
  color: ${(props: any) => props.theme.colour};
  padding: 20px;
`

const TopBar = () =>
  import(/* webpackChunkName: "containers-top-bar" */ './containers/TopBar.vue')

export default createComponent({
  components: { ThemeProvider, Container, TopBar },
  setup() {
    // TODO: Hook to the store
    const theme = reactive({
      bg: '#fff',
      colour: '#333',
    })

    return {
      theme,
    }
  },
})
</script>
