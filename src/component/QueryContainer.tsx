import * as React from 'react';
import { Props as WrapperProps, QueryContainer as Wrapper } from '@sitb/wbs/QueryContainer';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../core/store';

export interface Props extends WrapperProps {

  /**
   * 新增页面uri
   */
  addUri?: string

  /**
   * 编辑页面uri
   */
  editUri?: string
  /**
   * 父级的路由传参
   */
  params?: object

  /**
   * 初始化搜索
   */
  initializationSearch?: boolean
}

@autoBind
export class QueryContainer extends React.Component<Props> {

  state = {
    selectedRow: null,
    record: {}
  };

  constructor(props) {
    super(props);
    const {onSearch, initializationSearch = true, searchParams} = this.props;
    (initializationSearch && onSearch) && onSearch(searchParams);
  }

  handleAdd() {
    const {addUri, params} = this.props;
    getActions().navigator.navigate({
      routeName: addUri,
      params: {
        ...params,
        isAdd: true
      }
    });
  }

  handleEdit() {
    // record为当前行数据，params为父组件需要额外传递的数据
    const {editUri, params} = this.props;
    const {record} = this.state;
    getActions().navigator.navigate({
      routeName: editUri,
      params: {
        ...record,
        ...params,
        isUpdate: true
      }
    });
  }

  handleRowSelect(record: any, selected: boolean, selectedRows: Object[], nativeEvent: Event) {
    this.setState({
      selectedRow: {
        record,
        selected,
        selectedRows
      },
      record
    });
    const {onRowSelect} = this.props;
    onRowSelect && onRowSelect(record, selected, selectedRows, nativeEvent);
  }

  render() {
    const {addUri, editUri, ...props} = this.props;
    const newProps = {...props};
    if (addUri) {
      newProps.onAdd = this.handleAdd;
    }
    if (editUri) {
      newProps.onEdit = this.handleEdit;
    }

    return (
      <Wrapper {...newProps}
               onRowSelect={this.handleRowSelect}
      />
    );
  }

}
