import {lang} from "../../locale";
import {CushionQuotTypeOptions} from "../../constants/selectObj/CushionQuotTye";
import {BusinessTypeData} from "../../constants/BusinessType";
import {ColumnType} from "@sitb/wbs/DataGrid/DataGrid";

export const CushionQuotManagementColumns = [{
  title: lang.cushionQuotManagement.type,
  dataIndex: 'type',
  render: (type) => type && CushionQuotTypeOptions[type]
}, {
  title: lang.cushionQuotManagement.identity,
  dataIndex: 'identity'
}, {
  title: lang.cushionQuotManagement.businessType,
  dataIndex: 'businessType',
  render: (businessType) => businessType && BusinessTypeData[businessType]
}, {
  title: lang.cushionQuotManagement.totalAmount,
  dataIndex: 'totalAmount',
}, {
  title: lang.cushionQuotManagement.businessTimeOpen,
  dataIndex: 'businessTime.open',
  type: ColumnType.DATE
}, {
  title: lang.cushionQuotManagement.businessTimeClose,
  dataIndex: 'businessTime.close',
  type: ColumnType.DATE
}, {
  title: lang.describe,
  dataIndex: `describe`,
}
];
