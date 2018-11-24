/*
* create by lixy 20150628
* Just for DMap(tuteng) Project
* copyright@ 2015
*/
"use strict";

!function(a) {
    a.app.service('ajaxService', ['$http', function ($http) {

        this.uuid = function() {//xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
            var timeSpan = function() {
                var date=new Date();
                var y = date.getFullYear();
                var M = date.getMonth() + 1;
                var d = date.getDate();
                var H = date.getHours();
                var m = date.getMinutes();
                var s = date.getSeconds();
                var S = parseInt(date.getMilliseconds()/10);//2 bytes

                var spaceTag = function(v) {
                    if(v<10) {
                        return "0";
                    }
                    return "";
                };
                // yyyyMMdd-HHmm-ssSS
                return y+spaceTag(M)+M+spaceTag(d)+d + "-" + spaceTag(H)+H + spaceTag(m)+m + "-"+ spaceTag(s)+s + spaceTag(S)+S;

            };
            return timeSpan() + ('-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            }));
        };

        this.AjaxPost = function (data, route, successFunction, errorFunction) {
            var uuid = this.uuid();
            setTimeout(function () {
                //$http.post(route, data).success(function (response, status, headers, config) {
                $http({
                    method: 'POST',
                    url: route,
                    data: data,
                    headers:{'X-Requested-With':'XMLHttpRequest','Content-Type': 'application/json','traceID': uuid}
                }).success(function (response, status, headers, config) {
                    if(response.code=='0011111100000001' && response.data.redirectUrl!=null) {
                        window.location = response.data.redirectUrl;
                    }else {
                        successFunction(response, status);
                    }
                }).error(function (response) {            
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            }, 1000);

        };

        this.AjaxPostWithNoAuthenication = function (data, route, successFunction, errorFunction) {
            var uuid = this.uuid();
            setTimeout(function () {
                //$http.post(route, data).success(function (response, status, headers, config) {
                $http({
                    method: 'POST',
                    url: route,
                    data: data,
                    headers:{'Content-Type': 'application/json','traceId': uuid}
                }).success(function (response, status, headers, config) {
                    successFunction(response, status);
                }).error(function (response) {          
                    errorFunction(response);
                });
            }, 1000);

        };

        this.AjaxGet = function (route, successFunction, errorFunction) {
            var uuid = this.uuid();
            setTimeout(function () {
                $http({
                    method: 'GET',
                    url: route,
                    headers:{'Content-Type': 'application/json','traceId': uuid}
                }).success(function (response, status, headers, config) {
                    successFunction(response, status);
                }).error(function (response) {
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            }, 1000);

        };

        this.AjaxGetWithData = function (data, route, successFunction, errorFunction) {
            var uuid = this.uuid();
            setTimeout(function () {
                $http({
                    method: 'GET',
                    url: route,
                    params: data,
                    headers:{'Content-Type': 'application/json','traceId': uuid}
                }).success(function (response, status, headers, config) {
                    successFunction(response, status);
                }).error(function (response) {
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            }, 1000);

        };

        this.AjaxGetWithNoBlock = function (data, route, successFunction, errorFunction) {            
            setTimeout(function () {
                $http({
                    method: 'GET',
                    url: route,
                    params: data,
                    headers:{'Content-Type': 'application/json','traceId': uuid}
                }).success(function (response, status, headers, config) {
                    successFunction(response, status);
                }).error(function (response) {
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            }, 0);

        }

    }]);
    
}(this);
