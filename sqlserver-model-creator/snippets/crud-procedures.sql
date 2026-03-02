/*
SQL Server CRUD 存储过程示例
根据命名规范生成的标准CRUD操作存储过程
*/

-- 1. 创建操作存储过程模板
CREATE PROCEDURE sqlEasFdrAdd${ObjectName}(
	@Param1 DataType, -- 参数1描述
	@Param2 DataType = NULL -- 参数2描述（可选）
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO eas_fdr_${ObjectName} (Field1, Field2)
    VALUES (@Param1, @Param2);

    SELECT SCOPE_IDENTITY() AS NewId;
END
GO

-- 2. 读取操作存储过程模板
CREATE PROCEDURE sqlEasFdrGet${ObjectName}(
	@Id INT -- 对象ID
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Field1, Field2, Field3
    FROM eas_fdr_${ObjectName}
    WHERE Id = @Id;
END
GO

-- 3. 更新操作存储过程模板
CREATE PROCEDURE sqlEasFdrMod${ObjectName}(
	@Id INT, -- 对象ID
	@Param1 DataType, -- 参数1描述
	@Param2 DataType = NULL -- 参数2描述（可选）
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE eas_fdr_${ObjectName}
    SET Field1 = @Param1,
        Field2 = @Param2
    WHERE Id = @Id;
END
GO

-- 4. 删除操作存储过程模板
CREATE PROCEDURE sqlEasFdrDel${ObjectName}(
	@Id INT -- 对象ID
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM eas_fdr_${ObjectName}
    WHERE Id = @Id;
END
GO