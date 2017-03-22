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
	.module('hotelApp', ["ui.router", 'ngMessages'])
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {


		$stateProvider
			.state("login", {
				url: "/login",
				views: {
					main: {
						templateUrl: "views/login.html"
					}
				}
			});
		$stateProvider
			.state("nav", {
				url: "/nav",
				views: {
					main: {
						templateUrl: "views/nav.html"
					}
				}
			});
		$stateProvider
			.state("nav.section", {
				url: "/section",
				views: {
					bottom: {
						templateUrl: "views/section.html"
					}
				}
			});
		$stateProvider
			.state("nav.checklist", {
				url: "/checklist",
				views: {
					bottom: {
						templateUrl: "views/checklist.html"
					}
				}
			});
		$stateProvider
			.state("xinxi", {
				url: "/xinxi",
				views: {
					main: {
						templateUrl: "views/xinxi.html"
					}
				}
			});
		$urlRouterProvider.when("", "/login");
	}]);