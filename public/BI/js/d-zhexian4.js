var dom = document.getElementById("d-zhexian");
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
    // grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    // },
    xAxis: {
        type: 'category',
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
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        type: 'line'
    }]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}