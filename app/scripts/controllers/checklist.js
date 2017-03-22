angular.module('hotelApp')
	.controller("ctrl_ruzhulist", ["$scope", "$http", function($scope, $http) {

		//开始请求
		$http({
			url: "http://47.88.16.225:403/room",
			method: "get"
		}).then(function(data) {

			$scope.reqs = data.data
			console.log($scope.reqs)
				//123
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
				//状态
				if(data.data[i].zhuangtai == "0") {
					data.data[i].zhuangtai = "空房"
				} else if(data.data[i].zhuangtai == "1") {
					data.data[i].zhuangtai = "已预订"
				} else if(data.data[i].zhuangtai == "2") {
					data.data[i].zhuangtai = "已入住"
				} else if(data.data[i].zhuangtai == "3") {
					data.data[i].zhuangtai = "退房"
				}
			}

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
				if(data[i].zhuangtai == '已入住') {
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