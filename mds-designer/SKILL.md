---
name: mds-designer
description: 使用 Pencil MCP 基于 components.pen 组件库创建移动端页面原型。当用户需要创建移动端列表页、表单页、详情页等原型设计时，使用此 skill。适用于需要快速生成 .pen 格式的产品原型的场景。
---

# MDS Designer - 移动端设计系统

帮助用户使用 Pencil MCP 基于 components.pen 组件库创建符合设计规范的移动端页面原型。

## 工作流程

### 阶段 1：需求理解

明确以下信息：
1. **页面类型**：列表页、表单页、详情页、弹窗等
2. **页面标题**：显示在顶部导航栏的标题
3. **数据字段**：每个列表项/表单需要展示的字段
4. **操作按钮**：新增、查询、编辑、删除等
5. **状态标识**：是否需要状态标签（已评价/未评价、已完成/进行中）

### 阶段 2：组件分析（关键步骤）

**必须执行**：使用 `batch_get` 查看 skill 目录下 `components.pen` 中的组件结构。

```javascript
// 查看所有可复用组件
batch_get({"patterns": [{"reusable": true}], "readDepth": 2})

// 查看具体组件结构（确认 slot 节点）
batch_get({"nodeIds": ["组件ID"], "readDepth": 3})
```

**区分 slot 和非 slot 节点**：
- `slot: []` → 可以用 `I()` 插入内容
- 无 slot 标记 → 需要用 `U()` 或 `R()` 修改

### 阶段 3：页面创建

#### Pencil MCP 操作规则

| 操作 | 适用场景 | 示例 |
|------|---------|------|
| `I(parent, {...})` | 向 slot 节点插入内容 | `I(card+"/IIROq", {字段行})` |
| `U(path, {...})` | 更新 slot/非 slot 属性 | `U(card+"/Bkl8x", {children: [...]})` |
| `R(path, {...})` | 替换非 slot 节点 | `R(card+"/urHmR", {新节点})` |

#### 关键注意事项

**1. 路径准确性**
- 不要猜测节点路径
- 先用 `batch_get` 确认准确结构
- 实例节点路径格式：`实例ID/节点ID`（如 `DN5EW/Bkl8x`）

**2. Slot vs 非 Slot**
```javascript
// ✅ 正确：IIROq 是 slot，用 I() 插入
row = I(card+"/IIROq", {"type": "frame", ...})

// ❌ 错误：urHmR 不是 slot，不能用 I()
// 应该用 U() 更新 children
U(card+"/urHmR", {
  "children": [{"type": "text", "content": "已评价"}]
})
```

**3. 分批执行**
- 如果 `batch_design` 中一个操作失败，所有 binding 都会失效
- 建议分批执行，每批不超过 25 个操作
- 后续批次使用硬编码的节点 ID（如 `"mZMtZ"`）

### 阶段 4：常用组件

#### 页面模板
- **ListPageTamplate** (HZRNl) - 完整列表页框架
- **FormPageTamplate** (VXOQo) - 表单页框架

#### 卡片组件
- **Card/WithStrongTitle** (Ivor1) - 带强标题的卡片（蓝色标题栏）
  - `Bkl8x` (Title, slot) - 卡片标题
  - `urHmR` (SubTitleOrXmarkWrap) - 右上角状态/关闭按钮
  - `IIROq` (Body, slot) - 卡片内容区
  - `3yEV0` (Footer, slot) - 底部按钮区
- **Card/WithStatus** (Djj6B) - 带状态标签的卡片
- **Card** (BaQ2z) - 基础卡片

#### 按钮组件
- **PageTopButton/AddButton** (UDVR3) - 顶部新增按钮
- **PageTopButton/QueryButton** (D8MKF) - 顶部查询/筛选按钮
- **PageTopButton/Primay** (AvivU) - 主要操作按钮
- **PageTopButton/Other** (LXEC6) - 次要操作按钮
- **CardOperateButton/Primary** (Z75Ms) - 卡片主按钮（蓝色）
- **CardOperateButton/Other** (5SsNs) - 卡片次按钮（浅蓝）
- **CardOperateButton/Delete** (gh4Bo) - 删除按钮（红色）

#### 表单组件
- **Input Group/WhiteBackground** (wPg1c) - 白色背景输入组
- **Input Group/TransparentBackground** (rzKOE) - 透明背景输入组
- **Textarea Group** (7VyLn) - 文本域
- **FormDropdownSelect** (RwZV0) - 下拉选择器
- **FormTagButton/Selected** (LqjxM) - 选中标签
- **FormTagButton/Unselected** (gMIcw) - 未选中标签

#### 状态标签
- **StatusCardTag/Succeed** (FTfxp) - 成功/良好（绿色）
- **StatusCardTag/Danger** (YBKSY) - 紧急/危险（红色）
- **StatusCardTag/Primary** (rA6yl) - 重点（蓝色）
- **StatusCardTag/Warning** (YIDmz) - 警告（黄色）

