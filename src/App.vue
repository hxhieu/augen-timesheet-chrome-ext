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
import { createComponent, ref, reactive } from '@vue/composition-api'
import { ThemeProvider } from 'vue-styled-components'

const Main = styled.div`
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 300px;
  height: 300px;
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
    const themes = {
      'dark-theme': {
        bg: '#000',
        colour: '#fff',
      },
      'light-theme': {
        bg: '#fff',
        colour: '#333',
      },
    }

    const getTheme = async () =>
      new Promise<'dark-theme' | 'light-theme'>(resolve => {
        chrome.storage.local.get(['theme'], function(result) {
          if (result.key) {
            resolve(result.key)
          } else {
            const defaultTheme = 'light-theme'
            chrome.storage.local.set({ theme: defaultTheme }, function() {
              resolve(defaultTheme)
            })
          }
        })
      })

    // TODO: Hook to the store
    const theme = reactive(themes['dark-theme'])

    getTheme().then((themeName: 'dark-theme' | 'light-theme') => {
      const saved = themes[themeName]
      theme.bg = saved.bg
      theme.colour = saved.colour
    })

    return {
      theme,
    }
  },
})
</script>
