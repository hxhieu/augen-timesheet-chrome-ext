<template>
  <Container :style="containerStyle">
    <Block ref="elem" :style="blockStyle" />
  </Container>
</template>

<script lang="ts">
import styled from 'vue-styled-components'
import interact from 'interactjs'
import { createComponent, ref, computed, onMounted } from '@vue/composition-api'
import { useGetters, useState } from '@u3u/vue-hooks'
import { ITimesheet } from 'types'
import InteractEvent from '@interactjs/core/InteractEvent'
import { ICssStyle } from '@/@types'

const Container = styled.div`
  height: 100%;
  margin: 0 2px;
  border: 1px solid #eee;
`

const Block = styled.div`
  border-radius: 4px;
  height: 100%;
`

const step = 40

export default createComponent({
  components: { Container, Block },
  props: {
    record: Object,
    last: Boolean,
  },
  setup(props) {
    const { last } = props
    const record = props.record as ITimesheet

    const elem = ref<VueComponent>()
    const containerStyle = ref<ICssStyle>({})
    const blockStyle = ref<ICssStyle>({})

    blockStyle.value = {
      width: `${(record.Hours || 0) * step}px`,
      background: record.Colour,
    }

    containerStyle.value = {
      flex: last ? 1 : undefined,
    }

    onMounted(() => {
      const dom = elem.value && elem.value.$el
      const modifiers = interact.modifiers
      if (!dom || !modifiers) {
        return
      }

      const position = { x: 0, y: 0 }
      const snap100x100 = modifiers.snap({
        targets: [interact.snappers.grid({ x: step, y: step })],
        relativePoints: [{ x: 0.5, y: 0.5 }],
      })
      interact(dom)
        .draggable({
          startAxis: 'x',
          lockAxis: 'x',
          modifiers: [
            snap100x100,
            modifiers.restrictRect({
              restriction: 'parent',
              // elementRect: { left: 110, right: 0, top: 1, bottom: 1 },
              endOnly: false,
            }),
          ],
          listeners: {
            move(event: InteractEvent) {
              position.x += event.dx
              position.y += event.dy
              if (position.x < 0) {
                position.x = 0
              }
              event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
            },
          },
        })
        .resizable({
          edges: {
            top: false,
            bottom: false,
            left: true,
            right: true,
          },
          modifiers: [
            snap100x100,
            modifiers.restrictRect({
              restriction: 'parent',
              // elementRect: { left: 110, right: 0, top: 1, bottom: 1 },
              endOnly: false,
            }),
          ],
          listeners: {
            resizemove(event: InteractEvent) {
              console.log(event)
            },
          },
        })
        .on('resizemove', event => {
          console.log(event)
          let { x, y } = event.target.dataset

          x = parseFloat(x) || 0
          y = parseFloat(y) || 0

          Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            //transform: `translate(${event.deltaRect.left}px, ${event.deltaRect.top}px)`,
          })

          Object.assign(event.target.dataset, { x, y })
        })
    })

    return {
      containerStyle,
      blockStyle,
      elem,
    }
  },
})
</script>
