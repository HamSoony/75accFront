/**
 *  그리드 필드 전용 파일
 */
const slipFiled = [
  { key: 'accountPeriodNo', label: '기수일련번호' },
  { key: 'slipNo', label: '전표일련번호' },
  { key: 'slipType', label: '전표유형' },
  { key: 'reportingDate', label: '작성날짜' },
  { key: 'reportingEmpCode', label: '작성자코드' },
  { key: 'expenseReport', label: '품의내역' },
  { key: 'slipStatus', label: '승인상태' },
]

const journalFiled = [
  { key: 'journalNo', label: '분개일련번호' },
  { key: 'acctInnerCode', label: '계정코드' },
  { key: 'acctName', label: '계정과목' },
  { key: 'balanceDivision', label: '대차구분' },
  { key: 'cterCode', label: '거래처코드' },
  { key: 'cterName', label: '거래처명' },
  { key: 'leftDebtorPrice', label: '차변금액' },
  { key: 'rightCreditsPrice', label: '대변금액' },
]

const JournaldetailFiled = [
  { key: 'journalDetailNo', label: '분개번호' },
  { key: 'accountControlName', label: '분개상세항목' },
  { key: 'accountControlType', label: '코드' },
  { key: 'journalDescription', label: '상세내용' },
]

const CompanyFiled = [
  { key: 'id', label: '컴퍼니코드' },
  { key: 'compName', label: '컴퍼니이름' },
]

const WorkplaceFiled = [
  { key: 'id', label: '사업장코드' },
  { key: 'wpName', label: '사업장이름' },
]

export { slipFiled, journalFiled, JournaldetailFiled, CompanyFiled, WorkplaceFiled }
