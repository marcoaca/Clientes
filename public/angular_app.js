var myapp = angular.module('myapp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'appcontrollers' ]);
myapp.config(['$routeProvider','$locationProvider', '$httpProvider',
	function($routeProvider, $locationProvider, $httpProvider) {
		$routeProvider
			.when('/clientes', {
				controller : 'clientesCtrl',
				templateUrl : '/views/clientes.html'})
			.when('/',{
				controller : 'loginCtrl',
				templateUrl : '/views/login.html'});
		$locationProvider.html5Mode({enabled:true, requireBase: true, rewriteLinks: true});
		$httpProvider.interceptors.push('authInterceptor');
		$httpProvider.interceptors.push('errorInterceptor');
	}
]);

myapp.factory('authInterceptor', function($rootScope, $q, $window) {
	return {
		'request' : function(config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
			}
			return config;
		}
	};
});
myapp.factory('errorInterceptor', function($rootScope, $q){
	return{
		'responseError' : function(rejection){
			console.log(JSON.stringify(rejection));
			$rootScope.errors.push(rejection.data);
			return $q.reject(rejection);
		}
	}
});