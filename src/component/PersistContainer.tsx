import * as React from 'react';
import { Props as FieldGroupProps } from '@sitb/wbs/Form/FieldGroup';
import { autoBind } from '@sitb/wbs/autoBind';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import { getActions } from '../core/store';
import { Form } from './Form/Form';
import { routerPath } from '../core/router.config';

export interface Props {
  form: WrappedFormUtils;

  match?: any

  /**
   * 编辑时传递的参数
   */
  params?: any

  fieldGroups?: Array<FieldGroupProps>;

  onSubmit?: (value: any, form: WrappedFormUtils, isUpdate: boolean) => void;

  [key: string]: any
}

/**
 * 数据持久化页面
 */
@autoBind
export class PersistContainer extends React.Component<Props> {
  componentWillMount() {
    const {params} = this.props;
    // 如果刷新当前页面，返回到仪表盘
    if (!(params && (!params.isUpdate || !params.isAdd))) {
      getActions().navigator.navigate(routerPath.dashboard);
    }
  }

  isUpdate() {
    const {type} = this.props.match.params || {type: 'create'};
    return type === 'update';
  }

  isCreate() {
    const {type} = this.props.match.params || {type: 'create'};
    return type === 'create';
  }

  handleSubmit(value, form) {
    const {onSubmit} = this.props;
    onSubmit && onSubmit(value, form, this.isUpdate());
  }

  render() {
    const {params, dispatch, staticContext, ...props} = this.props;
    return (
      <Form {...props}
            onSubmit={this.handleSubmit}
      />
    )
  }
}