#### 其他组件
- **Modal/Normal** (n3jEk) - 普通弹窗
- **Modal** (fJB6N) - 带阴影弹窗
- **Tabs** (GLdri) - 标签栏
- **Tab Item/Active** (MaKqr) - 激活标签
- **Tab Item/Inactive** (jSz81) - 未激活标签
- **SwitchButton/Selected** (sMryI) - 选中切换按钮
- **SwitchButton/Unselected** (ZYb1k) - 未选中切换按钮

### 阶段 4.5：图标使用指南（重要）

**可用图标集**：

| 字体家族 | 风格 | 常用图标名 |
|----------|------|------------|
| `lucide` | 轮廓圆角 | `home`, `settings`, `user`, `search`, `plus`, `x`, `chevron-down`, `bell`, `mail` |
| `Material Symbols Rounded` | 圆角 | `home`, `settings`, `person`, `search`, `add`, `close`, `expand_more`, `dashboard` |

**图标用法**：

```javascript
// Lucide 图标（无需 weight 参数）
icon = I(container, {
    type: "icon_font",
    iconFontFamily: "lucide",
    iconFontName: "settings",
    width: 24,
    height: 24,
    fill: "#333333"
})

// Material Symbols Rounded（需要 weight 参数）
icon = I(container, {
    type: "icon_font",
    iconFontFamily: "Material Symbols Rounded",
    iconFontName: "dashboard",
    width: 24,
    height: 24,
    fill: "#333333",
    weight: 400  // 必须添加字重参数
})
```

**在组件中覆盖图标**：

当组件包含图标时，通过 `descendants` 属性覆盖：

```javascript
descendants: {
  "iconNodeId": { iconFontName: "settings", iconFontFamily: "lucide" }
}
```

**常用图标对照表**：

| 含义 | Lucide | Material Symbols |
|------|--------|------------------|
| 首页 | `home` | `home` |
| 设置 | `settings` | `settings` |
| 用户 | `user` | `person` |
| 搜索 | `search` | `search` |
| 添加 | `plus` | `add` |
| 关闭 | `x` | `close` |
| 编辑 | `edit` | `edit` |
| 删除 | `trash` | `delete` |
| 下箭头 | `chevron-down` | `expand_more` |
| 菜单 | `menu` | `menu` |

---

### 阶段 5：样式规范

```javascript
// 页面标准
{
  "width": 375,           // 移动端标准宽度
  "height": 896,          // 页面高度
  "fill": "#f5f5f5",      // 页面背景色
  "layout": "vertical"    // 垂直布局
}

// 顶部栏
{
  "height": 56,
  "fill": "#FFFFFF",
  "padding": [0, 16]
}

// 卡片
{
  "cornerRadius": 8,
  "fill": "#FFFFFF"
}

// 字体
{
  "fontFamily": "Inter",
  "fontSize": 16,         // 标题
  "fontSize": 14,         // 正文
  "fontWeight": "600",    // 粗体
  "fontWeight": "normal"  // 常规
}

// 颜色
{
  "primary": "#0061ca",      // 主色调
  "destructive": "#c90000",  // 删除/危险
  "success": "#4CAF50",      // 成功
  "warning": "#FF9800",      // 警告
  "textPrimary": "#333333",  // 主文字
  "textSecondary": "#666666",// 次文字
  "textMuted": "#999999"     // 弱化文字
}
```

### 阶段 6：卡片字段布局标准

每个字段一行，左右对齐：

```javascript
// 字段行结构
{
  "type": "frame",
  "width": "fill_container",
  "height": 28,
  "justifyContent": "space_between",
  "alignItems": "center",
  "children": [
    {
      "type": "text",
      "content": "字段标签",
      "fill": "#666666",
      "fontSize": 14
    },
    {
      "type": "text",
      "content": "字段值",
      "fill": "#333333",
      "fontSize": 14
    }
  ]
}
```

## 示例：创建律师评价列表页

```javascript
// 1. 打开组件库文件（使用 skill 目录下的 components.pen）
open_document({"filePathOrTemplate": "./skills/mds-designer/components.pen"})

// 2. 查看卡片组件结构（确认 slot 节点）
batch_get({"nodeIds": ["Ivor1"], "readDepth": 3})

// 3. 创建页面框架
page = I(document, {
  "type": "frame",
  "name": "评价律师列表页",
  "width": 375,
  "height": 896,
  "fill": "#f5f5f5",
  "layout": "vertical"
})

// 4. 创建顶部栏
topBar = I(page, {
  "type": "frame",
  "width": "fill_container",
  "height": 56,
  "fill": "#FFFFFF",
  "justifyContent": "space_between"
})

// 5. 添加标题
U(topBar+"/title", {"children": [{"content": "评价律师"}]})

// 6. 添加按钮
I(topBar, {"type": "ref", "ref": "UDVR3"}) // 新增
I(topBar, {"type": "ref", "ref": "D8MKF"}) // 查询

// 7. 创建列表内容区
listContent = I(page, {
  "type": "frame",
  "width": "fill_container",
  "height": "fill_container",
  "padding": [8, 16],
  "gap": 12,
  "layout": "vertical"
})

// 8. 创建卡片实例
card = I(listContent, {"type": "ref", "ref": "Ivor1"})

// 9. 填充卡片内容（注意 slot 和非 slot 的区别）
U(card+"/Bkl8x", {"children": [{"content": "张律师"}]})
U(card+"/urHmR", {"children": [{"content": "已评价", "fill": "#4CAF50"}]})

// Body 是 slot，用 I() 插入字段
row1 = I(card+"/IIROq", {
  "type": "frame",
  "justifyContent": "space_between",
  "children": [
    {"type": "text", "content": "评价得分", "fill": "#666666"},
    {"type": "text", "content": "4.5分", "fill": "#FF9800", "fontWeight": "600"}
  ]
})
// ... 更多字段

// Footer 是 slot，用 I() 插入按钮
I(card+"/3yEV0", {"type": "ref", "ref": "Z75Ms", "descendants": {"Y0jzM": {"content": "查看详情"}}})
```

