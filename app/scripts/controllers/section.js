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
		$http({
			url: "http://47.88.16.225:403/room",
			method: "get"
		}).then(function(data) {
			$scope.item = data.data;
			//				console.log(data)

			for(var i = 0; i < data.data.length; i++) {
				// 类型
				if(data.data[i].leixing == "a") {
					data.data[i].leixing = "豪华套房"
				} else if(data.data[i].leixing == "b") {
					data.data[i].leixing = "标准间"
				} else if(data.data[i].leixing == "c") {
					data.data[i].leixing = "大床房"
				} else if(data.data[i].leixing == "d") {
					data.data[i].leixing = "商务房"
				}
				

			}
		}, function() {

		})
		$scope.xinxi = function(id) {
			localStorage.setItem("xinxiid",id)
			$state.go("xinxi");

		}
	}]);