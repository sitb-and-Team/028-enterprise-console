import SessionKey from '../constants/SessionKey';

/**
 * 保存操作员信息
 * @param operator 操作员信息
 */
export function saveOperator(operator) {
  sessionStorage.setItem(SessionKey.loginOperator, JSON.stringify(operator));
}

/**
 * 获取登陆操作员信息
 */
export function getOperator() {
  const operatorStr = sessionStorage.getItem(SessionKey.loginOperator);
  if (operatorStr) {
    return JSON.parse(operatorStr);
  }
  return null;
}

export function nowOperator(operator, merchantId) {
  // 判断operator
  const operators = (operator && Object.keys((operator.merchants).length !== 0)) && operator;
  // 获取当前商户信息
  return operators && operator.merchants.find(merchant => merchant.merchantNo === merchantId) || {};
}


/**
 * 获取当前操作员拥有的机构信息
 */
export function getAgencies() {
  return getOperator() || [];
}

/**
 * 获取当前操作员机构信息
 * @returns {any}
 */
export function getAgency() {
  const agencies = getAgencies();
  const agencyId = getAgencyId();
  // 默认为false
  let agency: any = false;
  // 匹配出当前登录机构信息
  if ((agencies && Array.isArray(agencies)) && agencyId) {
    agencies.forEach(agencyItem => {
      if (`${agencyItem.agency.id}` === `${agencyId}`) {
        agency = agencyItem;
      }
    });
  }
  return agency;
}

/**
 * 获取当前操作员机构权限信息
 * @returns {any}
 */
export function getAgencyRules() {
  // 匹配成功，返回绑定成功的机构权限信息
  const agency = getAgency();
  if (agency) {
    return agency.roles[0].rules;
  }
  // 清空机构id，并返回false
  resetAgencyId();
  return agency;
}

export function getAccessToken() {
  return sessionStorage.getItem(SessionKey.accessToken) || '';
}

export function setAccessToken(accessToken: string) {
  sessionStorage.setItem(SessionKey.accessToken, accessToken);
}

export function getAgencyId() {
  return sessionStorage.getItem(SessionKey.merchantId) || '';
}

export function setAgencyId(agencyId) {
  return sessionStorage.setItem(SessionKey.merchantId, `${agencyId}`);
}


// 清除当前选择的机构
export function resetAgencyId() {
  sessionStorage.removeItem(SessionKey.merchantId);
}

// 清除缓存
export function resetStorage() {
  // 清除操作员信息
  sessionStorage.removeItem(SessionKey.loginOperator);
  // 清除access token
  sessionStorage.removeItem(SessionKey.accessToken);
  resetAgencyId();
}
