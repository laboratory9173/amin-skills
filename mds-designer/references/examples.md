# MDS Designer 实战示例

## 示例：创建律师评价列表页

### 完整操作流程

```javascript
// ========================================
// 步骤 1: 打开组件库文件（使用 skill 目录下的 components.pen）
// ========================================
open_document({"filePathOrTemplate": "./skills/mds-designer/components.pen"})

// ========================================
// 步骤 2: 查看卡片组件结构（关键！）
// ========================================
batch_get({"nodeIds": ["Ivor1"], "readDepth": 3})

// 返回的结构分析：
// - Bkl8x (Title): slot → 用 I() 或 U()
// - urHmR (SubTitleOrXmarkWrap): 非 slot → 只能用 U() 或 R()
// - IIROq (Body): slot → 用 I()
// - 3yEV0 (Footer): slot → 用 I()

// ========================================
// 步骤 3: 批量创建页面（第一批）
// ========================================
batch_design({
  "operations": `
    // 创建页面根节点
    page=I(document, {
      "type": "frame",
      "name": "评价律师列表页",
      "width": 375,
      "height": 896,
      "fill": "#f5f5f5",
      "layout": "vertical",
      "x": -1017,
      "y": -6347
    })

    // 创建顶部栏
    topBar=I(page, {
      "type": "frame",
      "width": "fill_container",
      "height": 56,
      "fill": "#FFFFFF",
      "padding": [0, 16],
      "justifyContent": "space_between",
      "alignItems": "center"
    })

    // 添加页面标题
    titleFrame=I(topBar, {
      "type": "frame",
      "width": "fill_container",
      "height": "fill_container",
      "justifyContent": "center",
      "alignItems": "center"
    })

    pageTitle=I(titleFrame, {
      "type": "text",
      "content": "评价律师",
      "fill": "#000000",
      "fontFamily": "Inter",
      "fontSize": 18,
      "fontWeight": "700"
    })

    // 右侧按钮区
    rightButtons=I(topBar, {
      "type": "frame",
      "width": "fit_content",
      "height": "fill_container",
      "gap": 8,
      "justifyContent": "end",
      "alignItems": "center"
    })

    // 新增按钮 (UDVR3)
    addBtn=I(rightButtons, {"type": "ref", "ref": "UDVR3"})

    // 查询按钮 (D8MKF)
    queryBtn=I(rightButtons, {"type": "ref", "ref": "D8MKF"})

    // 列表内容区
    listContent=I(page, {
      "type": "frame",
      "name": "ListContent",
      "width": "fill_container",
      "height": "fill_container",
      "padding": [8, 16],
      "gap": 12,
      "layout": "vertical"
    })

    // 创建第一个卡片实例
    card1=I(listContent, {"type": "ref", "ref": "Ivor1"})

    // 更新标题 (Bkl8x 是 slot，但需要用 U() 设置 children)
    U(card1+"/Bkl8x", {
      "children": [{
        "type": "text",
        "content": "张律师",
        "fill": "#000000",
        "fontFamily": "Inter",
        "fontSize": 16,
        "fontWeight": "600"
      }]
    })

    // 更新状态标签 (urHmR 不是 slot，用 U() 更新)
    U(card1+"/urHmR", {
      "children": [{
        "type": "text",
        "content": "已评价",
        "fill": "#4CAF50",
        "fontFamily": "Inter",
        "fontSize": 12
      }]
    })
  `
})

// ========================================
// 步骤 4: 添加卡片字段（第二批）
// ========================================
// 注意：使用硬编码的 listContent ID（如果 binding 失效）
batch_design({
  "operations": `
    // 获取第一个卡片的 Body slot
    // card1 的 ID 需要从上一批的返回结果中获取，或使用 snapshot_layout 查看

    // 向 Body 插入字段行
    row1=I("card1-IIROq-ID", {
      "type": "frame",
      "width": "fill_container",
      "height": 28,
      "justifyContent": "space_between",
      "alignItems": "center"
    })

    I(row1, {
      "type": "text",
      "content": "评价得分",
      "fill": "#666666",
      "fontFamily": "Inter",
      "fontSize": 14
    })

    I(row1, {
      "type": "text",
      "content": "4.5分",
      "fill": "#FF9800",
      "fontFamily": "Inter",
      "fontSize": 14,
      "fontWeight": "600"
    })

    // 更多字段行...
  `
})

// ========================================
// 步骤 5: 添加按钮（第三批）
// ========================================
batch_design({
  "operations": `
    // 向 Footer 插入按钮
    I("card1-3yEV0-ID", {
      "type": "ref",
      "ref": "Z75Ms",
      "descendants": {"Y0jzM": {"content": "查看详情"}}
    })

    I("card1-3yEV0-ID", {
      "type": "ref",
      "ref": "5SsNs",
      "descendants": {"LyiNK": {"content": "编辑"}}
    })
  `
})
```

## 常见错误与修正

### 错误 1：尝试用 I() 插入到非 slot 节点
```javascript
// ❌ 错误
I(card+"/urHmR", {"type": "text", "content": "已评价"})
// Error: urHmR is not a slot

// ✅ 正确
U(card+"/urHmR", {
  "children": [{"type": "text", "content": "已评价"}]
})
```

### 错误 2：使用错误的节点路径
```javascript
// ❌ 错误 - 路径不存在
batch_design({
  "descendants": {
    "sDDYA/Title": {...}  // 实际节点 ID 是 Bkl8x
  }
})

// ✅ 正确 - 先用 batch_get 确认路径
batch_get({"nodeIds": ["Ivor1"], "readDepth": 3})
// 然后使用正确的节点 ID
U(card+"/Bkl8x", {...})
```

### 错误 3：批量操作失败后 binding 失效
```javascript
// ❌ 错误 - 第一批失败后，第二批的 card1 binding 失效
batch_design({/* 第一批 - 失败 */})
batch_design({/* 第二批 - 使用 card1，但已失效 */})

// ✅ 正确 - 分批执行，第二批使用硬编码 ID
batch_design({/* 第一批 */})
// 获取实际节点 ID（通过返回结果或 snapshot_layout）
batch_design({
  "operations": `I("实际节点ID", {...})`
})
```

## 实用技巧

### 技巧 1：使用 snapshot_layout 查看节点 ID
```javascript
snapshot_layout({"maxDepth": 2})
// 返回所有节点的布局信息，包括 ID
```

### 技巧 2：查找空白空间
```javascript
find_empty_space_on_canvas({
  "direction": "right",
  "width": 400,
  "height": 900,
  "padding": 100
})
// 返回 {x, y} 坐标，用于放置新页面
```

### 技巧 3：获取截图验证
```javascript
get_screenshot({"nodeId": "页面ID"})
// 返回页面截图，用于验证设计效果
```

## 字段布局模式

### 标准字段行
```javascript
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
      "fontFamily": "Inter",
      "fontSize": 14
    },
    {
      "type": "text",
      "content": "字段值",
      "fill": "#333333",
      "fontFamily": "Inter",
      "fontSize": 14
    }
  ]
}
```

### 高亮字段值（如评分）
```javascript
{
  "type": "text",
  "content": "4.5分",
  "fill": "#FF9800",        // 橙色高亮
  "fontFamily": "Inter",
  "fontSize": 14,
  "fontWeight": "600"       // 加粗
}
```

### 状态标签颜色
```javascript
// 已评价/已完成/成功
{"fill": "#4CAF50"}  // 绿色

// 未评价/待处理
{"fill": "#999999"}  // 灰色

// 紧急/危险
{"fill": "#c90000"}  // 红色

// 警告
{"fill": "#FF9800"}  // 橙色
```
