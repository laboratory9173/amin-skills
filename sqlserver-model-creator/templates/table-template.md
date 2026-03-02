---
# SQL Server 表创建模板

## 用途
此模板用于创建符合公司命名规范和数据类型推荐的SQL Server表。

## 参数说明
- ${system_abbreviation}: 系统简称 (如 eas, ccs, wxmp)
- ${function_abbreviation}: 功能简称 (如 fdr, nmkt, emp)
- ${table_name}: 表名 (帕斯卡命名法)
- ${fields}: 表字段定义
- ${primary_key_field}: 主键字段名

## 模板代码

```sql
-- 检查并删除现有表（如果存在）
IF EXISTS (SELECT 1
            FROM  sysobjects
           WHERE  id = object_id('${system_abbreviation}_${function_abbreviation}_${table_name}')
            AND   type = 'U')
   DROP TABLE ${system_abbreviation}_${function_abbreviation}_${table_name}
GO

/*==============================================================*/
/* Table: ${system_abbreviation}_${function_abbreviation}_${table_name}                                          */
/*==============================================================*/
CREATE TABLE ${system_abbreviation}_${function_abbreviation}_${table_name} (
${fields}
   CONSTRAINT PK_${system_abbreviation}_${function_abbreviation}_${table_name} PRIMARY KEY (${primary_key_field})
)
GO

-- 添加必要的索引
-- CREATE NONCLUSTERED INDEX Index_1 ON ${system_abbreviation}_${function_abbreviation}_${table_name} (字段名 ASC)
-- GO
```

## 使用说明
1. 替换模板中的占位符为实际值
2. 根据业务需求调整字段定义
3. 根据查询需求添加适当的索引
4. 确保所有命名遵循公司规范