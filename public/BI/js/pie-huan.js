var dom = document.getElementById("workerWage");
var myChart_huan = echarts.init(dom);
var app = {};
option = null;
app.title = '环形图';

option = {
	title: {
        text: '建设规模',
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
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        bottom: 10,
        right:20,
//      x: 'right',
        data:['大型','中型','小型'],
        textStyle: {
            color: '#ffffff'
        }
    },
    series: [
        {
            name:'实时数据',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    // show: false
                }
            },
            data:[
                {value:1, name:'大型'},
                {value:2, name:'中型'},
                {value:1, name:'小型'},
            ]
        }
    ]
};
;
if (option && typeof option === "object") {
    myChart_huan.setOption(option, true);
}