## 常见问题与解决方案

### Q1: 组件实例创建后无法修改内容？
**A**: 确认你要修改的节点是 slot 还是非 slot：
- Slot → 使用 `I(实例ID/节点ID, {...})`
- 非 Slot → 使用 `U(实例ID/节点ID, {children: [...]})`

### Q2: batch_design 操作失败导致后续操作无法执行？
**A**:
- 分批执行操作，每批不超过 25 个
- 如果 binding 失效，后续批次使用硬编码的节点 ID

### Q3: 如何查看组件内部结构？
**A**:
```javascript
// 查看组件详情
batch_get({"nodeIds": ["组件ID"], "readDepth": 3})

// 重点关注是否有 "slot": [] 标记
```

### Q4: 页面保存到哪里？
**A**:
- 新页面默认添加到当前打开的 .pen 文件中
- 使用编辑器菜单 File → Save As 另存为新文件
- 或通过 MCP 工具的保存功能导出

## 附录 A：核心概念速查

### A1. 组件命名模式

| 前缀 | 用途 | 示例 |
|------|------|------|
| `Button/*` | 按钮变体 | `Button/Primary` |
| `Input/*` 或 `Input Group/*` | 表单输入框 | `Input Group/WhiteBackground` |
| `Card` | 卡片容器 | `Card`, `Card/WithStrongTitle` |
| `Sidebar` | 导航侧边栏 | `Sidebar` |
| `Table` 或 `Data Table` | 表格元素 | `Table/Sortable` |
| `Alert/*` | 反馈提示框 | `Alert/Info`, `Alert/Warning` |
| `Modal/*` 或 `Dialog` | 模态对话框 | `Modal/Normal`, `Dialog/Confirm` |

### A2. 理解插槽 (Slots)

**什么是插槽**：插槽是组件内部的**占位符框架**，用于插入子组件。

**识别插槽**：寻找带有 `slot` 属性的框架：
```json
{
  "id": "slotId",
  "name": "Content Slot",
  "slot": ["recommendedComponentId1", "recommendedComponentId2"]
}
```

**使用插槽**：
```javascript
// 1. 插入父组件并捕获绑定
sidebar = I(page, {type: "ref", ref: "sidebarComponentId", height: "fill_container"})

// 2. 使用 parentBinding/slotId 路径插入子组件
item1 = I(sidebar+"/contentSlotId", {type: "ref", ref: "sidebarItemId", descendants: {...}})
item2 = I(sidebar+"/contentSlotId", {type: "ref", ref: "sidebarItemId", descendants: {...}})
```

**隐藏不需要的插槽**：
```javascript
U(componentInstance+"/unusedSlot", {enabled: false})
```

### A3. 操作符速查

| 操作 | 适用场景 | 示例 |
|------|---------|------|
| `I(parent, {...})` | 向 **slot** 节点插入内容 | `I(card+"/IIROq", {字段行})` |
| `U(path, {...})` | 更新属性（slot/非 slot） | `U(card+"/Bkl8x", {children: [...]})` |
| `R(path, {...})` | 替换非 slot 节点 | `R(card+"/urHmR", {新节点})` |
| `C(nodeId, parent, {...})` | 复制已有组件 | `C("Ivor1", page, {...})` |

### A4. 批次执行最佳实践

- 每批不超过 **25 个操作**
- 后续批次使用**硬编码节点 ID**（binding 可能失效）
- 如果操作失败，所有绑定会回滚

---

## 附录 B：验证记录

**验证日期**: 2026-03-04

| 验证项 | 状态 | 说明 |
|--------|------|------|
| 组件命名模式 `Card/*` | ✅ | `Card/WithStrongTitle` (ID: `Ivor1`) 可正常引用 |
| 插槽 (Slots) 使用 | ✅ | 通过 `parentBinding/slotId` 路径可成功插入子组件 |
| 图标 - Lucide | ✅ | `home`, `settings`, `user`, `search` 等图标可用 |
| 图标 - Material Symbols | ✅ | 需添加 `weight: 400` 参数 |

---

## 参考资料

- 组件库文件：`./skills/mds-designer/components.pen`
- Pencil MCP 指南： `./skills/mds-designer/Pencil MCP 指南.md`
- 本项目 Skill 目录：`./skills/mds-designer/`
