angular.module('hotelApp')
	.controller('xinxiCtrl', ["$scope", "$http", "$stateParams", "$state", function($scope, $http, $stateParams, $state) {
		//	未登录禁止进去此页面
		if(localStorage.getItem("user") == "" || localStorage.getItem("user") == undefined) {
			$state.go("login")
		}

		$scope.item = {
			name: '',
			shenfenzhenghao: '',
			tel: ''
		}
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

		$scope.xnsussce = false;
		$scope.xnsussces = false;
		$scope.sh_text = ''
			//		console.log(localStorage.ruzhuTimer)
		$scope.xnhide = function() {
			$scope.xnsussce = false;
		}
		$scope.item = []
		//时间时间时间	
		$('.form_datetime').datetimepicker({
			//language:  'fr',
			format: 'yyyy-mm-dd hh:i',
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			showMeridian: 1,

		});
         $('.form_datetime2').datetimepicker({
			//language:  'fr',
			format: 'yyyy-mm-dd hh:i',
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			showMeridian: 1,

		});
		//时间时间时间end
		$scope.ruzhubaocun = function(id) {
			//保存时间
			//日期对象
					function getDate(strDate) {
						var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
							function(a) {
								return parseInt(a, 10) - 1;
							}).match(/\d+/g) + ')');
						return date;
					};
					//转化成时间戳
					var date1 = getDate($("#ruzhumm").val());
					var date2 = getDate($("#daoqimm").val());
					date1 = new Date(date1);
					date2 = new Date(date2);
					window.localStorage.ruzhuTimer = date1.valueOf()
					window.localStorage.daoqiTimer = date2.valueOf()
					//console.log(localStorage.ruzhuTimer)
					//console.log(localStorage.daoqiTimer)
			//保存时间
				if($scope.item.name && $scope.item.tel && $scope.item.shenfenzhenghao) {

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
							"fangfei": localStorage.fangfei,
							"zhuangtai": $scope.item.zhuangtai,
							"uid": localStorage.getItem("user")
						}
					}).then(function(data) {
						//						console.log(data)
						$scope.xnsussces = true;
						$http({
							url: "http://47.88.16.225:403/room?id=" + $scope.id,
							method: "get"
						}).then(function(data) {
							$scope.item = data.data;
							//console.log(data)
							//								console.log($scope.item.id)
							$state.go("nav.section");
						}, function() {

						})

					}, function() {

					})
				} else if(!($scope.item.name)) {
					$scope.xnsussce = true;
					$scope.sh_text = '请填写用户名'
				} else if(!($scope.item.shenfenzhenghao)) {
					$scope.xnsussce = true;
					$scope.sh_text = '请填写身份证号'
				} else if(!($scope.item.tel)) {
					$scope.xnsussce = true;
					$scope.sh_text = '请输入手机号'
				}
			}
			//退房
		$scope.tuihide = false;
		$scope.xntruetui = false;
		$scope.xnremove = function() {
			$scope.xntruetui = false;
		}

		$scope.tui = function() {
			$scope.xntruetui = true;
		}
		$scope.xntrue = function() {
			$scope.xntruetui = false;
			//提交到room2
			$scope.tuihide = function() {
					$scope.tuihide = true;
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
							"zhuangtai": $scope.item.zhuangtai,
							"uid": localStorage.getItem("user")
						}
					}).then(function(data) {
						$http({
							url: "http://47.88.16.225:403/room?id=" + $scope.id,
							method: "post",
							data: {
								"name": '',
								"tel": '',
								"shenfenzhenghao": '',
								"ruzhu": '',
								"daoqi": '',
								"zhuangtai": "空房",
								"fangfei": ''
							}
						}).then(function() {
							$state.go("nav.section");
						}, function() {})

					}, function() {

					})
				}
				//清空room1
		}
		$scope.hui = function() {
				$state.go("nav.section");
			}
			//修改房间
		$scope.wbsussce = false;
		$scope.wb_xiugai_show = false;
		$scope.wb_xiugai = function() {
			$http({
				url: "http://47.88.16.225:403/room/" + $scope.item.id,
				method: "put",
				data: {
					fangjianhao: $scope.item.fangjianhao,
					leixing: $scope.item.leixing,
					yajin: $scope.item.yajin
				}
			}).then(function(data) {
				$scope.wbsussce = false;
				$scope.wb_xiugai_show = false;
				//if(data.d)
				$state.go("nav.section");
			}, function() {

			})
		}
		$scope.wbm_xiugai = function() {
			$scope.wbsussce = true;
			$scope.wb_xiugai_show = true;
		}
		$scope.wb_xiugai_qx = function() {
				$scope.wbsussce = false;
				$scope.wb_xiugai_show = false;
			}
			//删除房间
		$scope.wb_remove_qr = function() {
			$http({
				url: "http://47.88.16.225:403/room/" + $scope.item.id,
				method: "delete",
			}).then(function(data) {
				$scope.wb_remove_box = false;
				$state.go("nav.section");
			}, function() {})
		}
		$scope.wb_remove_qx = function() {
			$scope.wb_remove_box = false;
		}
		$scope.wb_remove_box = false;
		$scope.wb_remove = function() {
			$scope.wb_remove_box = true;
		}

	}]);

//计算房费
//				window.localStorage.fangfei = $scope.item.yajin * parseInt((localStorage.daoqiTimer - localStorage.ruzhuTimer) / 1000 / 86400)

//计算房费