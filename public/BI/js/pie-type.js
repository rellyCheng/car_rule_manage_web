var dom = document.getElementById("workerType");
var myChart_type = echarts.init(dom);
var app = {};
option = null;

option = {
    title: {
        text: '工种分布',
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
//  legend: {
//      bottom: 10,
//      x: 'center',
////      data: ['普工', '瓦泥工','木工','水工','水电工','架子工','其他'],
//      textStyle: {
//          color: '#ffffff'
//      }
//  },
    series : [
        {
            type: 'pie',
            radius : '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data:[
                {value:1548,name: '普工',},
                {value:535, name: '瓦泥工'},
                {value:510, name: '木工'},
                {value:634, name: '水工'},
                {value:735, name: '水电工'},
                {value:634, name: '架子工'},
                {value:735, name: '其他'}
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
    myChart_type.setOption(option, true);
}