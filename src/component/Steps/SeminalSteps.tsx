/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/19
 */
import * as React from 'react';
import { Popover, Steps } from 'antd';
import { Button } from '@sitb/wbs/Button';
import { autoBind } from '@sitb/wbs/autoBind';

const Step = Steps.Step;

const customDot = (dot, {description}) => (
  <Popover content={<span>{`step status${description}`}</span>}>
    {dot}
  </Popover>
);

@autoBind
export class SeminalSteps extends React.Component<any, any> {

  renderStep(config) {
    return config.map((step, index) => {
      let title = (
        <Button pop={{
          title: step.title || step.btnName
        }}
                onClick={step.onClick}
                size="small"
                disabled={step.disabled}
        >
          {step.btnName}
        </Button>
      );
      return (
        <Step key={index}
              title={title}
              status={step.status}
              description={step.description}
        />
      )
    })
  }

  render() {
    const {config} = this.props;
    return (
      <Steps current={2}
             progressDot={customDot}
             size="small"
             style={{
               paddingTop: 10
             }}
      >
        {this.renderStep(config)}
      </Steps>
    )
  }
}
