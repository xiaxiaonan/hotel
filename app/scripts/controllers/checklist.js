angular.module('hotelApp')
	.controller("ctrl_ruzhulist", ["$scope", "$http", function($scope, $http) {

		//开始请求
		$http({
			url: "http://47.88.16.225:403/room",
			method: "get"
		}).then(function(data) {

			$scope.reqs = data.data
			$scope.user = localStorage.getItem("user");
			

		}, function() {
			
		})
		$scope.isMMactive = true;
		$scope.isShow = true;
		$scope.isHide = false;
		$scope.isHide2 = false;
		//显示入住列表
		$scope.news = function() {
				$scope.isShow = true;
				$scope.isHide = false;
				$scope.isHide2 = false;
				$scope.isMMactive = true;
				$scope.isMMactive2 = false
			}
	    //显示预定
		$scope.hist = function() {
			$scope.isShow = false;
			$scope.isHide = true;
			$scope.isHide2 = false;
			$scope.isMMactive = false;
			$scope.isMMactive2 = true;
			$scope.isMMactive3 = false;
		}
		
		//显示历史入住
		$scope.lishi = function() {
			$scope.isShow = false;
			$scope.isHide = false;
			$scope.isHide2 = true;
			$scope.isMMactive = false;
			$scope.isMMactive2 = false;
			$scope.isMMactive3 = true;
			//历史入住信息http
         $http({
         	url: "http://47.88.16.225:403/room2",
			method: "get"
         }).then(function(reqs){
         	$scope.arrTlist=reqs.data
         	console.log(reqs)
         },function(){
         	alert("你失败了")
         })
			
		}
		
        
	}])

//过滤数组
//入住和预定
	.filter("numberToInt", function () {
        return function (data) {
            var output = [];
            angular.forEach(data, function (value, key) {
                if (value.zhuangtai.indexOf("入住") !== -1) {
                    output.push(value);
                }
            });
            return output;
        }
    })
	//退房
	.filter("tuiberToInt2", function () {
        return function (data) {
            var output = [];
            angular.forEach(data, function (value, key) {
                if (value.zhuangtai.indexOf("预订") !== -1) {
                    output.push(value);
                }
            });
            return output;
        }
    });
