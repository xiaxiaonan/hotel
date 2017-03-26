'use strict';

/**
 * @ngdoc function
 * @name hotelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hotelApp
 */
angular.module('hotelApp')
  .controller('navCtrl',["$scope","$timeout","$state",function ($scope,$timeout,$state) {
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
  }] );
