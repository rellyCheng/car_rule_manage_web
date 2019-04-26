var map = new AMap.Map('container',{
    viewMode:'3D'
});
//设置光照属性
map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.9);
map.DirectionLight = new AMap.Lights.DirectionLight([0, -1, 1], [1, 1, 1], 0.1);

var object3Dlayer = new AMap.Object3DLayer();
map.add(object3Dlayer);