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
     //时钟
		function action() {
			$scope.data = new Date().getTime();
			$timeout(function() {
				action()
			}, 1000)
		}
		action()
	$scope.out =function(){
		$state.go("login");
	}
  }] );
