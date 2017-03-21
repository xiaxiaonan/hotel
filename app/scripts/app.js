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
		$urlRouterProvider.when("", "/login");
	}]);