<script setup lang="ts">
import { computed } from 'vue'

type Kind = 'dog' | 'frog' | 'blob' | 'star'
const props = withDefaults(defineProps<{ kind?: Kind; color?: string }>(), {
  kind: 'dog',
  color: undefined,
})

// iOS DoodlePresets.swift stores each inspiration character as normalized
// knots. This helper uses the same Catmull–Rom smoothing to keep those editable
// shapes crisp and close to their original silhouettes on the web.
type Point = readonly [number, number]
function curve(points: Point[], aspect: number, closed = true) {
  const count = points.length
  const fmt = (point: Point) => `${(point[0] * aspect).toFixed(4)} ${(point[1]).toFixed(4)}`
  let path = `M ${fmt(points[0]!)}`
  const segments = closed ? count : count - 1
  const pointAt = (index: number): Point => points[closed ? (index + count) % count : Math.min(count - 1, Math.max(0, index))]!
  for (let i = 0; i < segments; i += 1) {
    const a = pointAt(i - 1), b = pointAt(i), c = pointAt(i + 1), d = pointAt(i + 2)
    const c1: Point = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6]
    const c2: Point = [c[0] - (d[0] - b[0]) / 6, c[1] - (d[1] - b[1]) / 6]
    path += ` C ${fmt(c1)} ${fmt(c2)} ${fmt(c)}`
  }
  return closed ? `${path} Z` : path
}

const dogBody: Point[] = [[.18,.45],[.59,.44],[.64,.36],[.65,.19],[.68,.13],[.72,.18],[.74,.35],[.78,.14],[.81,.13],[.84,.19],[.85,.4],[.96,.45],[.95,.52],[.86,.55],[.85,.81],[.82,.86],[.77,.84],[.76,.64],[.67,.64],[.65,.85],[.61,.86],[.59,.65],[.36,.65],[.34,.85],[.29,.86],[.27,.63],[.22,.6],[.1,.75],[.07,.73],[.12,.57],[.16,.48]]
const greenBody: Point[] = [[.276596,.268617],[.395137,.244681],[.401216,.369681],[.489362,.255319],[.620061,.098404],[.693009,.034574],[.781155,.013298],[.866261,.031915],[.942249,.085106],[.981763,.148936],[.981763,.215426],[.93617,.279255],[.857143,.308511],[.768997,.297872],[.714286,.364362],[.617021,.470745],[.644377,.555851],[.665653,.654255],[.641337,.710106],[.610942,.742021],[.568389,.734043],[.568389,.829787],[.56231,.914894],[.537994,.973404],[.474164,.976064],[.440729,.93617],[.416413,.882979],[.392097,.946809],[.358663,.984043],[.306991,.986702],[.276596,.952128],[.258359,.875],[.267477,.736702],[.273556,.555851],[.273556,.417553]]
const greenHand: Point[] = [[.258359,.223404],[.282675,.162234],[.328267,.143617],[.386018,.159574],[.410334,.202128],[.386018,.25],[.325228,.268617],[.273556,.263298]]
const greenTail: Point[] = [[.264438,.731383],[.158055,.824468],[.036474,.885638],[.015198,.914894],[.045593,.93617],[.139818,.922872],[.258359,.890957]]
const bearBody: Point[] = [[.13,.75],[.12,.53],[.21,.35],[.4,.26],[.47,.16],[.46,.09],[.51,.05],[.58,.11],[.72,.11],[.79,.06],[.85,.09],[.85,.16],[.88,.24],[.96,.26],[.97,.34],[.87,.4],[.81,.42],[.82,.74],[.94,.8],[.93,.88],[.77,.88],[.71,.82],[.63,.83],[.61,.9],[.39,.91],[.34,.86],[.2,.85]]
const birdBody: Point[] = [[.17,.58],[.26,.48],[.45,.35],[.6,.25],[.65,.13],[.73,.09],[.81,.12],[.83,.24],[.85,.41],[.8,.55],[.67,.63],[.42,.65],[.28,.63],[.17,.68],[.13,.64]]
const birdBeak: Point[] = [[.825,.17],[.94,.21],[.83,.27]]
const board: Point[] = [[.3,.79],[.43,.75],[.7,.75],[.81,.79],[.8,.85],[.64,.88],[.36,.88],[.27,.84]]

