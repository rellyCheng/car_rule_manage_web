//回调函数
function receiveMessageFromIndex ( event ) {
    console.log( '我是iframe,我接受到了：', event.data );
}

//监听message事件
window.addEventListener("message", receiveMessageFromIndex, false);
