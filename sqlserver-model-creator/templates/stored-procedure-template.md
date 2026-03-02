---
# SQL Server 存储过程创建模板

## 用途
此模板用于创建符合公司命名规范的SQL Server存储过程。

## 参数说明
- ${procedure_name}: 存储过程名称 (如 sqlEasNmktGetCustomer)
- ${parameters}: 存储过程参数列表
- ${business_logic}: 存储过程中的业务逻辑

## 模板代码

```sql
-- 检查并删除现有存储过程（如果存在）
IF EXISTS (SELECT 1
          FROM sysobjects
          WHERE  id = object_id('${procedure_name}')
          AND type IN ('P','PC'))
   DROP PROCEDURE ${procedure_name}
GO

CREATE PROC ${procedure_name}(
${parameters}
)
AS
BEGIN
    SET NOCOUNT ON;

    ${business_logic}

END
GO
```

## 使用说明
1. 确保存储过程名称遵循命名规范 (sql + 系统简称 + 功能简称 + 动作)
2. 参数使用小驼峰命名法，并包含注释说明
3. 包含适当的错误处理和事务控制
4. 避免SQL注入风险，使用参数化查询