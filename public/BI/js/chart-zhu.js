var dom = document.getElementById("zhu");
var myChart_zhu = echarts.init(dom);
var app = {};
option = null;
app.title = '坐标轴刻度与标签对齐';

option = {
    color: ['#1ae0fe'],
    title: {
        text: '工人来源',
        left: 'center',
         textStyle: {
            color: '#ffffff'
        }
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['四川省','安徽省','河南省','浙江省','贵州省'],
            axisTick: {
                alignWithLabel: true
            },
            axisLine:{
	        	lineStyle:{
	        		type:'solid',
	        		color:'#f2f2f2',//左边线的颜色
	        		width:'2'//坐标线的宽度
	        	}
	        },
	        axisLabel:{
	        	show:true,
	        	textStyle:{
	        		color:'#40829c'//坐标值得具体颜色
	        	}
	        }
        }
    ],
    yAxis : [
        {
            type : 'value',
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
	        		color:'#40829c'//坐标值得具体颜色
	        	}
	        }
        }
    ],
    series : [
        {
            name:'实时反馈',
            type:'bar',
            barWidth: '15%',
            data:[50,35,25,44,26]
        }
    ]
};
;
if (option && typeof option === "object") {
    myChart_zhu.setOption(option, true);
}