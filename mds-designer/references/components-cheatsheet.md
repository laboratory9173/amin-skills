# MDS 组件速查表

## 快速定位

### 页面模板
| 组件名 | ID | 用途 |
|--------|-----|------|
| ListPageTamplate | HZRNl | 列表查询页完整框架 |
| FormPageTamplate | VXOQo | 表单输入/详情页框架 |

### 卡片组件
| 组件名 | ID | 用途 | Slot 节点 |
|--------|-----|------|-----------|
| Card/WithStrongTitle | Ivor1 | 强标题卡片 | Bkl8x(Title), IIROq(Body), 3yEV0(Footer) |
| Card/WithStatus | Djj6B | 带状态角标卡片 | 同上 |
| Card | BaQ2z | 基础卡片 | kisox(Header), 0HKDs(Body), GictY(Footer) |
| Card/Blanck | ZU1AZ | 空白卡片 | 整个都是 slot |
| Card/InfoList | 0N40C | 信息列表卡片 | Lgnnn(List) |

### 按钮组件
| 组件名 | ID | 用途 |
|--------|-----|------|
| PageTopButton/AddButton | UDVR3 | 顶部新增按钮 |
| PageTopButton/QueryButton | D8MKF | 顶部查询筛选按钮 |
| PageTopButton/Primay | AvivU | 顶部主要按钮 |
| PageTopButton/Other | LXEC6 | 顶部次要按钮 |
| CardOperateButton/Primary | Z75Ms | 卡片主按钮（蓝）|
| CardOperateButton/Other | 5SsNs | 卡片次按钮（浅蓝）|
| CardOperateButton/Delete | gh4Bo | 卡片删除按钮（红）|
| CardOperateButton/Cancel | txZV2 | 卡片取消按钮（灰）|
| CardOperatePrimaryButton/WithIconAndLabel | MaURI | 带图标主按钮 |
| CardOperateOtherButton/WithIconAndLabel | Fw8TP | 带图标次按钮 |

### 表单组件
| 组件名 | ID | 用途 |
|--------|-----|------|
| Input Group/WhiteBackground | wPg1c | 白色背景输入组 |
| Input Group/TransparentBackground | rzKOE | 透明背景输入组 |
| Textarea Group | 7VyLn | 文本域输入组 |
| FormDropdownSelect | RwZV0 | 下拉选择器 |
| FormTagButton/Selected | LqjxM | 选中状态标签 |
| FormTagButton/Unselected | gMIcw | 未选中状态标签 |
| FormSubmitButton | YB0Sv | 表单提交按钮 |

### 状态标签
| 组件名 | ID | 用途 | 颜色 |
|--------|-----|------|------|
| StatusCardTag/Succeed | FTfxp | 成功/良好 | 绿色 #4CAF50 |
| StatusCardTag/Danger | YBKSY | 紧急/危险 | 红色 #c90000 |
| StatusCardTag/Primary | rA6yl | 重点 | 蓝色 #0061ca |
| StatusCardTag/Warning | YIDmz | 警告 | 黄色 #FF9800 |
| Badge/Default | 2kQKE | 默认徽章 | 主色 |
| Badge/Secondary | Ab5Pd | 次要徽章 | 灰色 |
| Badge/Destructive | Q45MT | 危险徽章 | 红色 |
| Badge/Outline | ikRIU | 边框徽章 | 透明 |

### 导航组件
| 组件名 | ID | 用途 |
|--------|-----|------|
| Tabs | GLdri | 标签栏容器 |
| Tab Item/Active | MaKqr | 激活标签项 |
| Tab Item/Inactive | jSz81 | 未激活标签项 |
| SwitchButton/Selected | sMryI | 选中切换按钮 |
| SwitchButton/Unselected | ZYb1k | 未选中切换按钮 |
| SwitchBar | Hqe5O | 切换栏 |

