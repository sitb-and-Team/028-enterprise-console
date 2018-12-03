/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/6
 */
import styles from '../../styles/application';
import * as React from 'react';
import { Breadcrumb, Layout } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import routes, { breadcrumbNameMap } from '../../core/router.config';
import { getState } from '../../core/store';
import { autoBind } from '@sitb/wbs/autoBind';
import { menu } from '../../locale';

@autoBind
export default class Content extends React.Component<any> {
  /**
   * 创建
   * @param {any} Component
   * @param {path}
   * @returns {(props) => any}
   */
  createRender({component: Component}) {
    return props => {
      // 取当前路由路径
      const {pathname} = this.props.location;
      const params = getState().navigator.router[pathname];
      // pass the sub-routes down to keep nesting
      return (
        <Component {...props}
                   params={params}
        />
      );
    };
  }

  render() {
    // 根据路由渲染 面包屑
    const HomeBreadcrumb = () => {
      const {location} = this.props;
      const pathSnippets = location.pathname.split('/').filter(i => i);
      const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        // 字符串的最后出现persist过滤掉
        if ((url.length - 7) === url.lastIndexOf('persist')) {
          return;
        }
        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>
              {breadcrumbNameMap[url]}
            </Link>
          </Breadcrumb.Item>
        );
      });
      const breadcrumbItems = [(
        <Breadcrumb.Item key="dashboard">
          <Link to="/dashboard">{menu.dashboard}</Link>
        </Breadcrumb.Item>
      )].concat(extraBreadcrumbItems);
      return (
        <Breadcrumb style={{padding: '16px 16px 0'}}>
          {breadcrumbItems}
        </Breadcrumb>
      );
    };
    return (
      <React.Fragment>
        <HomeBreadcrumb/>
        <Layout.Content style={{
          ...styles.content,
          ...styles.contentMode,
          position: 'relative'
        }}>
          <Switch>
            {
              routes.map((route: any, index) => (
                <Route exact
                       path={route.path}
                       render={this.createRender(route)}
                       key={index}
                />
              ))
            }
          </Switch>
        </Layout.Content>
      </React.Fragment>
    );
  }

}
