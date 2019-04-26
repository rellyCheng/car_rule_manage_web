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
		lnglats:[121.5520400000, 30.0329300000],
		projectName:'镇海区九龙湖镇ZH09-01-40地块项目（御水龙都4期）',
		name:'镇海区九龙湖镇ZH09-01-40地块项目（御水龙都4期）', //项目名称
		address:'宁波市镇海区九龙湖镇日湖路北侧、鸿山湖西南侧',//项目地址
		state:'在建',//项目状态
		num:'46',
		link:'systemDetails1.html'
	},
	{
		lnglats:[121.622035, 29.923042],
		projectName:'镇海新城镇海大道北侧1号地块（佳源都市）',
		name:'镇海新城镇海大道北侧1号地块（佳源都市）',
		address:'宁波市庄市街道西陆路附近',
		state:'完工',
		num:'9',
		link:'systemDetails2.html'
	},
	{
		lnglats:[121.61145, 29.91546],
		projectName:'迈新大厦建设',
		name:'迈新员工日常考勤',
		address:'宁波市国家大学科技园中官西路777号创E慧谷33号迈新科技楼',
		state:'在建',
		num:'99',
		link:'systemDetails3.html'
	},
	{
		lnglats:[121.61145, 29.914851],
		projectName:'常洪隧道以北路清项目二段工程',
		name:'常洪隧道以北路清项目二段工程',
		address:'宁波市国家大学科技园（中官西路777号）汇智大厦601室',
		state:'在建',
		num:'52',
		link:'systemDetails4.html'
	},
];

//  构建信息窗体
var infoWindow = new AMap.InfoWindow({
	offset: new AMap.Pixel(0, -31)
});


for (var i = 0, marker; i < data.length; i++) {
	var marker = new AMap.Marker({
		position: data[i].lnglats,
		map: map,
	});
	  var html = '<div class="opencontent" value="'+ data[i].projectName +'">'+
				'<div class="openbox"><div class="t1">项目名称:</div><p class="t2">'+data[i].name+'</p></div>'+
				'<div class="openbox"><p class="t1">项目地址:</p><p class="t2">'+data[i].address+'</p></div>'+
				'<div class="openbox"><p class="t1">项目状态:</p><p class="t2">'+data[i].state+'</p></div>'+
				'<div class="openbox"><p class="t1">在册人数:</p><p class="t2">'+data[i].num+'人</p></div>'+
				'<div class="openbox"><p class="t1">项目详情:</p><a class="t2" href="'+data[i].link+'">点击查看</a></div>'+
				'<div>';
	marker.content = html;
	marker.on('click', markerClick);
}

var value = '';
$(function(){
		select(value);
		infoWindow.open(map,marker.getPosition());
		AMap.event.trigger(marker, 'click', markerClick);
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
			projectName:value,		
			pageSize:'100',
			pageIndex:1
		},
		success:function(result){
			console.log(JSON.parse(result).Result);
			var html = '';
			var data = JSON.parse(result).Result;
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
