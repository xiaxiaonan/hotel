angular.module('hotelApp')
	.controller("sh-main", ["$scope", '$http','$state', function($scope, $http,$state) {
		$scope.req = '^[0-9]*$';
		$scope.log = true;
		$scope._zhuce = false;
		$scope.sh_pas=false;
		$scope.dl = {
			username: '',
			_password:''
		}
		$scope.zc = {
			username: '',
			_password: '',
			pass: ''
		}
		$scope.logo = function() {
			$scope.log = true;
			$scope._zhuce = false;
		}
		$scope.regist = function() {
			$scope.log = false;
			$scope._zhuce = true;
		}
		$scope.login = function() {
			console.log($scope.dl)
			if($scope.dl.username != '' && $scope.dl._password != '') {
				$http({
					url: "http://47.88.16.225:403/users/login",
					method: "post",
					data: {
						'username': $scope.dl.username,
						'password': $scope.dl._password
					}
				}).then(function(data) {
					console.log(data)
					$state.go()
				}, function() {
                        
				})
			}

		}
		$scope.zhuce = function() {
			if($scope.zc._password!=$scope.zc.pass){
				$scope.sh_pas=true;
				return
			}
			else if($scope.zc.username != '' && $scope.zc._password != '') {
				$http({
					url: "http://47.88.16.225:403/users",
					method: "post",
					data: {
						username: $scope.zc.username,
						password: $scope.zc._password
						
					}
				}).then(function(data) {
					alert("123")
					console.log(data)
				}, function() {

				})
			}

		}
	}])