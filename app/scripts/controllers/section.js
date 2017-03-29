'use strict';

/**
 * @ngdoc function
 * @name hotelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hotelApp
 */
angular.module('hotelApp')
	.controller('sectionCtrl', ["$scope", "$http", "$state", function($scope, $http, $state) {
		
		//	未登录禁止进去此页面
		if(localStorage.getItem("user")=="" || localStorage.getItem("user")==undefined){
	    	 $state.go("login")
	    }
		$scope.xnlocal = true;
		$scope.req = '^[0-9]*$';
		$scope.showtrue = function(){
			$scope.showa = true;
		}
		$scope.showfalse = function(){
			$scope.showa = false;
		}
		$scope.showb = false;
		$scope.fscha = function(){
			$scope.showb = false;
		}
		$scope.leixing="标准间";
//		$scope.req = '^[0-9]*$';
		$scope.fs_xg_text='';
		
	$scope.bc = function() {
		$scope.num=false;
		console.log($scope.item)
		if(!($scope.fangjianhao)){
			$scope.showb = true;
			$scope.fs_xg_text='请输入房间号';
		}else if(!($scope.yajin)){
			$scope.showb = true;
			$scope.fs_xg_text='请输入押金';
		}else{
			for(var i=0;i<$scope.item.length;i++){
				if($scope.item[i].fangjianhao==$scope.fangjianhao){
					$scope.showb = true;
					$scope.fs_xg_text='房间号重复';
					return;
				}else{
					$scope.num=true;
					
				}
			}
		}
		
		if($scope.num){
			$http({
				url:"http://47.88.16.225:403/room",
				method:"post",
				data:{
					fangjianhao:$scope.fangjianhao,
					zhuangtai:'空房',
					leixing:$scope.leixing,
					yajin:$scope.yajin
				}
			}).then(function(data) {
				$scope.showa = false;
				$scope.fangjianhao='';
				$scope.yajin='';
				$http({
					url: "http://47.88.16.225:403/room",
					method: "get"
				}).then(function(data) {
					$scope.item = data.data;
//					console.log(data)
					//window.location.reload();
				}, function() {
		
				})
			}, function() {
				alert("2")
			})
		}
	}

		
		
		
		//window.location.reload(1);
		
		
		$scope.kong =false;
		$scope.yu =false;
		$scope.ru =false;
		$scope.biao =false;
		$scope.da =false;
		$scope.shang =false;
		$scope.hao =false;
		$scope.wbm_kong=function(){
			$scope.kong =true;
			$scope.yu =false;
			$scope.ru =false;
			$scope.biao =false;
			$scope.da =false;
			$scope.shang =false;
			$scope.hao =false;
		}
		$scope.wbm_yu=function(){
			$scope.kong =false;
			$scope.yu =true;
			$scope.ru =false;
			$scope.biao =false;
			$scope.da =false;
			$scope.shang =false;
			$scope.hao =false;
		}
		$scope.wbm_ru=function(){
			$scope.kong =false;
			$scope.yu =false;
			$scope.ru =true;
			$scope.biao =false;
			$scope.da =false;
			$scope.shang =false;
			$scope.hao =false;
		}
		$scope.wbm_biao=function(){
			$scope.kong =false;
			$scope.yu =false;
			$scope.ru =false;
			$scope.biao =true;
			$scope.da =false;
			$scope.shang =false;
			$scope.hao =false;
		}
		$scope.wbm_da=function(){
			$scope.kong =false;
			$scope.yu =false;
			$scope.ru =false;
			$scope.biao =false;
			$scope.da =true;
			$scope.shang =false;
			$scope.hao =false;
		}
		$scope.wbm_shang=function(){
			$scope.kong =false;
			$scope.yu =false;
			$scope.ru =false;
			$scope.biao =false;
			$scope.da =false;
			$scope.shang =true;
			$scope.hao =false;
		}
		$scope.wbm_hao=function(){
			$scope.kong =false;
			$scope.yu =false;
			$scope.ru =false;
			$scope.biao =false;
			$scope.da =false;
			$scope.shang =false;
			$scope.hao =true;
		}
		$scope.wbm_quan=function(){
			$scope.kong =false;
			$scope.yu =false;
			$scope.ru =false;
			$scope.biao =false;
			$scope.da =false;
			$scope.shang =false;
			$scope.hao =false;
		}
		$http({
			url: "http://47.88.16.225:403/room",
			method: "get"
		}).then(function(data) {
			$scope.item = data.data;
			$scope.xnlocal = false;
			//				console.log(data)
			//window.location.reload();
		}, function() {

		})
		$scope.item = [];
		$scope.xinxi = function(id) {
			localStorage.setItem("xinxiid",id)
			
			$state.go("xinxi");
			return false
		}
			
	}])
	.filter("mykongfang", function () {
        return function (data) {
            var output = [];
            angular.forEach(data, function (value, key) {
                /*indexOf字符串出现的位置，没有则返回-1*/
                //方法一：
//                if (value.phone.indexOf("555") >= 0) {
//                    output.push(value);
//                }
                //方法二：
                if (value.zhuangtai.indexOf("空房") !== -1) {
                    output.push(value);
                }
            });
            return output;
        }
    })
	.filter("myyuding", function () {
        return function (data) {
            var output = [];
            angular.forEach(data, function (value, key) {
                /*indexOf字符串出现的位置，没有则返回-1*/
                //方法一：
//                if (value.phone.indexOf("555") >= 0) {
//                    output.push(value);
//                }
                //方法二：
                if (value.zhuangtai.indexOf("预订") !== -1) {
                    output.push(value);
                }
            });
            return output;
        }
    })
	.filter("myruzhu", function () {
        return function (data) {
            var output = [];
            angular.forEach(data, function (value, key) {
                /*indexOf字符串出现的位置，没有则返回-1*/
                //方法一：
//                if (value.phone.indexOf("555") >= 0) {
//                    output.push(value);
//                }
                //方法二：
                if (value.zhuangtai.indexOf("入住") !== -1) {
                    output.push(value);
                }
            });
            return output;
        }
    })
	.filter("mybiaozhun", function () {
        return function (data) {
            var output = [];
            angular.forEach(data, function (value, key) {
                /*indexOf字符串出现的位置，没有则返回-1*/
                //方法一：
//                if (value.phone.indexOf("555") >= 0) {
//                    output.push(value);
//                }
                //方法二：
                if (value.leixing.indexOf("标准间") !== -1) {
                    output.push(value);
                }
            });
            return output;
        }
    })
	.filter("mydachuang", function () {
        return function (data) {
            var output = [];
            angular.forEach(data, function (value, key) {
                /*indexOf字符串出现的位置，没有则返回-1*/
                //方法一：
//                if (value.phone.indexOf("555") >= 0) {
//                    output.push(value);
//                }
                //方法二：
                if (value.leixing.indexOf("大床房") !== -1) {
                    output.push(value);
                }
            });
            return output;
        }
    })
	.filter("myshangwu", function () {
        return function (data) {
            var output = [];
            angular.forEach(data, function (value, key) {
                /*indexOf字符串出现的位置，没有则返回-1*/
                //方法一：
//                if (value.phone.indexOf("555") >= 0) {
//                    output.push(value);
//                }
                //方法二：
                if (value.leixing.indexOf("商务房") !== -1) {
                    output.push(value);
                }
            });
            return output;
        }
    })
	.filter("myhaohua", function () {
        return function (data) {
            var output = [];
            angular.forEach(data, function (value, key) {
                /*indexOf字符串出现的位置，没有则返回-1*/
                //方法一：
//                if (value.phone.indexOf("555") >= 0) {
//                    output.push(value);
//                }
                //方法二：
                if (value.leixing.indexOf("豪华套房") !== -1) {
                    output.push(value);
                }
            });
            return output;
        }
    })

	
