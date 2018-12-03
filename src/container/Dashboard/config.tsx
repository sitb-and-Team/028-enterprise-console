/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/22
 */
import { Field, MiniArea, MiniBar, MiniProgress, yuan } from 'ant-design-pro/lib/Charts';
import * as React from 'react';
import Trend, { ITrendProps } from 'ant-design-pro/lib/Trend';
import numeral from 'numeral';
import * as moment from 'moment';
import { ChartCardProps } from './index';


export interface TrendProps extends ITrendProps {
  label: string;
  value: string;
  style?: object;
}

/**
 * 渲染trend数据展示
 * @param trendConfig
 * @returns {any}
 */
function renderTrendPrompt(trendConfig: Array<TrendProps>) {
  return trendConfig.map((trend, index) => {
    const {label, value, flag, style} = trend;
    return (
      <span key={index}
            style={style}
      >
        {label}
        <Trend flag={flag}
               style={{marginLeft: 8, color: "rgba(0,0,0,.85)"}}
        >
         {value}
        </Trend>
      </span>
    );
  });
}

const visitData: any = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

export const chartCardConfig: Array<ChartCardProps> = [{
  title: "交易额",
  action: {
    title: '交易额',
    icon: 'info-circle-o'
  },
  total: () => (
    <span dangerouslySetInnerHTML={{__html: yuan(126560)}}/>
  ),
  footer: (
    <Field label="日均交易额"
           value={numeral(12423).format("0,0")}
    />
  ),
  contentHeight: 46,
  children: renderTrendPrompt([{
    label: '周同比',
    value: '12%',
    flag: 'up'
  }, {
    label: '日环比',
    value: '112%',
    flag: 'down'
  }])
}, {
  title: "支付笔数",
  action: {
    title: '支付笔数',
    icon: 'info-circle-o'
  },
  total: numeral(8846).format('0,0'),
  footer: (
    <Field label="转换率"
           value="80%"
    />
  ),
  contentHeight: 46,
  children: (
    <MiniBar height={46}
             data={visitData}
    />
  )
}, {
  title: "本周访问",
  total: numeral(12321).format('0,0'),
  footer: renderTrendPrompt([{
    label: '用户数量',
    value: '8846',
    flag: 'down'
  }]),
  contentHeight: 46,
  children: (
    <React.Fragment>
      <MiniArea line
                height={45}
                data={visitData}
      />
    </React.Fragment>
  ),
}, {
  title: "交易成功率",
  action: {
    title: '交易陈功率',
    icon: 'info-circle-o'
  },
  total: "78%",
  footer: (
    <div>
      {
        renderTrendPrompt([{
          label: '周同比',
          value: '12%',
          flag: 'up'
        }])
      }
    </div>
  ),
  contentHeight: 46,
  children: (
    <MiniProgress percent={78}
                  strokeWidth={8}
                  target={80}
    />
  )
}];
