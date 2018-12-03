import * as React from 'react';
import { withRouter } from 'react-router-dom';
import MainContainer from './MainContainer';

@withRouter
export default class Application extends React.Component<any, any> {

  render() {
    return <MainContainer/>;
  }
}
