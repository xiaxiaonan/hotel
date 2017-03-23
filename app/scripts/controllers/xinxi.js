angular.module('hotelApp')
	.controller('xinxiCtrl', ["$scope", "$http", "$stateParams", "$state", function($scope, $http, $stateParams, $state) {
		//s时间插件
		var start = {
			format: 'YYYY年MM月DD日 hh:mm:ss',
			minDate: $.nowDate(0), //设定最小日期为当前日期
			insTrigger: true,
			isinitVal: true,
			festival: true,
			ishmsVal: false,
			maxDate: '2099-06-30 23:59:59', //最大日期
			choosefun: function(elem, datas) {
				//alert(datas);
				//日期对象
				function getDate(strDate) {
					var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
						function(a) {
							return parseInt(a, 10) - 1;
						}).match(/\d+/g) + ')');
					return date;
				};
				var date = getDate(datas);
				//				alert(date.valueOf());
				//				$scope.aa=date.valueOf()
				window.localStorage.ruzhuTimer = date.valueOf()
					//				console.log(aa)
				end.minDate = datas; //开始日选好后，重置结束日的最小日期
			}
		};
		//          console.log($scope.aa)
		var end = {
			format: 'YYYY年MM月DD日 hh:mm:ss',
			minDate: $.nowDate(0), //设定最小日期为当前日期
			insTrigger: true,
			isinitVal: true,
			festival: true,
			ishmsVal: false,
			maxDate: '2099-06-16 23:59:59', //最大日期
			choosefun: function(elem, datas) {
				//日期对象
				function getDate(strDate) {
					var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
						function(a) {
							return parseInt(a, 10) - 1;
						}).match(/\d+/g) + ')');
					return date;
				};
				//转化成时间戳
				var date = getDate(datas);
				date = new Date(date);
				window.localStorage.daoqiTimer = date.valueOf()
					//				alert(date.valueOf());
				start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期

			}

		};

		$('#inpstart').jeDate(start);
		$('#inpend').jeDate(end);

		//或者是
		$.jeDate('#inpstart', start);
		$.jeDate('#inpend', end);

		//时间插件end时间插件end
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
						"ruzhu": localStorage.ruzhuTimer,
						"daoqi": localStorage.daoqiTimer,
						"fangfei": $scope.item.fangfei,
						"zhuangtai": $scope.item.zhuangtai,
						"uid":localStorage.getItem("user")
					}
				}).then(function(data) {
					console.log(data)
					$state.go("nav.section");

				}, function() {

				})
			}
			//退房
		$scope.tui = function() {
				//提交到room2
				$http({
						url: "http://47.88.16.225:403/room2",
						method: "post",
						data: {
							
							"name": $scope.item.name,
							"tel": $scope.item.tel,
							"fangjianhao": $scope.item.fangjianhao,
							"shenfenzhenghao": $scope.item.shenfenzhenghao,
							"ruzhu": localStorage.ruzhuTimer,
							"daoqi": localStorage.daoqiTimer,
							"fangfei": $scope.item.fangfei,
							"zhuangtai": $scope.item.zhuangtai
						}
					}).then(function(data) {
						alert("提交room2成功")
						$http({
								url: "http://47.88.16.225:403/room?id=" + $scope.id,
								method: "post",
								data: {
									"name": '',
									"tel": '',
									"shenfenzhenghao": '',
									"ruzhu": '空房',
									"daoqi":'',
									"fangfei": '',
									"zhuangtai": ''
								}
							}).then(function() {}, function() {})
							$state.go("nav.section");
					}, function() {

					})
					//清空room1
			}
			//预订
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
			//入住
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