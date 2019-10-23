<template>
  <ThemeProvider :theme="theme">
    <TopBar />
    <Main>
      <router-view />
    </Main>
  </ThemeProvider>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import Cookies from 'js-cookie'
import { createComponent, reactive } from '@vue/composition-api'
import { ThemeProvider } from 'vue-styled-components'

const Main = styled.div`
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
  components: { ThemeProvider, Main, TopBar },
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
