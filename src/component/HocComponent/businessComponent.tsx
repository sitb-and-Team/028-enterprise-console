/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/30
 */
import * as React from 'react';
import { autoBind } from '@sitb/wbs/autoBind';
import { ButtonProps as ActionButtonProps } from '@sitb/wbs/ActionGroup';
import ColumnUtil from '../../utils/ColumnUtil';
import TotalUtil from '../DataGrid/TotalUtil';
import { getActions } from '../../core/store';
import { routerPath } from '../../core/router.config';
import ObjectUtil from '../../utils/ObjectUtil';

/**
 * business 纯函数
 * @param Wrapped
 * onEdit         编辑函数
 * onAdd          新增函数
 * onStatus       更改状态函数
 * columns        表格columns
 * @returns {any}
 */
const businessHoc = Wrapped => autoBind(class extends Wrapped<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      selectedRow: null
    };
  }

  componentWillMount() {
    const {params} = this.props;
    // 判断是否有路由参数
    if (!params) {
      getActions().navigator.navigate(routerPath.dashboard);
      return;
    }
    this.onSearch(params);
  }

  /**
   * 点击 保存当前行的值
   * @param selectedRow
   */
  onRowSelect(selectedRow) {
    this.setState({
      selectedRow
    });
    console.log('this row =>', selectedRow);
  }

  /**
   * 操作函数
   * @param action 类型
   */
  handleOperation(action) {
    const {params} = this.props;
    // 业务数据，当前行数据
    const {selectedRow} = this.state;
    // 深拷贝，防止修改源数据
    let newSelectedRow = ObjectUtil.clone(selectedRow);
    switch (action) {
      case 'add':
        if (!this.onAdd) {
          console.warn('this.onAdd is null');
          return;
        }
        this.onAdd(params, newSelectedRow);
        break;
      case 'edit':
        if (!this.onEdit) {
          console.warn('this.onEdit is null');
          return;
        }
        this.onEdit(params, newSelectedRow);
        break;
      case 'status':
        if (!this.onStatus) {
          console.warn('this.onStatus is null');
          return;
        }
        this.onStatus(params, newSelectedRow);
        break;
      default:
    }
  }

  render() {
    const {loading, page, params} = this.props;
    const newButtonGroups: Array<Array<ActionButtonProps> | ActionButtonProps> = [[{
      func: 'add',
      tip: {
        title: '新增'
      },
      children: '新增',
      onClick: () => this.handleOperation('add'),
      permission: this.addPermission
    }, {
      func: 'edit',
      tip: {
        title: '编辑'
      },
      children: '编辑',
      onClick: () => this.handleOperation('edit'),
      disabled: this.state.selectedRow == null,
      permission: this.editPermission
    }], [{
      func: 'eye',
      pop: {
        title: '确认要修改业务状态？'
      },
      onClick: () => this.handleOperation('status'),
      children: '更改业务状态',
      disabled: this.state.selectedRow == null,
      permission: this.statusPermission
    }]];
    return (
      <Wrapped buttons={newButtonGroups}
               style={{marginTop: 10, marginBottom: 10, paddingLeft: 15, paddingRight: 15}}
               title={() => (
                 <TotalUtil total={page.content.length}/>)}
               loading={loading}
               page={page}
               params={params}
               onRowSelect={this.onRowSelect}
               columns={ColumnUtil.adjustRender(this.columns)}
      />
    )
  }
});

export default businessHoc;
