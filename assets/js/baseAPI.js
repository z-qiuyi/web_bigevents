//注：每次调用$.get()或$.post()或$.ajax()时，
// 会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //    在发起ajax请求之前，统一拼接请求的跟路径
    options.url = 'http://ajax.frontend.itheima.net'
        + options.url
})