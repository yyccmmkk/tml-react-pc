import React from 'react';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

const defaults = {
  data: [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ],
};

export class Pie extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
    this.chartEle = React.createRef();
  }

  props: any;
  state: any;
  chartEle: any;
  myChart: any;

  getChartOption(): EChartsOption {
    const { data = defaults.data } = this.props;
    const option: EChartsOption = {
      color: ['#4A71FF', '#00A1E4', '#D0B100', '#1EBE61', '#8181FE'],
      legend: {
        show: false,
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: [60, 106],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          itemStyle: {
            borderRadius: 0,
            borderColor: '#02041D',
            borderWidth: 4,
          },
          labelLine: {
            show: false,
          },
          data,
        },
      ],
    };
    return option;
  }

  componentDidMount(): void {
    const chartDom: any = this.chartEle.current;
    const myChart: any = echarts.init(chartDom);
    const option = this.getChartOption();
    this.myChart = myChart;
    option && myChart.setOption(option);
  }

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ) {
    if (prevProps.data !== this.props.data) {
      this.myChart.setOption(this.getChartOption());
    }
  }

  render() {
    const { height = 400 } = this.props;
    return (
      <div className="Pie" style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 23,
            top: 23,
            width: 185,
            height: 185,
            borderRadius: 105,
            backgroundColor: '#000',
            opacity: 0.85,
            zIndex: 9,
            pointerEvents: 'none',
          }}
        ></div>
        <div ref={this.chartEle} style={{ width: '100%', height }} />
      </div>
    );
  }
}
