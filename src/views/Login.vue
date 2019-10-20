<template>
  <Container>
    <HelpText>{{ helpText }}</HelpText>
    <p v-if="!isChecking">Go to Timesheet and login first</p>
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
    const { router } = useRouter()

    const { loggedIn } = useState('Shell', ['loggedIn'])
    if (loggedIn.value) {
      router.push('/home')
    } else {
      const { get } = useHttpClient()
      const loginResult = get({
        employeeID: 'aaa',
      })
    }

    return {
      helpText,
      isChecking,
    }
  },
})
</script>
