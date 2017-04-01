angular.module('hotelApp')
	.controller('xinxiCtrl', ["$scope", "$http", "$stateParams", "$state", function($scope, $http, $stateParams, $state) {
		//	未登录禁止进去此页面
		if(localStorage.getItem("user") == "" || localStorage.getItem("user") == undefined) {
			$state.go("login")
		}
		
		$scope.qx_click = function(){
			$scope.qxshow = true;
		}
		$scope.qx_clicka = function(){
			$scope.qxshow = false;
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
			language: 'zh-CN',//中文，需要引用zh-CN.js包
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
			language: 'zh-CN',//中文，需要引用zh-CN.js包
		});	
		$('.form_datetime3').datetimepicker({
			//language:  'fr',
			format: 'yyyy-mm-dd hh:i',
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			showMeridian: 1,
			language: 'zh-CN',//中文，需要引用zh-CN.js包
		});

		//时间时间时间end
		$scope.ruzhubaocun = function(id) {
			//保存时间
			//日期对象
					var ruzhuTimer = $("#ruzhumm").val();
					var daoqiTimer = $("#daoqimm").val();
                    $scope.ruzhuTimer1 = Date.parse(new Date(ruzhuTimer));
                     $scope.ruzhuTimer2 = Date.parse(new Date(daoqiTimer));
					//转化成时间戳
					
			//保存时间
			//计算房费
			$scope.fangfeiM = $scope.item.yajin * parseInt(( $scope.ruzhuTimer2-  $scope.ruzhuTimer1) / 1000 / 86400)



//计算房费
				if($scope.item.name && $scope.item.tel && $scope.item.shenfenzhenghao) {

					$http({
						url: "http://47.88.16.225:403/room?id=" + $scope.id,
						method: "put",
						data: {
							"name": $scope.item.name,
							"tel": $scope.item.tel,
							"fangjianhao": $scope.item.fangjianhao,
							"shenfenzhenghao": $scope.item.shenfenzhenghao,
							"ruzhu":$scope.ruzhuTimer1,
							"daoqi": $scope.ruzhuTimer2,
							"fangfei": $scope.fangfeiM,
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
		
//续住
$scope.timrNew=function(){
	//保存时间
			//日期对象
					var ruzhuTimerM = $("#ruzhuNew").val();
					var daoqiTimerM = $("#xuzhuNew").val();
                     $scope.ruzhuTimer1 = Date.parse(new Date(ruzhuTimerM));
                     $scope.xuzhuTimer2 = Date.parse(new Date(daoqiTimerM));
					//转化成时间戳
					
			//保存时间
			//计算房费
			$scope.fangfeiNew = $scope.item.yajin * parseInt(( $scope.xuzhuTimer2-  $scope.ruzhuTimer1) / 1000 / 86400)



//计算房费
	
	$http({
		url: "http://47.88.16.225:403/room?id=" + $scope.id,
		method: "put",
		data:{
			"daoqi": $scope.xuzhuTimer2,
			"fangfei": $scope.fangfeiNew,
		}
	}).then(function(){
		$state.go("nav.section")
	},function(){
		
	})
}
//续住
		
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
				    $scope.ruzhuHO=$("#ruzhumm").attr("placeholder");
			        $scope.daoqiHO=$("#daoqimm").attr("placeholder");
					$scope.tuihide = true;
					$http({
						url: "http://47.88.16.225:403/room2",
						method: "post",
						data: {

							"name": $scope.item.name,
							"tel": $scope.item.tel,
							"fangjianhao": $scope.item.fangjianhao,
							"shenfenzhenghao": $scope.item.shenfenzhenghao,
							"ruzhu": $scope.ruzhuHO,
							"daoqi":  $scope.daoqiHO,
							"fangfei": $scope.item.fangfei,
							"zhuangtai": $scope.item.zhuangtai,
							"leixing":$scope.item.leixing,
							"yajin":$scope.item.yajin,
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

