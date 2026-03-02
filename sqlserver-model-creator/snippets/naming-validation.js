// SQL Server 表命名检查
// 用途: 验证表名是否符合命名规范
const isValidTableName = (tableName) => {
  // 检查是否符合 system_function_ObjectName 格式
  const regex = /^[a-z]+_[a-z]+_[A-Z][a-zA-Z]*$/;
  return regex.test(tableName);
};

// SQL Server 存储过程命名检查
// 用途: 验证存储过程名是否符合命名规范
const isValidStoredProcedureName = (procName) => {
  // 检查是否符合 sqlSystemFunctionAction 格式
  const regex = /^sql[A-Z][a-zA-Z]*$/;
  return regex.test(procName);
};

// SQL Server 函数命名检查
// 用途: 验证函数名是否符合命名规范
const isValidFunctionName = (funcName) => {
  // 检查是否符合 fnSystem[Tb]FunctionAction 格式
  const regex = /^fn[A-Z][a-zA-Z]*$/;
  return regex.test(funcName);
};

// 推荐数据类型映射
const recommendedTypes = {
  string: 'NVARCHAR(n)',
  unicodeString: 'NVARCHAR(n)',
  fixedString: 'NCHAR(n)',
  number: 'INT',
  bigNumber: 'BIGINT',
  money: 'DECIMAL(17,2)',
  dateTime: 'DATETIME',
  boolean: 'CHAR(1)', // T/F
  guid: 'UNIQUEIDENTIFIER',
  longText: 'NVARCHAR(MAX)',
  coordinate: 'FLOAT'
};

// 获取系统简称对应的完整名称
const systemAbbreviations = {
  'eas': '行家帮手',
  'ccs': '网格化管理系统（WebForm 旧系统）',
  'wxmp': '微信公众号',
  'wxcorp': '企业微信',
  'wxmina': '微信小程序'
};

// 获取功能简称对应的完整名称
const functionAbbreviations = {
  'agent': '业务',
  'mkt': '营销（旧功能）',
  'nmkt': '新营销、大走访大营销、客户网格、客户识别、五覆盖',
  'fdr': '金融纠纷',
  'cia': '信贷系统（旧功能）',
  'cockpit': '数据看板/驾驶舱',
  'emp': '员工',
  'empHr': '人事管理、人员管理',
  'fbs': '财务审批',
  'work': '日常工作',
  'gmp': '总部效能',
  'clg': '行家学院',
  'dba': '自由表单、日常工作申请审批',
  'oth': '其他流程',
  'chat': '系统聊天',
  'npl': '不良贷款',
  'sas': '薪酬'
};