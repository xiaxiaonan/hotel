'use strict';

/**
 * @ngdoc function
 * @name hotelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hotelApp
 */
angular.module('hotelApp')
  .controller('navCtrl',["$scope","$http","$timeout","$state",function ($scope,$http,$timeout,$state) {
//	未登录禁止进去此页面
if(localStorage.getItem("user")=="" || localStorage.getItem("user")==undefined){
	    	 $state.go("login")
	    }

     //时钟
		function action() {
			$scope.data = new Date().getTime();
			$timeout(function() {
				action()
			}, 1000)
		}
		action()
	$scope.out =function(){
		localStorage.clear();
		$state.go("login");
	}
	$scope.user = localStorage.getItem("user");
	
	$scope.showxfalse = function(){
			$scope.showx = false;
		}
	$scope.showxtrue = function(){
			$scope.showx = true;
		}
	//img
		var input = document.getElementById("demo_input");

		if(typeof(FileReader) === 'undefined') {
			result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
			input.setAttribute('disabled', 'disabled');
		} else {
			input.addEventListener('change', readFile, false);
		}
		//上传图片
		$scope.pushImg=function(){
			$http({
				url: 'http://47.88.16.225:403/room3',
			    method: 'post',
			    data:{
			    	logo:sessionStorage.img
			    }
			}).then(function(){
				alert("上传成功")
			},function(){})
		}
		$http({
			url: 'http://47.88.16.225:403/room3',
			method: 'get'
		}).then(function(reqs) {
			//alert("123")

			$scope.logos = reqs.data
//			console.log(reqs)
		}, function() {

		})
		//修改图片
		$scope.logos=[]
		$scope.imgShow = function($index) {

			localStorage.aimg=$scope.logos[$index].logo
			window.location.reload()
			
		}
        $scope._src=localStorage.aimg
        //修改name
        $scope.name=""
        $scope.nameShow = function() {
            if($scope.name==""){
            	$scope.name="未定义"
            	localStorage.nameC=$scope.name
            	window.location.reload()
            }else{
            	localStorage.nameC=$scope.name
			    window.location.reload()
            }
			

			
		}
        $scope.nameC=localStorage.nameC
		function readFile() {
			var file = this.files[0];
			if(!/image\/\w+/.test(file.type)) {
				alert("解析错误，请重新上传");
				return false;
			}
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				var img = new Image,
					width = 50, //image resize
					quality = 0.8, //image quality
					canvas = document.createElement("canvas"),
					drawer = canvas.getContext("2d");
				img.src = this.result;

				img.onload = function() {
					canvas.width = width;
					canvas.height = width * (img.height / img.width);
					drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
					img.src = canvas.toDataURL("image/jpeg", quality);
					// console.log(img.src);
					//					result.innerHTML = img.src;
					//					img_area.innerHTML = '<div class="sitetip">preview：</div><img id="acc" src="' + img.src + '" alt=""/>';
					sessionStorage.img = img.src;
				}

			}
		}

		//img
	
	
	
  }] );
