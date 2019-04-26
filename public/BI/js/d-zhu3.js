var dom = document.getElementById("d-zhu");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    xAxis: {
        type: 'category',
        data: ['当前在场人数', '今日出勤人数', '在册民工人数', '临时外出人数'],
        axisLine:{
	        	lineStyle:{
	        		type:'solid',
	        		color:'#5fc0e3',//左边线的颜色
	        		width:'0'//坐标线的宽度
	        	}
	        },
        axisLabel:{
        	show:true,
        	textStyle:{
        		color:'#40829c',//坐标值得具体颜色
        		fontSize:14
        	}
        }
    },
    yAxis: {
        type: 'value',
        axisLine:{
        	lineStyle:{
        		type:'solid',
        		color:'#f2f2f2',//左边线的颜色
        		width:'0'//坐标线的宽度
        	}
        },
        axisLabel:{
        	show:true,
        	textStyle:{
        		color:'#40829c',//坐标值得具体颜色
        		fontSize:14
        	}
        }
    },
    series: [{
        data: [2, 2, 50, 0],
        type: 'bar',
        barWidth :50,//柱图宽度
        itemStyle:{
            normal:{
                color:'#4ad2ff'
            }
        }
    }]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}