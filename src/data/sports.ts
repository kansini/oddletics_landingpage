import { computed } from 'vue'
import { useSitePreferences } from '../composables/preferences'
const files = ['sprint', 'hurdles', 'long-jump', 'high-jump', 'javelin', 'swimming', 'diving', 'archery', 'triple-jump']
const headings = ['THE CLASSIC SPRINT', 'HURDLE YOUR WAY', 'A LEAP OF WEIRD', 'RAISE THE ODD', 'THROW YOUR SPIRIT', 'MAKE A SPLASH', 'DIVE INTO ODD', 'AIM A LITTLE ODD', 'HOP, STEP, ODD']
const zh = [
  ['100 米', '速度担当', '腿可以乱长，\n终点必须到场。', '一声发令，撒腿就跑。看你亲手画出的选手，在百米跑道上跑出自己的风格。', '田径赛场'],
  ['110 米栏', '跨界选手', '人生有门槛，\n它有大长腿。', '跑起来，跳过去。是丝滑跨栏还是手忙脚乱？每一个栏架，都是新的名场面。', '田径赛场'],
  ['跳远', '起飞预备', '这一跳，\n有点超出想象。', '助跑、起跳、落进沙坑。把天马行空的想象，变成一次认认真真的腾空。', '田径赛场'],
  ['跳高', '向上生长', '长得很随意，\n跳得很努力。', '横杆就在前面。看你的奇怪选手调整姿势，尝试越过新的高度。', '田径赛场'],
  ['标枪', '大力出奇迹', '小小的身体，\n大大的抛物线。', '从助跑到出手，一支标枪划过天空。给你的选手一点信心，看它能投出多远。', '田径赛场'],
  ['自由泳', '浪里小怪', '陆地没跑够，\n水里接着秀。', '换一条泳道，换一种快乐。跳进泳池，让你的涂鸦选手游出自己的节奏。', '水上赛场'],
  ['跳水', '优雅入水', '纵身一跃，\n水花也很有戏。', '站上十米跳台，准备好漂亮的入水姿势。奇怪的体型，也能拥有自己的高光时刻。', '水上赛场'],
  ['射箭', '瞄准快乐', '画风可以偏，\n这一箭要准。', '拉弓、瞄准、放箭。换一种安静又紧张的比赛方式，看看谁能更靠近靶心。', '射箭赛场'],
  ['三级跳远', '连跳三下', '快乐这件事，\n一跳怎么够。', '单足跳、跨步跳，再纵身一跃。三段连起来，把属于它的运动节奏带进沙坑。', '田径赛场'],
]
const en = [
  ['100 m', 'BUILT FOR SPEED', 'The legs are optional.\nThe finish line isn’t.', 'One starting signal. A whole lot of flailing. Watch your original athlete sprint down the track in its very own style.', 'TRACK & FIELD'],
  ['110 m hurdles', 'OVER AND ODD', 'Life has hurdles.\nThis one has legs.', 'Run, jump, repeat. Smooth moves or total chaos? Every hurdle is a chance for a new unforgettable moment.', 'TRACK & FIELD'],
  ['Long jump', 'READY FOR TAKEOFF', 'One small leap.\nOne very big idea.', 'Run up, take off, land in the sand. Turn that wild imagination into a proper moment of flight.', 'TRACK & FIELD'],
  ['High jump', 'ONWARDS & UPWARDS', 'Casually drawn.\nSeriously airborne.', 'The bar is set. Watch your odd little athlete find its form and reach for a new height.', 'TRACK & FIELD'],
  ['Javelin', 'SMALL BUT MIGHTY', 'A little body.\nA big, beautiful arc.', 'From run-up to release, a javelin flies across the sky. Give your athlete a little faith and see how far it goes.', 'TRACK & FIELD'],
  ['Freestyle', 'ODD IN THE WATER', 'Done with the land?\nMake a splash.', 'A different lane. A different kind of joy. Jump into the pool and let your doodle find its own rhythm.', 'AQUATICS'],
  ['Diving', 'MAKE AN ENTRANCE', 'A leap of faith.\nA splash of character.', 'Take your place on the ten-meter platform. Even the oddest bodies deserve a moment in the spotlight.', 'AQUATICS'],
  ['Archery', 'AIM FOR THE FUN', 'The drawing is wild.\nThe aim is steady.', 'Draw the bow, take aim, release. A quieter kind of excitement. See whose arrow gets closest to the center.', 'ARCHERY RANGE'],
  ['Triple jump', 'THREE TIMES THE ODD', 'Why jump once\nwhen you can do three?', 'Hop, step, jump. Three little leaps, one very distinctive rhythm, and a whole sandpit of possibilities.', 'TRACK & FIELD'],
]
export function useSports() {
  const { locale } = useSitePreferences()
  return computed(() => (locale.value === 'zh' ? zh : en).map((row, index) => ({ title: row[0]!, tag: row[1]!, line: row[2]!, text: row[3]!, note: `${row[4]} / 0${index + 1}`, file: files[index]!, en: headings[index]! })))
}
