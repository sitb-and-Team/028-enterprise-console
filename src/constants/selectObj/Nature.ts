import { lang } from '../../locale/index';


export const Nature = {
  /**
   * 个人
   */
  personal: 'PERSONAL',
  /**
   * 企业
   */
  enterprise: 'ENTERPRISE'
};

/**
 机构性质
 */
export const NatureOptions = {
  [Nature.personal]: lang.personal,
  [Nature.enterprise]: lang.enterprise
};
