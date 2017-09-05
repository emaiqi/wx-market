## 营销组件

营销组件， WeChat marketing components.


## 支持营销类型

- 大转盘（Rotate）
- 刮刮乐 (scratch ticket)
- 老虎机	（slot machine）
- 跑马灯 （marquee）
- 九宫格翻纸牌 (grid card)

## 如何使用

1.拉取仓库

```
git clone git@github.com:pfan123/wx-market.git
```

2.查看组件文件

- 大转盘（Rotate）: `/pages/rotate/utils/`
- 刮刮乐 (scratch ticket) : `/pages/scratch/utils/`
- 老虎机	（slot machine） : `/pages/slotmachine/utils/`
- 跑马灯 （marquee）: `/pages/marquee/utils/`
- 九宫格翻纸牌 (grid card): `/pages/gridcard/utils/`

3.使用引入方式

拷贝所需组件，到小程序目录pages路由目录

➀使用大转盘

- WXSS中引用样式：`@import './utils/dial.wxss'`

- WXML中引用结构：`<import src="./utils/dial.wxml"/>`

- JS中引用wemark：`import Dial from './utils/dial.js'`

➁使用刮刮乐

- WXML中引用结构：`<import src="./utils/scratch.wxml"/>`

- JS中引用wemark：`import Scratch from './utils/scratch.js'`

➂使用老虎机

- WXSS中引用样式：`@import './utils/machine.wxss'`

- WXML中引用结构：`<import src="./utils/machine.wxml"/>`

- JS中引用wemark：`import Machine from './utils/machine.js'`

➃使用跑马灯

- WXSS中引用样式：`@import './utils/marquee.wxss'`

- WXML中引用结构：`<import src="./utils/marquee.wxml"/>`

- JS中引用wemark：`import Marquee from './utils/marquee.js'`

➄使用九宫格翻纸牌

- WXSS中引用样式：`@import './utils/card.wxss'`

- WXML中引用结构：`<import src="./utils/card.wxml"/>`

- JS中引用wemark：`import Card from './utils/card.js'`

## 开源协议

MIT