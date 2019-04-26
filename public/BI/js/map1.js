  //加载天气查询插件
  AMap.plugin('AMap.Weather', function() {
	//创建天气查询实例
	var weather = new AMap.Weather();

	//执行实时天气信息查询
	weather.getForecast('宁波市', function(err, data) {

		var html =
		'<span>'+data.city+'</span>'+
		'<span><span>'+data.forecasts[0].nightTemp+'</span>～<span>'+data.forecasts[0].dayTemp+'<span> ℃</span>'+
		'<span>'+data.forecasts[0].dayWeather+'</span>';
		$('.weather').html(html);
	});
});

//lay插件
layui.use('element', function(){
  var element = layui.element;
});
//初始化地图对象，加载地图
var map = new AMap.Map("container", {
	resizeEnable: true,
	center: [121.5502700000, 29.8738600000],//宁波市
	zoom: 10 //地图显示的缩放级别
});

var district = null;
var polygons=[];
function drawBounds() {
	//加载行政区划插件
	if(!district){
		//实例化DistrictSearch
		var opts = {
			subdistrict: 0,   //获取边界不需要返回下级行政区
			extensions: 'all',  //返回行政区边界坐标组等具体信息
			level: 'district'  //查询行政级别为 市
		};
		district = new AMap.DistrictSearch(opts);
	}
	//行政区查询
	district.setLevel(document.getElementById('level').value)
	district.search(document.getElementById('district').value, function(status, result) {
		map.remove(polygons)//清除上次结果
		polygons = [];
		var bounds = result.districtList[0].boundaries;
		if (bounds) {
			for (var i = 0, l = bounds.length; i < l; i++) {
				//生成行政区划polygon
				var polygon = new AMap.Polygon({
					strokeWeight: 1,
					path: bounds[i],
					fillOpacity: 0.4,
					fillColor: '#80d8ff',
					strokeColor: '#0091ea'
				});
				polygons.push(polygon);
			}
		}
		map.add(polygons)
		map.setFitView(polygons);//视口自适应
	});
}
drawBounds();
document.getElementById('draw').onclick = drawBounds;
document.getElementById('district').onkeydown = function(e) {
	if (e.keyCode === 13) {
		drawBounds();
		return false;
	}
	return true;
};




//添加标记的经纬度
var data = [	
{
		lnglats:[121.6284584999,29.9234544601],
		index:'1',
		name:'镇海新城南区同心路地块地下公共停车场工程', //项目名称
		address:'镇海区庄市街道同心路西侧、庄市大道北侧地块',//项目地址
		state:'在建',//项目状态
		num:'21',
		link:'systemDetailsd4.html'
	},
{
		lnglats:[121.6323101521,29.9252583728],
		index:'1',
		name:'镇海绿城核心ZH06-07-15地块（万科酒店）', //项目名称
		address:'镇海区庄市街道同心路西侧、庄市大道北侧地块',//项目地址
		state:'在建',//项目状态
		num:'15',
		link:'systemDetailsd2.html'
	},
{
		lnglats:[121.6231155396, 29.9337381838],
		index:'1',
		name:'镇海1688新青年广场（西区）项目', //项目名称
		address:'宁波市镇海区庄市街道同心路南段北侧、明海路东侧、人工湖南侧',//项目地址
		state:'在建',//项目状态
		num:'46',
		link:'systemDetailsd1.html'
	},
	{
		lnglats:[121.5520400000, 30.0329300000],
		index:'1',
		name:'镇海区九龙湖镇ZH09-01-40地块项目（御水龙都4期）', //项目名称
		address:'宁波市镇海区九龙湖镇日湖路北侧、鸿山湖西南侧',//项目地址
		state:'在建',//项目状态
		num:'46',
		link:'systemDetails1.html'
	},
	{
		lnglats:[121.6003274918, 29.9685400000],
		index:'2',
		name:'镇海新城镇海大道北侧1号地块（佳源都市）',
		address:'宁波市镇海区骆驼街道金华村',
		state:'在建',
		num:'15',
		link:'systemDetails2.html'
	},
	{
		lnglats:[121.6001665592, 29.9543303299],
		index:'5',
		name:'吾悦广场镇海新城北区ZH07-07-02地块二期||标段',
		address:'镇海新城北区',
		state:'在建',
		num:'21',
		link:'systemDetails4.html'
	},
	{
		lnglats:[121.6222690000, 29.9233990000],
		index:'3',
		name:'宁波萌恒总部大楼',
		address:'镇海区庄市街道东南方向',
		state:'在建',
		num:'50',
		link:'systemDetails3.html'
	}
];

