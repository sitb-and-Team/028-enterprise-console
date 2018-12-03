import { lang } from '../../locale/index';

/**
 * 结算账户类型
 */
export const SettleType = {
  /**
   * 对公
   */
  public: 'PUBLIC',

  private: 'PRIVATE'
};


/**
 * 给select用的options对象
 */
export const SettleTypeOptions = {
  [SettleType.public]: lang.public,
  [SettleType.private]: lang.private
};
