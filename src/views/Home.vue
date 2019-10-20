<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import { useHttpClient } from '../compositions/useHttpClient'
import { IHttpResponse } from '@/types'

export default createComponent({
  name: 'Home',
})
</script>
