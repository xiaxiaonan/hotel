'use strict';

/**
 * @ngdoc overview
 * @name hotelApp
 * @description
 * # hotelApp
 *
 * Main module of the application.
 */
angular
  .module('hotelApp', ["ui.router"])
  .config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
		$stateProvider
			.state("nav",{
				url:"/nav",
				templateUrl:"views/nav.html"
			})
		$stateProvider
			.state("login",{
				url:"/login",
				templateUrl:"views/login.html"
			})
		$stateProvider
			.state("section",{
				url:"/section",
				templateUrl:"views/section.html"
			})
		$urlRouterProvider.otherwise("/section");
	}]);
