import * as React from 'react';
import { connect } from 'react-redux';
import { Form as ANTDForm, message } from 'antd';
import { autoBind } from '@sitb/wbs/autoBind';
import hasPermission from '@sitb/wbs/utils/hasPermission';
import { Form } from '../../component/Form/Form';
import { getActions } from '../../core/store';
import FieldUtil from '../../utils/FieldUtil';
import { channelConfigFields } from './fields';
import { ChannelSelect } from '../../component/Tool/ChannelSelect';
import { permission } from '../../constants/Permissions';
import { lang } from '../../locale';
import { Form as WBSForm } from '@sitb/wbs/Form';

@autoBind
class Component extends React.Component<any, any> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      /**
       * 通道参数
       */
      channelFlag: ''
    };
  }

  /**
   * 搜索
   * @param {any} channelFlag
   */
  handleSearch(channelFlag = this.state.channelFlag) {
    getActions().channelConfig.startQuery({channelFlag});
    console.log('search channelFlag=>', channelFlag);
  }

  /**
   * 表单提交事件
   * @param value
   */
  handleSubmit(value) {
    // 判断是否有修改权限
    if (!hasPermission(permission.channelConfig.createOrUpdate)) {
      message.warning(lang.notRule);
      return;
    }
    // 新增参数，新增channelFlag
    const newParams = Object.assign(value, {
      channelFlag: this.state.channelFlag
    });
    console.log('submit', newParams);
    getActions().channelConfig.startUpdate(newParams);
    setTimeout(() => {
      this.props.form.resetFields();
    }, 100);
  }

  /**
   * 通道代码change
   * @param channelFlag
   */
  handleChangeFlag(channelFlag = this.state.channelFlag) {
    this.handleSearch(channelFlag);
    this.setState({channelFlag});
    console.log('save channelFlag=>', channelFlag);

  }

  render() {
    const {processing, form, searchParams, page: {content}} = this.props;
    const searchFields = [{
      fields: [{
        name: 'channelFlag',
        label: lang.channelFlag,
        render: () => <ChannelSelect onChange={this.handleChangeFlag}/>
      }]
    }];
    let newContent: any = content;
    // 优化填值
    if (processing) {
      newContent = [];
    } else if (!content.length) {
      newContent = content;
    }
    return (
      <React.Fragment>
        <WBSForm form={form}
                 isStatusActionGroup={false}
                 initialValue={searchParams}
                 fieldGroups={FieldUtil.adjustRender(searchFields)}
        />
        <Form loading={processing}
              form={form}
              initialValue={newContent}
              onSubmit={this.handleSubmit}
              fieldGroups={FieldUtil.adjustRender(channelConfigFields)}
        />
      </React.Fragment>
    );
  }
}

export const ChannelConfig = connect(({channelConfig}) => ({
  page: channelConfig.page,
  searchParams: channelConfig.searchParams,
  processing: channelConfig.processing
}))(ANTDForm.create()(Component));
