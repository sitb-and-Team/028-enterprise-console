/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/30
 */
import * as React from 'react';
import {getActions} from '../../core/store';
import {ButtonProps as ActionButtonProps} from '@sitb/wbs/ActionGroup';
import {autoBind} from '@sitb/wbs/autoBind';
import FieldUtil from '../../utils/FieldUtil';
import ColumnUtil from '../../utils/ColumnUtil';
import TotalUtil from '../DataGrid/TotalUtil';

/**
 *
 * @param Wrapped
 * onSearch       自定义搜索函数
 * routeBusiness  跳转到业务path
 * routeCreate    跳转到新增、编辑path
 * column         表格column
 * searchField    搜索表单
 * delPermission  del权限
 * @returns {any}
 */
const queryHoc = Wrapped => autoBind(class extends Wrapped {
  constructor(props, content) {
    super(props, content);
    this.state = {
      selectedRow: null
    };
  }

  componentWillMount() {
    if (!this.onSearch || !this.searchField || !this.columns || !this.routeBusiness || !this.routeCreate) {
      console.warn('queryComponent => 有属性没有没有配置!请检查 this.onSearch, this.searchField, this.columns, this.routeBusiness, this.routeCreate');
    }
    this.onSearch();
  }

  /**
   * 单选按钮保存 当前行数据
   * @param selectedRow
   */
  handleRowSelect(selectedRow) {
    this.setState({
      selectedRow
    });
    console.log('this row =>', selectedRow);
  }

  /**
   * 跳转业务管理
   */
  handleGoToBusiness() {
    const {selectedRow} = this.state;
    getActions().navigator.navigate({
      routeName: this.routeBusiness,
      params: selectedRow
    });
    console.log('goto business', selectedRow);
  }

  /**
   * 新增
   */
  handleAdd() {
    getActions().navigator.navigate({
      routeName: this.routeCreate,
      params: {
        isAdd: true
      }
    });
  }

  /**
   * 编辑
   */
  handleEdit() {
    const {selectedRow} = this.state;
    getActions().navigator.navigate({
      routeName: this.routeCreate,
      params: {
        ...selectedRow,
        isUpdate: true
      }
    });
  }

  render() {
    const {loading, page, searchParams} = this.props;
    const businessButtonConfig: Array<ActionButtonProps> = this.buttonConfig || [{
      func: 'eye',
      tip: {
        title: '查看通道商户业务'
      },
      children: '查看详情',
      disabled: this.state.selectedRow == null,
      onClick: this.handleGoToBusiness,
      permission: this.businessPermission
    }];
    return (
      <Wrapped columns={ColumnUtil.adjustRender(this.columns || [])}
               searchParams={searchParams}
               loading={loading}
               title={() => (
                 <TotalUtil total={page.totalElements}
                            totalAmount={page.totalAmount}
                 />)}
               page={page}
               onAdd={this.handleAdd}
               addPermission={this.addPermission}
               onEdit={this.handleEdit}
               editPermission={this.editPermission}
               delPermission={this.delPermission}
               onSearch={this.onSearch}
               onRowSelect={this.handleRowSelect}
               fieldGroups={FieldUtil.adjustRender(this.searchField || [])}
               buttonGroups={businessButtonConfig}
      />);
  }
});

export default queryHoc;
