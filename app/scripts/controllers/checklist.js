angular.module('hotelApp')
	.controller("ctrl_ruzhulist", ["$scope", "$http", function($scope, $http) {

		//开始请求
		$http({
			url: "http://47.88.16.225:403/room",
			method: "get"
		}).then(function(data) {

			$scope.reqs = data.data
			//console.log($scope.reqs)
				//123
			

			//123

		}, function() {
			alert("erro")
		})
		$scope.isMMactive = true;
		$scope.isShow = true;
		$scope.isHide = false;
		//显示入住列表
		$scope.news = function() {
				$scope.isShow = true;
				$scope.isHide = false;
				$scope.isMMactive = true;
				$scope.isMMactive2 = false
			}
			//显示入住历史列表
		$scope.hist = function() {
			$scope.isShow = false;
			$scope.isHide = true;
			$scope.isMMactive = false;
			$scope.isMMactive2 = true
		}

	}])

//过滤数组
//入住和预定
.filter("numberToInt", function() {

		return function(data) {
			var array = [];
			for(var i = 0; i < data.length; i++) {
				if(data[i].zhuangtai == '入住') {
					array.push(data[i]);
				}
			}
			return array;
		}

	})
	//退房
	.filter("tuiberToInt2", function() {

		return function(data) {
			var array = [];
			for(var i = 0; i < data.length; i++) {
				if(data[i].zhuangtai == '退房') {
					array.push(data[i]);
				}
			}
			return array;
		}

	})