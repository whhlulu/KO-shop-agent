window.API_URL = 'http://sapi.fzxbwl.com';
(function(w) {

    //截取当前访问者的url 参数
    this.split_url = function(name) {
            var url = window.location.href;
            var index = url.indexOf(name);

            if (index === -1) {
                return '';
            }
            var urlParam = url.substring(url.indexOf(name) + 1);

            return urlParam;
        },

        window.getInfo = {
            split_url: this.split_url,
        };



})(window);

//每过1小时清理token
(function() {

    var token = sessionStorage.getItem("data_token");

    if (token === 'undefined' || token === null) {
        return;
    }

    setTimeout(function() {
        sessionStorage.clear();
        window.parent.location.href = "/#/login";
    }, 3600000);
})();