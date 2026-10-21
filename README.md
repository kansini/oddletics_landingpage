# 怪运会 · Oddletics

怪运会宣传落地页，基于现有 Vue 3 + TypeScript + Vite 项目，使用 GSAP、ScrollTrigger 和 SCSS。插画与运动图标均保存在项目内，无外部字体或图片依赖。

## 本地运行

需要 Node.js **20.19+ 或 22.12+**（当前 Vite 版本要求）。

```sh
yarn install
yarn dev
```

```sh
yarn build    # Vue / TypeScript 类型检查及生产构建，输出 dist/
yarn preview  # 预览生产产物
```

## 下载地址

页面已内置 App Store、鸿蒙应用市场及 Android APK 三个下载入口。商店按钮在新标签页打开；Android 按钮直接下载同站点的 `public/oddletics_v_1.6.1.apk`，文件会随 Vite 构建复制到 `dist/`。更新 APK 时，同时修改 `src/data/downloads.ts` 中的 `androidRelease` 文件名和版本。若商店链接有变，可将 `.env.example` 复制为 `.env.local` 并设置覆盖地址：

```dotenv
VITE_APP_STORE_URL=https://apps.apple.com/app/id6813016522
VITE_HARMONY_STORE_URL=https://url.cloud.huawei.com/CvXmvSdAXe
```

环境变量只接受 HTTPS 链接，在构建时读取；更新后请重启开发服务器或重新构建。

仅首屏 Hero 根据浏览器的系统信息显示下载入口：iOS、iPadOS 和 macOS 显示 App Store；明确标识为 HarmonyOS / OpenHarmony 的设备显示鸿蒙应用市场；Windows 和 Android 显示 Android APK 下载按钮；无法识别的系统显示全部三个入口。仅有华为品牌或 ArkWeb 内核标识时，不将设备直接判定为鸿蒙。底部下载区始终保留三个按钮。

## 页面内容

- 以 App 首页暖黄、炭黑、奶油白为主的视觉风格。
- 浅色 / 深色模式，中 / EN 全站切换，使用本地存储保存偏好；首次访问跟随系统主题。
- 玩法介绍、9 个运动项目切换、本地多人介绍、常见问题和三平台下载入口。
- 支持鼠标与触屏的 SVG 体验画板：四种画笔颜色、撤销、清空、灵感选手和迷你百米赛。
- 迷你比赛仅为演示，名次随机，不调用游戏服务或 AI。
- GSAP 入场、选手弹跳和滚动动效；尊重系统减少动态效果设置。
- 响应式导航、键盘项目切换、弹窗焦点管理和动态比赛状态提示。

## 主要文件

- `src/App.vue`：页面布局和交互编排。
- `src/style.scss`：响应式样式与主题变量。
- `src/composables/preferences.ts`：主题、语言与本地偏好。
- `src/data/messages.ts`：中英文文案。
- `src/data/sports.ts`：中英文运动项目资料。
- `src/data/downloads.ts`：商店链接配置读取。
- `src/components/DownloadBadge.vue`：商店跳转和 Android APK 下载按钮。
- `src/components/DrawingDemo.vue`：涂鸦画室与比赛演示。
- `src/components/HeroTrack.vue`：首页 SVG 手绘赛场。
- `public/sports/`：来自现有游戏资源的 9 个项目插画。
- `public/app-icon.png`：跑步涂鸦图标，供浏览器与 iOS 主屏图标使用。
