//扇形图
var dom = document.getElementById("workerAge");
		var myChart_age = echarts.init(dom,'aaa');
		var app = {};
		option = null;
		option = {
//		    backgroundColor: '#2c343c',
		
		    title: {
		        text: '年龄分布',
		        left: 'center',
		        top: 20,
		        textStyle: {
		            color: '#ffffff'
		        }
		    },
//			color: [
//              "#6cdabd",
//              "#00a0e9",
//              "#ff0000",
//              "#dbe059",
//              "#3c7697",
//              "#f77900",
//              "#01dcfd",
//              "#bda29a",
//              "#6e7074",
//              "#546570",
//              "#c4ccd3"
//          ],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		
		    visualMap: {
		        show: false,
		        min: 20,
		        max: 600,
		        inRange: {
		            colorLightness: [0, 1]
		        }
		    },
		    series : [
		        {
		            name:'',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '50%'],
		            data:[
		                {value:335, name:'20岁以内'},
		                {value:310, name:'20岁～30岁'},
		                {value:274, name:'30岁～40岁'},
		                {value:235, name:'40岁～50岁'},
		                {value:400, name:'50岁～60岁'}
		            ].sort(function (a, b) { return a.value - b.value; }),
		            roseType: 'radius',
		            label: {
		                normal: {
		                    textStyle: {
		                        color: 'rgba(255, 255, 255, 1)'
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    lineStyle: {
		                        color: 'rgba(255, 255, 255, 1)'
		                    },
		                    smooth: 0.2,
		                    length: 10,
		                    length2: 20
		                }
		            },
		            itemStyle: {
		                normal: {
		                    color: '#dbe059',
//		                    shadowBlur: 200,
//		                    shadowColor: 'rgba(0, 0, 0, 0.8)'
		                }
		            },
		
		            animationType: 'scale',
		            animationEasing: 'elasticOut',
		            animationDelay: function (idx) {
		                return Math.random() * 200;
		            }
		        }
		    ]
		};;
		if (option && typeof option === "object") {
		    myChart_age.setOption(option, true);
		}