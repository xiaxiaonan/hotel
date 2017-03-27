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
			$stateProvider
			.state("nav.section.kongfang", {
				url: "/kongfang",
				views: {
					fangtai: {
						templateUrl: "views/kongfang.html"
					}
				}
			});
		$stateProvider
			.state("nav.section.yuding", {
				url: "/yuding",
				views: {
					fangtai: {
						templateUrl: "views/yuding.html"
					}
				}
			});
		$stateProvider
			.state("nav.section.ruzhu", {
				url: "/ruzhu",
				views: {
					fangtai: {
						templateUrl: "views/ruzhu.html"
					}
				}
			});
		$stateProvider
			.state("nav.section.biaozhun", {
				url: "/biaozhun",
				views: {
					fangtai: {
						templateUrl: "views/biaozhun.html"
					}
				}
			});
		$stateProvider
			.state("nav.section.dachuang", {
				url: "/dachuang",
				views: {
					fangtai: {
						templateUrl: "views/dachuang.html"
					}
				}
			});
			/*wbm*/
		$stateProvider
			.state("nav.section.shangwu", {
				url: "/shangwu",
				views: {
					fangtai: {
						templateUrl: "views/shangwu.html"
					}
				}
			});
			/*wbm*/
		$stateProvider
			.state("nav.section.haohua", {
				url: "/haohua",
				views: {
					fangtai: {
						templateUrl: "views/haohua.html"
					}
				}
			});
		$urlRouterProvider.when("", "/login");
	}]);