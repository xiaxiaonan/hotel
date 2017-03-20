'use strict';

/**
 * @ngdoc function
 * @name hotelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hotelApp
 */
angular.module('hotelApp')
  .controller('sectionCtrl', ["$scope","$http",function ($scope,$http) {
    		$http({
				url:"http://47.88.16.225:403/room",
				method:"get",
			}).then(function(data) {
				$scope.item = data.data;
				for(var i=0;i<data.data.length;i++){
					// 类型
					if(data.data[i].leixing=="a"){
						data.data[i].leixing="豪华套房"
					}else if(data.data[i].leixing=="b"){
						data.data[i].leixing="标准间"
					}else if(data.data[i].leixing=="c"){
						data.data[i].leixing="大床房"
					}else if(data.data[i].leixing=="d"){
						data.data[i].leixing="商务房"
					}
					//状态
					if(data.data[i].zhuangtai=="0"){
						data.data[i].zhuangtai="空房"
					}else if(data.data[i].zhuangtai=="1"){
						data.data[i].zhuangtai="已预订"
					}else if(data.data[i].zhuangtai=="2"){
						data.data[i].zhuangtai="已入住"
					}else if(data.data[i].zhuangtai=="3"){
						data.data[i].zhuangtai="退房"
					}
				}
			}, function() {
				
			})
    
  }]);
