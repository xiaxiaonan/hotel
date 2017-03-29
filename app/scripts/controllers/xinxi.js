angular.module('hotelApp')
	.controller('xinxiCtrl', ["$scope", "$http", "$stateParams", "$state", function($scope, $http, $stateParams, $state) {
		//	未登录禁止进去此页面
		if(localStorage.getItem("user")=="" || localStorage.getItem("user")==undefined){
	    	 $state.go("login")
	    }
		//s时间插件
		var start = {
			format: 'YYYY-MM-DD hh:mm:ss',
		    minDate: $.nowDate(0), //设定最小日期为当前日期
		    isinitVal:true,
		    festival:true,
		    ishmsVal:false,
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
			 format: 'YYYY-MM-DD hh:mm:ss',
		    minDate: $.nowDate(0), //设定最小日期为当前日期
		    isinitVal:true,
		    festival:true,
		    ishmsVal:false,
		    maxDate: '2099-06-30 23:59:59', //最大日期
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
				//计算房费
				window.localStorage.fangfei = $scope.item.yajin * parseInt((localStorage.daoqiTimer - localStorage.ruzhuTimer) / 1000 / 86400)

				//计算房费

			}

		};

		$('#inpstart').jeDate(start);
		$('#inpend').jeDate(end);
           
		//或者是
//		$.jeDate('#inpstart', start);
//		$.jeDate('#inpend', end);
		//console.log($scope.id)
		//时间插件end时间插件end
		$scope.item={
			name:'',
			shenfenzhenghao:'',
			tel:''
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
		$scope.sh_text=''
		//		console.log(localStorage.ruzhuTimer)
		$scope.xnhide = function() {
						$scope.xnsussce = false;
					}
		$scope.item=[]
		$scope.ruzhubaocun = function(id) {
				//			alert(1);
			 if($scope.item.name && $scope.item.tel && $scope.item.shenfenzhenghao ){
					
					
						
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
					}else if(!($scope.item.name)) {
					$scope.xnsussce = true;
					$scope.sh_text='请填写用户名'
				}else if(!($scope.item.shenfenzhenghao)) {
					$scope.xnsussce = true;
					$scope.sh_text='请填写身份证号'
				}else if(!($scope.item.tel)) {
					$scope.xnsussce = true;
					$scope.sh_text='请输入手机号'
				}
			}
			//退房
		$scope.tuihide = false;
		$scope.xntruetui = false;
		$scope.xnremove = function(){
			$scope.xntruetui = false;
		}
		
		$scope.tui = function() {
			$scope.xntruetui = true;
		}
		$scope.xntrue = function(){
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
		$scope.wb_xiugai_show=false;
		$scope.wb_xiugai = function(){
			$http({
				url:"http://47.88.16.225:403/room/"+$scope.item.id,
				method:"put",
				data:{
					fangjianhao:$scope.item.fangjianhao,
					leixing:$scope.item.leixing,
					yajin:$scope.item.yajin
				}
			}).then(function(data) {
				$scope.wbsussce = false;
				$scope.wb_xiugai_show=false;
				//if(data.d)
				$state.go("nav.section");
			}, function() {
			
			})
		}
        $scope.wbm_xiugai=function(){
        	$scope.wbsussce = true;
        	$scope.wb_xiugai_show=true;
        }
        $scope.wb_xiugai_qx=function(){
        	$scope.wbsussce = false;
        	$scope.wb_xiugai_show=false;
        }
		//删除房间
		$scope.wb_remove_qr = function(){
			$http({
				url:"http://47.88.16.225:403/room/"+$scope.item.id,
				method:"delete",
			}).then(function(data) {
				$scope.wb_remove_box=false;
				$state.go("nav.section");
			}, function() {
			})						 
		}
		$scope.wb_remove_qx = function(){
			$scope.wb_remove_box=false;						 
		}
	$scope.wb_remove_box=false;	
		$scope.wb_remove = function(){
			$scope.wb_remove_box=true;	
		}
		
	}]);