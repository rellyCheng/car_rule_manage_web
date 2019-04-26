var dom = document.getElementById("zhexian");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
	title: {
        text: '24小时在岗人数变化',
        left: 'center',
         textStyle: {
            color: '#ffffff'
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00','04:00', '05:00', '06:00',
        '07:00', '08:00', '09:00','10:00'],
        axisLabel:{
        	show:true,
        	textStyle:{
        		color:'#40829c'//坐标值得具体颜色
        	}
        }
    },
    yAxis: {
        type: 'value',
        axisLabel:{
        	show:true,
        	textStyle:{
        		color:'#40829c'//坐标值得具体颜色
        	}
        }
    },
    series: [{
        data: [0,0,0,0,0,0,0,0,0,0,0,0,2,2],
        type: 'line',
        areaStyle: {}
    }]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}