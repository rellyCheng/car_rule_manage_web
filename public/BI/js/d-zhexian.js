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
        '07:00', '08:00', '09:00','10:00', '11:00', '12:00','13:00', '14:00', '15:00','16:00', '17:00', 
        '18:00','19:00', '20:00'],
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
        data: [72, 56, 20, 16, 12, 10, 11, 58, 102, 136, 187, 209, 236, 224, 172, 179, 187, 199, 215, 225, 203, 169, 122,93],
        type: 'line'
    }]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}