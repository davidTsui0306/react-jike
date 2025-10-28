// 封裝柱狀圖組件
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({ title }) =>{
    const chartRef = useRef(null)
    useEffect(() => {
        //保證dom可用才進行渲染
        // 獲取渲染圖表的dom節點
        const chartDom = chartRef.current
        // 圖表初始化生成實力對象
        const myChart = echarts.init(chartDom);
    
        const option = {
            title:{
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['Vue', 'React', 'Angular']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [10, 40, 70],
                type: 'bar'
                }
            ]
        };

        // 使用圖表參數完成圖表渲染
        option && myChart.setOption(option);
    }, [title])

    return <div ref={chartRef} id='main' style={{width: '500px', height: '400px'}}></div>

}

export default BarChart