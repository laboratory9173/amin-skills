# Pencil MCP 设计系统组合指南

> 本指南帮助您在 `.pen` 文件中使用设计系统组件来构建屏幕和仪表盘。
>
> **验证状态**: ✅ 已验证（2026-03-04）- 所有模式均可正常使用

---

## 1. 常见组件模式

| 组件前缀 | 用途 | 示例 |
|----------|------|------|
| `Button/*` | 按钮变体 | Button/Primary, Button/Secondary |
| `Input/*` 或 `Input Group/*` | 表单输入框 | Input/Text, Input Group/WhiteBackground |
| `Card` | 卡片容器 | Card, Card/WithStrongTitle |
| `Sidebar` | 导航侧边栏 | Sidebar |
| `Table` 或 `Data Table` | 表格元素 | Table, Data Table/Sortable |
| `Alert/*` | 反馈提示框 | Alert/Info, Alert/Warning |
| `Modal/*` 或 `Dialog` | 模态对话框 | Modal/Normal, Dialog/Confirm |

---

## 2. 理解插槽 (Slots)

### 2.1 什么是插槽

插槽是组件内部的**占位符框架**，用于插入子组件。通过 `slot` 属性标识：

```json
{
  "id": "slotId",
  "name": "Content Slot",
  "slot": ["recommendedComponentId1", "recommendedComponentId2"]
}
```

### 2.2 如何使用插槽

**步骤：**
1. 插入父组件并捕获其绑定
2. 使用 `parentBinding/slotId` 路径将子组件插入插槽
3. 优先使用 `slot` 数组中推荐的组件 ID

**示例代码：**
```javascript
// 插入侧边栏组件
sidebar = I(page, {type: "ref", ref: "sidebarComponentId", height: "fill_container"})

// 在插槽中插入子项
item1 = I(sidebar+"/contentSlotId", {type: "ref", ref: "sidebarItemId", descendants: {...}})
item2 = I(sidebar+"/contentSlotId", {type: "ref", ref: "sidebarItemId", descendants: {...}})
```

### 2.3 隐藏不需要的插槽

如果不需要使用某个插槽，将其标记为 `enabled: false`：

```javascript
U(componentInstance+"/unusedSlot", {enabled: false})
```

---

## 3. 图标 (Icons)

### 3.1 可用图标集

| 字体家族 | 风格 | 示例名称 |
|----------|------|----------|
| `lucide` | 轮廓，圆角 | home, settings, user, search, plus, x |
| `feather` | 轮廓，圆角 | home, settings, user, search, plus, x |
| `Material Symbols Outlined` | 轮廓 | home, settings, person, search, add, close |
| `Material Symbols Rounded` | 圆角 | home, settings, person, search, add, close |
| `Material Symbols Sharp` | 尖角 | home, settings, person, search, add, close |

### 3.2 图标用法

**Lucide 图标：**
```javascript
icon = I(container, {
    type: "icon_font",
    iconFontFamily: "lucide",
    iconFontName: "settings",
    width: 24,
    height: 24,
    fill: "$--foreground"
})
```

**Material Symbols Rounded（带字重）：**
```javascript
icon = I(container, {
    type: "icon_font",
    iconFontFamily: "Material Symbols Rounded",
    iconFontName: "dashboard",
    width: 24,
    height: 24,
    fill: "$--foreground",
    weight: 400
})
```

### 3.3 在组件中覆盖图标

通过 `descendants` 属性覆盖组件内的图标：

```javascript
descendants: {
  "iconNodeId": { iconFontName: "settings" }
}
```

### 3.4 常用图标名称对照表

| 动作/含义 | Lucide/Feather | Material Symbols |
|-----------|----------------|------------------|
| 首页 (Home) | `home` | `home` |
| 设置 (Settings) | `settings` | `settings` |
| 用户 (User) | `user` | `person` |
| 搜索 (Search) | `search` | `search` |
| 添加 (Add) | `plus` | `add` |
| 关闭 (Close) | `x` | `close` |
| 编辑 (Edit) | `edit`, `pencil` | `edit` |
| 删除 (Delete) | `trash`, `trash-2` | `delete` |
| 勾选 (Check) | `check` | `check` |
| 右箭头 (Arrow right) | `arrow-right` | `arrow_forward` |
| 下箭头 (Chevron down) | `chevron-down` | `expand_more` |
| 菜单 (Menu) | `menu` | `menu` |
| 仪表盘 (Dashboard) | `layout-dashboard` | `dashboard` |
| 文件夹 (Folder) | `folder` | `folder` |
| 文件 (File) | `file` | `description` |
| 日历 (Calendar) | `calendar` | `calendar_today` |
| 邮件 (Mail) | `mail` | `mail` |
| 铃声/通知 (Bell) | `bell` | `notifications` |

---

## 附录：验证实录

**验证日期**: 2026-03-04

### 验证项目

| 验证项 | 状态 | 说明 |
|--------|------|------|
| 组件命名模式 `Card/*` | ✅ | `Card/WithStrongTitle` (ID: `Ivor1`) 可正常引用 |
| 插槽 (Slots) 使用 | ✅ | 通过 `parentBinding/slotId` 路径可成功插入子组件 |
| 图标 - Lucide | ✅ | `home`, `settings`, `user`, `search` 等图标可用 |
| 图标 - Material Symbols | ✅ | 需添加 `weight: 400` 参数 |

### 验证代码示例

**1. 引用 Card 组件并修改内容**
```javascript
card1 = C("Ivor1", parent, {positionDirection: "bottom", positionPadding: 16})
U(card1 + "/Bkl8x", {children: [{type: "text", content: "测试卡片标题", ...}]})
U(card1 + "/IIROq", {children: [{type: "text", content: "卡片内容", ...}]})
```

**2. 在插槽中插入按钮**
```javascript
btn1 = I(card2 + "/3yEV0", {type: "ref", ref: "5SsNs"})  // Footer 插槽
U(btn1 + "/LyiNK", {content: "查看详情"})
btn2 = I(card2 + "/3yEV0", {type: "ref", ref: "Z75Ms"})
U(btn2 + "/Y0jzM", {content: "编辑"})
```

**3. 图标使用**
```javascript
// Lucide
icon = I(container, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "home", width: 24, height: 24})

// Material Symbols Rounded (需要 weight 参数)
icon = I(container, {type: "icon_font", iconFontFamily: "Material Symbols Rounded", iconFontName: "dashboard", width: 24, height: 24, weight: 400})
```
