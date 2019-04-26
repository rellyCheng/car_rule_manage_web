var dom = document.getElementById("d-huan");
var myChart = echarts.init(dom);
var app = {};
option = null;
app.title = '环形图';

option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
     color: [
                "#4fc5ea",
                "#f9cd33",
                "#605ad8",
                "#8f55e7",
                "#5ed8a9",
                "#ffb11a",
                "#78c446",
                "#f86846",
                "#ff56f5",
                "#546570",
                "#c4ccd3",
                "#f77900",
            ],
    legend: {
        x : 'center',
        y : 'bottom',
        data:['管理人员','木工','水电工','管道工','架子工','抹灰工','普工','泥工','其他'],
        textStyle: {
            color: '#ffffff'
        }
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['40%', '55%'],
            label: {
                normal: {
                    formatter: '{b|{b}：}{c}  {per|{d}%}  ',
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
//                          backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data:[
                {value:1, name:'管理人员'},
                {value:8, name:'水电工'},
                {value:4, name:'管道工'},
                {value:2, name:'架子工'},
                {value:3, name:'普工'},
                {value:3, name:'水泥工'}
            ]
        }
    ]
};
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}