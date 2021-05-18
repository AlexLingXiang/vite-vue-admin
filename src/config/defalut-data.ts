let themeColor: any = {
  primary: "#AD49FF",
  success: '#67c23a',
  info: '#909399',
  warning: '#e6a23c',
  danger: '#f56c6c',
}

let Tcolors: any = JSON.parse(window.localStorage.getItem('themeColors') || "{}")
let Lcolors: any = JSON.parse(window.localStorage.getItem('themeLightColors') || "{}")

Object.keys(Tcolors).forEach((item: string) => {
  document.documentElement.style.setProperty(item, Tcolors[item])
  let last = item.lastIndexOf('-')
  themeColor[item.substr(last + 1)] = Tcolors[item]

})

// 设置颜色
Object.keys(Lcolors).forEach((item: string) => {
  document.documentElement.style.setProperty(item, Lcolors[item])
})

const locale: any = window.localStorage.getItem("locale") || 'zh-CN';

export default {
  name: "vite-vue-admin",
  themeColor,
  // icon图标类型
  iconfont: "viteIcon",
  // tagView 显示的属性值 [name,title]
  tabsName: "title",
  // 卡片阴影
  cardShadow: "hover",
  // 默认语言
  locale,
};
