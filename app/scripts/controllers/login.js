angular.module('hotelApp')
	.controller("sh-main", ["$scope", '$http', '$state', function($scope, $http, $state) {
		$scope.req = '^[0-9]*$';
		$scope.log = true;
		$scope._zhuce = false;
		$scope.sh_pas = false;
		$scope.sh_dl_cg = false;
		$scope.sh_zc_cg = false;
		$scope.sh_yy_none = false;
		$scope.dl = {
			username: '',
			_password: ''
		}
		$scope.zc = {
				username: '',
				_password: '',
				pass: ''
			}
//		取消遮罩
       $scope.sh_zz = function() {
		$scope.sh_dl_cg = false;
		$scope.sh_zc_cg = false;
		$scope.sh_yy_none = false;
		$scope.zc.username=''
		 $scope.zc._password=''
		  $scope.zc.pass=''
			}
			//		跳登录页
		$scope.logo = function() {
				$scope.log = true;
				$scope._zhuce = false;
			}
			//		跳注册页
		$scope.regist = function() {
				$scope.log = false;
				$scope._zhuce = true;
			}
			//		登录
		$scope.login = function(dlform) {
				console.log($scope.dl)
					//			alert(dlform.username.$valid);
				if(dlform.$valid) {
					$http({
						url: "http://47.88.16.225:403/users/login",
						method: "post",
						data: {
							'username': $scope.dl.username,
							'password': $scope.dl._password
						}
					}).then(function(data) {
						localStorage.setItem("user",$scope.dl.username);
						$state.go("nav.section")
					}, function() {
                        $scope.sh_dl_cg = true;
					    $scope.sh_yy_none = true;
					})
				}

			}
			//		   注册账号列表

		//		注册账号
		$scope.zhuce = function(zcform) {
			console.log($scope.zc)

			if($scope.zc._password == $scope.zc.pass && zcform.$valid) {
				$http({
					url: "http://47.88.16.225:403/users",
					method: "post",
					data: {
						'username': $scope.zc.username,
						'password': $scope.zc._password

					}
				}).then(function(data) {
//					alert(1)
//					console.log($scope.sh_arr)

					//					console.log(data.data)
					$scope.log = true;
					$scope._zhuce = false;
				}, function() {
					$http({
						url: "http://47.88.16.225:403/users",
						method: "get",

					}).then(function(data) {
						for(var i = 0; i < data.data.length; i++) {
							if($scope.zc.username == data.data[i].username) {
								$scope.sh_zc_cg = true;
								$scope.sh_yy_none = true;
							}
						}
					}, function() {})

				})

			}

		}
	}])
	.directive("qx",function(){
		return{
			restrict:"ECAM",
			template:'<div id="carousel-example-generic" class="carousel slide fs-lunbo" data-ride="carousel" data-interval="2500"><ol class="carousel-indicators" style="display: none;"><li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li><li data-target="#carousel-example-generic" data-slide-to="1"></li><li data-target="#carousel-example-generic" data-slide-to="2"></li><li data-target="#carousel-example-generic" data-slide-to="3"></li><li data-target="#carousel-example-generic" data-slide-to="4"></li><li data-target="#carousel-example-generic" data-slide-to="5"></li><li data-target="#carousel-example-generic" data-slide-to="6"></li></ol><div class="carousel-inner" role="listbox"><div class="item active"><img src="images/f1.jpg" alt="..."></div><div class="item"><img src="images/f2.jpg" alt="..."></div><div class="item"><img src="images/f3.jpg" alt="..."></div><div class="item"><img src="images/f4.jpg" alt="..."></div><div class="item"><img src="images/f5.jpg" alt="..."></div><div class="item"><img src="images/f8.jpg" alt="..."></div><div class="item"><img src="images/f7.jpg" alt="..."></div></div></div>',
			replace:true,
			link:function(scope,e,attr){
				e.carousel()
			}
		}
	})
