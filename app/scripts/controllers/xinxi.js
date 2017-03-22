angular.module('hotelApp')
	.controller('xinxiCtrl', ["$scope", "$http", "$stateParams", "$state", function($scope, $http, $stateParams, $state) {
		$scope.id = localStorage.getItem("xinxiid");
		$http({
				url: "http://47.88.16.225:403/room?id=" + $scope.id,
				method: "get"
			}).then(function(data) {
				$scope.item = data.data;
				//console.log(data)
			}, function() {

			})
			//入住保存
		$scope.ruzhubaocun = function(id) {
			//			alert(1);
			$http({
				url: "http://47.88.16.225:403/room?id=" + $scope.id,
				method: "put",
				data: {
					"name": $scope.item.name,
					"tel": $scope.item.tel,
					"fangjianhao": $scope.item.fangjianhao,
					"shenfenzhenghao": $scope.item.shenfenzhenghao,
					"ruzhu": $scope.item.ruzhu,
					"daiqi": $scope.item.daoqi,
					"fangfei": $scope.item.fangfei,
					"zhuangtai": $scope.item.zhuangtai
				}
			}).then(function(data) {
				console.log(data)
				$state.go("nav.section");

			}, function() {

			})
		}

		$scope.tui = function(id) {
			$http({
				url: "http://47.88.16.225:403/room?id=" + $scope.id,
				method: "put",
				data: {
					"name": "",
					"tel": "",
					"shenfenzhenghao":"",
					"ruzhu": "",
					"daiqi": "",
					"fangfei": "",
					"zhuangtai": "空房"
				}
			}).then(function(data) {
				$scope.item.name = "";
				$scope.item.tel = "";
				$scope.item.ruzhu = "";
				$scope.item.daoqi = "";
				$scope.item.fangfei = "";
				$scope.item.zhuangtai = "空房";
				$state.go("nav.section");
			}, function() {

			})
		}
		$scope.ding = function(id) {
			$http({
				url: "http://47.88.16.225:403/room?id=" + $scope.id,
				method: "put",
				data: {
					"zhuangtai": "预订"
				}
			}).then(function(data) {
				$scope.item.zhuangtai = "预订";
				$state.go("nav.section");
			}, function() {

			})
		}
		$scope.zhu = function(id) {

			$http({
				url: "http://47.88.16.225:403/room?id=" + $scope.id,
				method: "put",
				data: {
					"zhuangtai": "入住"
				}
			}).then(function(data) {
				$scope.item.zhuangtai = "入住";
				$state.go("nav.section");
			}, function() {

			})
		}
		$scope.hui = function() {
			$state.go("nav.section");
		}
	}]);