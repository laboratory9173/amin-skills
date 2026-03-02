---
# SQL Server 函数创建模板

## 用途
此模板用于创建符合公司命名规范的SQL Server函数（标量函数和表值函数）。

## 参数说明
- ${function_name}: 函数名称 (如 fnEasFdrFormatPhone 或 fnEasTbNmktCalcAge)
- ${parameters}: 函数参数列表
- ${return_type}: 函数返回类型
- ${function_logic}: 函数中的业务逻辑

## 标量函数模板代码

```sql
-- 检查并删除现有函数（如果存在）
IF EXISTS (SELECT 1
          FROM sysobjects
          WHERE id = object_id('${function_name}')
          AND type IN ('FN', 'IF', 'TF'))
   DROP FUNCTION ${function_name}
GO

CREATE FUNCTION ${function_name}(
${parameters}
)
RETURNS ${return_type}
AS
BEGIN
    DECLARE @Result ${return_type};

    ${function_logic}

    RETURN @Result;
END
GO
```

## 表值函数模板代码

```sql
-- 检查并删除现有函数（如果存在）
IF EXISTS (SELECT 1
          FROM sysobjects
          WHERE id = object_id('${function_name}')
          AND type IN ('FN', 'IF', 'TF'))
   DROP FUNCTION ${function_name}
GO

CREATE FUNCTION ${function_name}(
${parameters}
)
RETURNS TABLE
AS
RETURN
(
    ${function_logic}
);
GO
```

## 使用说明
1. 确保函数名称遵循命名规范 (fn + 系统简称 + [Tb] + 功能简称 + 动作)
2. 标量函数返回单个值，表值函数返回表结构
3. 参数使用小驼峰命名法，并包含注释说明
4. 根据功能类型选择合适的函数模板