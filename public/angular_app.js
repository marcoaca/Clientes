var myapp = angular.module('myapp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'appcontrollers' ]);
myapp.config(['$routeProvider','$locationProvider', '$httpProvider',
	function($routeProvider, $locationProvider, $httpProvider) {
		$routeProvider
			.when('/', {
				controller : 'clientesCtrl',
				templateUrl : '/views/clientes.html'})
			.when('/login',{
				controller : 'loginCtrl',
				templateUrl : '/views/login.html'});
		$locationProvider.html5Mode({enabled:true, requireBase: true, rewriteLinks: true});
		$httpProvider.interceptors.push('authInterceptor');
	}
]);

myapp.factory('authInterceptor', function($rootScope, $q, $window) {
	return {
		request : function(config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
			}
			return config;
		},
		'response': function(response) {
			if(response.status == 401){
				$window.location('/login');
				return;
			}
			return response;
		}
	};
});