const aspect = computed(() => props.kind === 'dog' ? 2 : props.kind === 'frog' ? 329 / 376 : 1.15)
const viewBox = computed(() => `0 0 ${aspect.value} 1`)
const outlineWidth = computed(() => props.kind === 'dog' ? .018 : .014)
const coat = computed(() => props.color ?? (props.kind === 'frog' ? '#27b77c' : props.kind === 'blob' ? '#f16c46' : '#fffdf5'))
const dogPath = computed(() => curve(dogBody, aspect.value))
const greenPath = computed(() => curve(greenBody, aspect.value))
const handPath = computed(() => curve(greenHand, aspect.value))
const tailPath = computed(() => curve(greenTail, aspect.value))
const bearPath = computed(() => curve(bearBody, aspect.value))
const birdPath = computed(() => curve(birdBody, aspect.value))
const beakPath = computed(() => curve(birdBeak, aspect.value))
const boardPath = computed(() => curve(board, aspect.value))
</script>

<template>
  <svg :viewBox="viewBox" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    <g stroke="#25291e" :stroke-width="outlineWidth" stroke-linecap="round" stroke-linejoin="round">
      <!-- 长耳犬：iOS 灵感库 longEaredDog -->
      <g v-if="kind === 'dog'">
        <path :d="dogPath" :fill="coat" />
        <circle :cx=".83 * aspect" cy=".435" r=".009" fill="#25291e" stroke="none" />
        <circle :cx=".947 * aspect" cy=".48" r=".015" fill="#25291e" stroke="none" />
      </g>

      <!-- 举手小绿：iOS 灵感库 wavingGreen -->
      <g v-else-if="kind === 'frog'">
        <path :d="tailPath" :fill="coat" />
        <path :d="greenPath" :fill="coat" />
        <path :d="handPath" :fill="coat" />
        <path :d="curve([[.58,.606],[.565,.657],[.568,.739]], aspect, false)" fill="none" />
        <path :d="curve([[.264,.737],[.264,.814],[.258,.875]], aspect, false)" fill="none" />
        <path :d="curve([[.76,.205],[.778,.221],[.815,.229]], aspect, false)" fill="none" :stroke-width=".022" />
        <circle :cx=".802 * aspect" cy=".128" r=".016" fill="#25291e" stroke="none" />
        <circle :cx=".881 * aspect" cy=".17" r=".016" fill="#25291e" stroke="none" />
      </g>

      <!-- 酷酷熊：iOS 灵感库 coolBear -->
      <g v-else-if="kind === 'blob'">
        <path :d="bearPath" :fill="coat" />
        <g v-for="x in [.66, .81]" :key="x">
          <path :d="curve([[x-.055,.23],[x+.055,.23],[x+.04,.285],[x,.3],[x-.04,.28]], aspect)" fill="#fffdf5" />
          <circle :cx="x * aspect" cy=".253" r=".012" fill="#25291e" stroke="none" />
          <path :d="curve([[x-.06,.23],[x+.06,.23]], aspect, false)" fill="none" />
        </g>
        <path :d="curve([[.92,.255],[.96,.26],[.965,.31],[.93,.32],[.91,.29]], aspect)" fill="#25291e" />
        <path :d="curve([[.74,.36],[.84,.35],[.91,.365]], aspect, false)" fill="none" />
        <path :d="curve([[.36,.61],[.46,.57],[.57,.66],[.59,.81],[.5,.83]], aspect, false)" fill="none" />
        <path :d="curve([[.68,.48],[.68,.79],[.76,.82],[.77,.88]], aspect, false)" fill="none" />
        <path v-for="([x,y], i) in [[.26,.45],[.35,.38],[.44,.34],[.5,.43],[.2,.6],[.27,.63],[.36,.69],[.45,.73],[.58,.53],[.75,.51]]" :key="i" :d="curve([[x,y],[x-.015,y+.055]], aspect, false)" fill="none" />
      </g>

      <!-- 滑板鸟：iOS 灵感库 skateboardBird -->
      <g v-else>
        <path :d="birdPath" :fill="coat" />
        <path :d="beakPath" fill="#ffd166" />
        <circle :cx=".76 * aspect" cy=".195" r=".013" fill="#25291e" stroke="none" />
        <path :d="curve([[.57,.29],[.65,.41],[.59,.51],[.44,.55],[.3,.51]], aspect, false)" fill="none" />
        <path :d="boardPath" fill="#fff3d2" />
        <path v-for="x in [.48,.64]" :key="x" :d="curve([[x,.64],[x,.79],[x+.09,.8]], aspect, false)" fill="none" />
        <g v-for="x in [.37,.7]" :key="x">
          <path :d="curve([[x-.03,.89],[x,.875],[x+.03,.89],[x+.03,.92],[x,.94],[x-.03,.92]], aspect)" fill="#fffdf5" />
        </g>
      </g>
    </g>
  </svg>
</template>