### 列表组件
| 组件名 | ID | 用途 |
|--------|-----|------|
| List | kU9Rs | 列表容器 |
| ListRow | aTYfI | 列表行 |
| Row\\InputGroupItem | vSMV5 | 输入组列表项 |
| Row\\ViewItem | rJSgN | 查看项列表行 |
| Column | ntevL | 列容器 |
| Row | YsPYz | 行容器 |

### 弹窗组件
| 组件名 | ID | 用途 |
|--------|-----|------|
| Modal/Normal | n3jEk | 普通弹窗 |
| Modal | fJB6N | 带阴影弹窗 |

## Slot 节点详解

### Card/WithStrongTitle (Ivor1) 结构
```
Ivor1 (Card/WithStrongTitle)
├── YWja2 (Header) [fill: #E6F7FF]
│   └── sDDYA (HeaderTitle)
│       ├── pNv1L (headerIndicator) [蓝色竖条]
│       ├── Bkl8x (Title) ⭐ SLOT - 卡片标题
│       └── urHmR (SubTitleOrXmarkWrap) - 右上角，非 slot，用 U() 更新
├── IIROq (Body) ⭐ SLOT - 卡片内容区，垂直布局
└── 3yEV0 (Footer) ⭐ SLOT - 底部按钮区
```

### Card (BaQ2z) 结构
```
BaQ2z (Card)
├── kisox (Header) ⭐ SLOT - 卡片头部
├── 0HKDs (Body) ⭐ SLOT - 卡片内容区
└── GictY (Footer) ⭐ SLOT - 底部按钮区
```

## 操作速查

### 向 slot 插入内容
```javascript
// Body 是 slot，可以直接插入
I(card+"/IIROq", {
  "type": "frame",
  "children": [...]
})
```

### 更新非 slot 节点
```javascript
// urHmR 不是 slot，需要用 U() 更新 children
U(card+"/urHmR", {
  "children": [{
    "type": "text",
    "content": "已评价"
  }]
})
```

### 使用 descendants 覆盖组件内部
```javascript
I(parent, {
  "type": "ref",
  "ref": "Z75Ms",
  "descendants": {
    "Y0jzM": {"content": "查看详情"}
  }
})
```

## 样式变量

### 颜色
```javascript
{
  "--primary": "#0061ca",           // 主色调
  "--primary-foreground": "#FFFFFF", // 主色文字
  "--secondary": "#F5F5F5",          // 次要背景
  "--secondary-foreground": "#333333",// 次要文字
  "--destructive": "#c90000",        // 危险/删除
  "--muted-foreground": "#666666",   // 弱化文字
  "--border": "#E0E0E0",             // 边框
  "--input": "#F5F5F5",              // 输入框背景
  "--background": "#F5F7FA",         // 页面背景
  "--white": "#FFFFFF"               // 白色
}
```

### 尺寸
```javascript
{
  "--radius": 8,           // 卡片圆角
  "--radius-sm": 4,        // 按钮圆角
  "--radius-pill": 9999    // 胶囊圆角
}
```

## 页面模板结构

### 标准列表页
```
Page (375x896, #f5f5f5, vertical)
├── TopBar (56, #FFFFFF, space_between)
│   ├── PageTitle (评价律师)
│   └── RightButtons
│       ├── AddButton (UDVR3)
│       └── QueryButton (D8MKF)
└── ListContent (fill, vertical, gap: 12, padding: [8,16])
    ├── Card1 (ref: Ivor1)
    ├── Card2 (ref: Ivor1)
    └── Card3 (ref: Ivor1)
```

### 标准卡片字段布局
```
Card/WithStrongTitle
├── Header (#E6F7FF)
│   ├── Title (律师姓名)
│   └── Status (已评价/未评价)
├── Body (gap: 12, padding: 8)
│   ├── Row (评价得分: 4.5分)
│   ├── Row (评价人姓名: 王先生)
│   ├── Row (评价案件: 合同纠纷案)
│   ├── Row (评价人机构: 某某律所)
│   └── Row (评价时间: 2024-03-01)
└── Footer
    ├── PrimaryButton (查看详情)
    └── OtherButton (编辑)
```
