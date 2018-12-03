/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/7
 */
import { lang } from '../../locale/index';

// 性别
export const Gender = {
  male: "MALE",
  female: "FEMALE"
};

export const GenderOptions = {
  [Gender.male]: lang.male,
  [Gender.female]: lang.female
};

// 证件类型
export const IdType = {
  idCard: "ID_CARD",
  tmpIdCard: "TMP_ID_CARD",
  officer: "OFFICER",
  civil: "CIVIL",
  policeOfficer: "POLICE_OFFICER",
  soldiers: "SOLDIERS",
  passport: "PASSPORT",
  hkMacao: "HK_MACAO"
};

export const idTypeOptions = {
  [IdType.idCard]: lang.idCard,
  [IdType.tmpIdCard]: lang.tmpIdCard,
  [IdType.officer]: lang.officer,
  [IdType.civil]: lang.civil,
  [IdType.policeOfficer]: lang.policeOfficer,
  [IdType.soldiers]: lang.soldiers,
  [IdType.passport]: lang.passport,
  [IdType.hkMacao]: lang.hkMacao
};
