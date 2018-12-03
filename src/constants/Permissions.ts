export interface PermissionProps {
  /**
   * 请求方法
   */
  method: string
  /**
   * 请求路径
   */
  path: string
}

export const permission = {
  agencyBusiness: {
    update: {
      path: "/agencies/{agencyId}/business",
      method: "PUT"
    },
    create: {
      path: "/agencies/{agencyId}/business",
      method: "POST"
    },
    query: {
      path: "/agencies/{agencyId}/business",
      method: "GET"
    },
    statusControl: {
      path: "/agencies/{agencyId}/business/{businessType}/status",
      method: "PATCH"
    }
  },
  agency: {
    update: {
      path: "/agencies/{id}",
      method: "PUT"
    },
    create: {
      path: "/agencies",
      method: "POST"
    },
    query: {
      path: "/agencies",
      method: "GET"
    },
    statusControl: {
      path: "/agencies/{id}/status",
      method: "PATCH"
    }

  },
  agencyProfit: {
    queryProfit: {
      path: "/agencies/profit",
      method: "GET"
    }
  },
  agencyStatistical: {
    thisWeekNew: {
      path: "/agencies/this-week-new",
      method: "GET"
    }
  },
  agencyConfig: {
    create: {
      path: "/agencies/{agencyId}/configs",
      method: "POST"
    },
    query: {
      path: "/agencies/{agencyId}/configs",
      method: "GET"
    }
  },
  channelMerchant: {
    update: {
      path: "/channels/merchants/{id}",
      method: "PUT"
    },
    create: {
      path: "/channels/merchants",
      method: "POST"
    },
    query: {
      path: "/channels/merchants",
      method: "GET"
    }
  },
  channel: {
    query: {
      path: "/channels",
      method: "GET"
    }
  },
  channelMerchantBusiness: {
    update: {
      path: "/channels/merchants/{merchantId}/businesses",
      method: "PUT"
    },
    create: {
      path: "/channels/merchants/{merchantId}/businesses",
      method: "POST"
    },
    query: {
      path: "/channels/merchants/{merchantId}/businesses",
      method: "GET"
    },
    modifyStatus: {
      path: "/channels/merchants/{merchantId}/businesses/{businessId}/status",
      method: "PATCH"
    }
  },
  channelsBusiness: {
    update: {
      path: "/channels/{channelFlag}/business",
      method: "PUT"
    },
    create: {
      path: "/channels/{channelFlag}/business",
      method: "POST"
    },
    query: {
      path: "/channels/{channelFlag}/business",
      method: "GET"
    },
    modifyStatus: {
      path: "/channels/{channelFlag}/business/{businessType}/status",
      method: "PATCH"
    }
  },
  channelConfig: {
    query: {
      path: "/channels/{channelFlag}/configs",
      method: "GET"
    },
    createOrUpdate: {
      path: "/channels/{channelFlag}/configs",
      method: "POST"
    }
  },
  merchant: {
    update: {
      path: "/merchants/{id}",
      method: "PUT"
    },
    create: {
      path: "/merchants",
      method: "POST"
    },
    query: {
      path: "/merchants",
      method: "GET"
    },
    statusControl: {
      path: "/merchants/{id}/status",
      method: "PATCH"
    },
    deleteMerchant: {
      path: "/merchants/{id}",
      method: "DELETE"
    },
    importWithExcel: {
      path: "/merchants/excels",
      method: "POST"
    },
    updatePublicKey: {
      path: "/merchants/{id}/publicKey",
      method: "PATCH"
    },
    updateSettleAccount: {
      path: "/merchants/{id}/settlement-account",
      method: "PATCH"
    },
    createChannelMerchant: {
      path: "/merchants/{id}/channels/merchants",
      method: "PUT"
    },
    queryWeekNew: {
      path: "/merchants/this-week-new",
      method: "GET"
    }
  },
  merchantBusiness: {
    update: {
      path: "/merchants/{merchantId}/business",
      method: "PUT"
    },
    createPlaintext: {
      path: "/merchants/{merchantId}/business/plaintext",
      method: "POST"
    },
    create: {
      path: '/merchants/{merchantId}/business',
      method: 'POST'
    },
    query: {
      path: "/merchants/{merchantId}/business",
      method: "GET"
    },
    modifyStatus: {
      path: "/merchants/{merchantId}/business/{businessType}/status",
      method: "PATCH"
    }
  },
  merchantReView: {
    query: {
      path: "/merchants/reviews",
      method: 'GET'
    },
    update: {
      path: '/merchants/reviews',
      method: 'POST'
    }
  },
  merchantBusinessReview: {
    query: {
      path: "/merchants/business/reviews",
      method: 'GET'
    },
    update: {
      path: '/merchants/business/reviews',
      method: 'POST'
    }
  },
  paymentTrade: {
    query: {
      path: "/payment/trades",
      method: "GET"
    },
    download: {
      path: "/payment/trades/csv",
      method: "GET"
    },
    getResult: {
      path: "/payment/trades/result",
      method: "PATCH"
    },
    sendNotice: {
      path: "/payment/trades/notice",
      method: "PATCH"
    },
    createSettle: {
      path: "/payment/trade-settle",
      method: "POST"
    }
  },
  paymentSettle: {
    query: {
      path: "/payment/trade-settle",
      method: "GET"
    },
    handlePaymentTradeSettle: {
      path: "/payment/trade-settle",
      method: "PATCH"
    },
    createTradeSettle: {
      path: "/payment/trade-settle",
      method: "POST"
    },
    download: {
      path: "/payment/trade-settle/file",
      method: "GET"
    }
  },
  settleReconciliationTask: {
    query: {
      path: "/payment/reconciliationTask",
      method: "GET"
    },
    create: {
      path: "/payment/reconciliationTask",
      method: "POST"
    }
  },
  settleCheckMistakes: {
    query: {
      path: "/payment/mistakes/{id}",
      method: "GET"
    }
  },
  settleTask: {
    query: {
      path: '/payment/settle-task',
      method: 'GET'
    },
    create: {
      path: '/payment/settle-task',
      method: 'POST'
    },
    submit: {
      path: '/payment/settle-task/submit/{id}',
      method: 'PUT'
    },
    del: {
      path: '/payment/settle-task/{id}',
      method: 'DELETE'
    }
  },
  settleTradeDetail: {
    query: {
      path: '/payment/settle-detail',
      method: 'GET'
    },
    /**
     * 删除结算信息
     */
    removeTradeDetail: {
      path: '/payment/settle-detail/less-settle',
      method: 'PUT'
    },
    /**
     * 删除出款信息
     */
    removeDetail: {
      path: '/payment/settle-detail/less-detail/{taskId}',
      method: 'PUT'
    },
    /**
     * 修改联行号
     */
    editBankNo: {
      path: '/payment/settle-detail/{id}/bankNo',
      method: 'PUT'
    },
    /**
     * 状态回填
     */
    editStatus: {
      path: '/payment/settle-detail/status',
      method: 'PUT'
    }
  },
  paymentRoute: {
    update: {
      path: "/payment/route-rules/{id}",
      method: "PUT"
    },
    delete: {
      path: "/payment/route-rules/{id}",
      method: "DELETE"
    },
    create: {
      path: "/payment/route-rules",
      method: "POST"
    },
    query: {
      path: "/payment/route-rules",
      method: "GET"
    }
  },
  systemClient: {
    create: {
      path: "/session/agencies/clients",
      method: "POST"
    },
    query: {
      path: "/session/agencies/clients",
      method: "GET"
    },
    delete: {
      path: "/session/agencies/clients/{clientId}",
      method: "DELETE"
    }
  },
  systemConfig: {
    delete: {
      path: "/config/{id}",
      method: "DELETE"
    },
    create: {
      path: "/config",
      method: "POST"
    },
    query: {
      path: "/config",
      method: "GET"
    }
  },
  systemOperators: {
    create: {
      path: "/operators",
      method: "POST"
    },
    query: {
      path: "/operators",
      method: "GET"
    }
  },
  systemResources: {
    delete: {
      path: "/resources/{id}",
      method: "DELETE"
    },
    createOrUpdate: {
      path: "/resources",
      method: "POST"
    },
    query: {
      path: "/resources",
      method: "GET"
    }
  },
  systemRole: {
    update: {
      path: "/roles",
      method: "PUT"
    },
    create: {
      path: "/roles",
      method: "POST"
    },
    query: {
      path: "/roles",
      method: "GET"
    },
    delete: {
      path: "/roles/{id}",
      method: "DELETE"
    }
  },
  systemAgency: {
    children: {
      path: "/session/agencies/children",
      method: "GET"
    },
    updatePublicKey: {
      path: "/agencies/{id}/public-key",
      method: "PATCH"
    }
  },
  systemProcess: {
    query: {
      path: "/process",
      method: "GET"
    },
    create: {
      path: "/process",
      method: "POST"
    },
    update: {
      path: "/process/{id}",
      method: "PUT"
    },
    delete: {
      path: "/process/{id}",
      method: "DELETE"
    }
  },
  rateTemplate: {
    query: {
      path: '/template',
      method: 'GET'
    },
    create: {
      path: '/template',
      method: 'POST'
    },
    update: {
      path: '/template',
      method: 'PUT'
    },
    del: {
      path: '/template/{id}',
      method: 'DELETE'
    }
  },
  controlMerchantLimits: {
    query: {
      path: "/payment-limits",
      method: "GET"
    },
    create: {
      path: "/payment-limits",
      method: "POST"
    },
    update: {
      path: "/payment-limits/{id}",
      method: "PUT"
    },
    delete: {
      path: "/payment-limits/{id}",
      method: "DELETE"
    }
  },
  cushionQuotManagement: {
    query: {
      path: "/overdraft-amounts",
      method: "GET"
    },
    create: {
      path: "/overdraft-amounts",
      method: "POST"
    },
    update: {
      path: "/overdraft-amounts/{id}",
      method: "PUT"
    },
    delete: {
      path: "/overdraft-amounts/{id}",
      method: "DELETE"
    }
  },
  user: {
    query: {
      path: "/operators/user",
      method: "GET"
    }
  }
};
