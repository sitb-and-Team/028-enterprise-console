import { lang } from '../../locale/index';


export const IdType = {
  idCard: 'ID_CARD',
  tmpIdCard: 'TMP_ID_CARD',
  officer: 'OFFICER',
  civil: 'CIVIL',
  policeOfficer: 'POLICE_OFFICER',
  soldiers: 'SOLDIERS',
  passport: 'PASSPORT',
  hkMacao: 'HK_MACAO'
};

export const IdTypeOptions = {
  [IdType.idCard]: lang.idCard,
  [IdType.tmpIdCard]: lang.tmpIdCard,
  [IdType.officer]: lang.officer,
  [IdType.civil]: lang.civil,
  [IdType.policeOfficer]: lang.policeOfficer,
  [IdType.soldiers]: lang.soldiers,
  [IdType.passport]: lang.passport,
  [IdType.hkMacao]: lang.hkMacao,
};
