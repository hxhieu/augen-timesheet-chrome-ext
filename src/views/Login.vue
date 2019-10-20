<template>
  <Container>
    <HelpText>{{ helpText }}</HelpText>
    <p v-if="!isChecking">
      Go to <a :href="`${hostUrl}/Timesheet2`" target="_blank">Timesheet</a> and
      login first
    </p>
  </Container>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import { createComponent, ref } from '@vue/composition-api'
import { useState, useRouter } from '@u3u/vue-hooks'
import { useHttpClient } from '@/compositions/useHttpClient'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const HelpText = styled.label`
  margin: 0;
  padding: 0;
  font-size: 2em;
  font-weight: bold;
`

export default createComponent({
  components: { Container, HelpText },
  setup() {
    const helpText = ref('Checking your login...')
    const isChecking = ref(true)

    const hostUrl = ref(process.env.VUE_APP_HOST_URL)
    const cookieName = process.env.VUE_APP_HOST_COOKIE || 'ASP.NET_SessionId'

    const { router } = useRouter()
    const { loggedIn } = useState('Shell', ['loggedIn'])

    if (loggedIn.value) {
      router.push('/home')
    } else {
      // Check if the .NET auth cookie is available
      chrome.cookies.get(
        {
          name: cookieName,
          url: hostUrl.value,
        },
        (cookie: chrome.cookies.Cookie | null) => {
          // Yes, go to home screen
          if (cookie && cookie.value) {
            router.push('/home')
          } else {
            helpText.value = 'You are not logged in'
            isChecking.value = false
          }
        },
      )
    }

    return {
      helpText,
      isChecking,
      hostUrl,
    }
  },
})
</script>