//  构建信息窗体
var infoWindow = new AMap.InfoWindow({
	offset: new AMap.Pixel(0, -31),
	//设置点击地图关闭
	closeWhenClickMap:true
});


for (var i = 0, marker; i < data.length; i++) {
	var marker = new AMap.Marker({
		position: data[i].lnglats,
		map: map,
	});
	  var html = '<div class="opencontent" value="'+ data[i].index +'">'+
				'<div class="openbox"><div class="t1">项目名称:</div><p class="t2">'+data[i].name+'</p></div>'+
				'<div class="openbox"><p class="t1">项目地址:</p><p class="t2">'+data[i].address+'</p></div>'+
				'<div class="openbox"><p class="t1">项目状态:</p><p class="t2">'+data[i].state+'</p></div>'+
				'<div class="openbox"><p class="t1">在册人数:</p><p class="t2">'+data[i].num+'人</p></div>'+
				'<div class="openbox"><p class="t1">项目详情:</p><a class="t2" href="'+data[i].link+'">点击查看</a></div>'+
				'<div>';
	marker.content = html;
	//鼠标移上去出现框
	marker.on('mouseover', markerClick);
	
}

var value = '';
$(function(){
		select(value);
		infoWindow.open(map,marker.getPosition());
		AMap.event.trigger(marker, 'mouseover', markerClick);
	});
	
function markerClick(){    	
	console.log(this.getPosition());
	infoWindow.setContent(this.content); //获取信息窗体的内容
	console.log(infoWindow)
	infoWindow.open(map, this.getPosition()); //在地图的指定位置上打开信息窗体               
	console.log(this.content);
	var element = $(this.content).get(0);
	var jqueryobj=$(element);//jqueryobj就是一个Jquery对象。
	console.log(jqueryobj.attr("value"));
	value = jqueryobj.attr("value");
  //通过获取value的值去查找项目的工人
	console.log(value);
	select(value);
}

map.setFitView(); //自动适应显示你想显示的范围区域
	var imgUrl = 'http://app.winshe.cn';
  function select(value){
		$.ajax({
		type:"post",
		url:"http://app.winshe.cn/WebService.asmx/GetProjectMigrantWorker",
		data:{
			projectName:'迈新大厦建设',		
			pageSize:'20',
			pageIndex:value
		},
		success:function(result){
			console.log(JSON.parse(result).Result);
			var html = '';
			var data = JSON.parse(result).Result;
			
			for(var i=data.length;i>0;i--){	    
			//排除指定的人
			var name = data[i-1].Name;
			if(name== '范飞武' || name == '邹庆蓉' || name=='张淑河'){
					data.splice(i - 1, 1);
				}
			}
			
			$('#worker').html('');
			for(var i=0;i<data.length;i++){	       
				
				
				if (i % 5 == 0) {
			html += '<div class="swiper-slide">';
			}
				
				var photoPath = 'http://app.winshe.cn'+data[i].PhotoPath;
				if(data[i].PhotoPath ==""){
								console.log(photoPath);
								photoPath = 'img/worker.png';
				}
				html +='<a href="javascript:;" class="workerbox">'+
								   '<div class="imgbox">'+
//						       		<img src="img/worker.png" alt="" />
											'<img src='+photoPath+' alt="" class="workerimg"/>'+
										'</div>'+					
										'<div class="textbox">'+
											'<p>'+
												'<span>'+data[i].Name+'</span>'+
												'<span>'+data[i].Sex+'</span>'+
												'<span>'+data[i].Age+'岁</span>'+
												'<span>'+data[i].WorkType+'</span>'+
											'</p>'+
											'<p>联系方式：'+data[i].LealPersonPhone+'</p>'+
										'</div>'+
							   '</a>';
						if (i % 5 == 4 || i == data.length - 1) {
			html += '</div>';
		  }
					
			}	        	
			$('#worker').append(html);
					swiper('workerBox','workerSize','vertical',2000);
		}
	  });
}	


//查看详情
function details(obj){
	window.location.href="systemDetails.html?";
}
$(function(){
swiper('videoBox','videoSize','horizontal',10000);
})


function swiper(container,pagination,mode,autoplay){
var mySwiper = new Swiper('#'+container,{
		pagination: '#'+pagination,//分页器
		paginationClickable: false,// 滑动之后， 定时器也不会被清除
		mode:mode,//轮播图的方向
		autoplay:autoplay,//自动播放的时间
		speed:2000,//播放速度
		loop : true//循环轮播
});
}


// function cancel(){
// $(".videoBox").hide();
// }
