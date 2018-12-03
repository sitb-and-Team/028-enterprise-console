/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/9
 */
import { concreteTypes, merchantsTypes, segmenTypes } from '../../constants/selectObj/MerchantsWeChatPayMcc';

export default class MerchantUtils {
  /**
   * 遍历生成weChatMcc
   * @param weChatPayMcc  当前三级类目string
   * @param getString     默认三级泪目返回下标，传递getString 获取字符串
   * @returns {(any)[]}
   */
  static mapWeChatPayMcc(weChatPayMcc, getString = false) {
    let mcc: any = [];
    concreteTypes.forEach((merchant, merchantIndex) => {
      merchant.forEach((segmen, segmenIndex) => {
        segmen.forEach(concrete => {
          // 根据第三维数组key判断
          if (concrete.key === weChatPayMcc) {
            // 默认返回
            mcc = [
              merchantsTypes[merchantIndex],
              segmenTypes[merchantIndex][segmenIndex],
              weChatPayMcc
            ];
            // 返回字符串
            if (getString) {
              mcc = `${merchantsTypes[merchantIndex]}-${segmenTypes[merchantIndex][segmenIndex]}-${concrete.value}`
            }
          }
        })
      })
    });
    return mcc;
  }
}
