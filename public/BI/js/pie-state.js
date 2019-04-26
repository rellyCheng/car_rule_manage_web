var dom = document.getElementById("workerState");
var myChart_state = echarts.init(dom);
var app = {};
option = null;

option = {
    title: {
        text: '项目状态',
//      subtext: '虚构数据',
        left: 'center',
        textStyle: {
            color: '#ffffff'
        }
    },
	color: [
                "#6cdabd",
                "#00a0e9",
                "#ff0000",
                "#dbe059",
                "#3c7697",
                "#f77900",
                "#01dcfd",
                "#bda29a",
                "#6e7074",
                "#546570",
                "#c4ccd3"
            ],
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        bottom: 10,
        x: 'center',
        data: ['在建', '筹备','停工','完工'],
        textStyle: {
            color: '#ffffff'
        }
    },
    series : [
        {
            type: 'pie',
            radius : '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data:[
                {value:3,name: '在建',},
                {value:0, name: '筹备'},
                {value:0, name: '停工'},
                {value:1, name: '完工'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(255, 255, 255, 1)'
                }
            }
        }
    ]
};
if (option && typeof option === "object") {
    myChart_state.setOption(option, true);
}