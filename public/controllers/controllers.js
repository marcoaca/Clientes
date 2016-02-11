var appcontrollers = angular.module('appcontrollers', []);

appcontrollers.controller('mainCtrl',['$rootScope', '$scope', function($rootScope,$scope){
    $rootScope.errors = [];
    $rootScope.closeError = function(index) {
        $rootScope.errors.splice(index, 1);
    };

}]);

appcontrollers.controller('errorCtrl',['rootScope', function($rootScope){

}]);

appcontrollers.controller('loginCtrl', ['$scope', '$rootScope', '$location', '$http', '$window', function($scope, $rootScope, $location, $http, $window) {
    $scope.user = {login:'nome',password:'password'};
    $scope.auth_error = '';
    $scope.authenticate = function(){
        console.log($scope.user);
        $http.post('api/v1/login', $scope.user).then(
            function (response) {
                console.log('login success');
                $window.sessionStorage.token = response.data.token;
                $rootScope.isAuthenticated = true;
                $location.path('/clientes');
            },
            function (response) {
                console.log(response.data);
                delete $window.sessionStorage.token;
                $rootScope.errors.push(response.data);
                $scope.auth_error = response.data;
            });
        return;
    };
}]);

appcontrollers.controller('clientesCtrl', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {

    $scope.navigate = function(location){
        $location.path(location);
    }

    $scope.data = {};

    $http.get('api/v1/clientes').then(
        function (response) {
            $scope.data.clientes = response.data;
        },
        function (response) {
            $scope.data.clientes = [];
        }
    );

    $scope.consultas = function (clienteid) {
        $http.get('api/v1/clientes/' + clienteid + '/consultas').then(
            function (response){
                $scope.data.consultas = response.data;
            },
            function (response) {
                $scope.data.consultas = [];
            }
        );
    };
/*    $scope.data = {
        clientes: [
            {clienteid: 1, nome: 'nome 1'},
            {clienteid: 2, nome: 'nome 2'},
            {clienteid: 3, nome: 'nome 3'},
            {clienteid: 4, nome: 'nome 4'}
        ],
        consultas: [
            {consultaid: 1, clienteid: 1, texto: 'consulta 1'},
            {consultaid: 2, clienteid: 1, texto: 'consulta 2'},
            {consultaid: 3, clienteid: 2, texto: 'consulta 3'},
            {consultaid: 4, clienteid: 2, texto: 'consulta 4'},
            {consultaid: 5, clienteid: 3, texto: 'consulta 5'},
            {consultaid: 6, clienteid: 4, texto: 'consulta 6'},
            {consultaid: 7, clienteid: 3, texto: 'consulta 7'},
            {consultaid: 8, clienteid: 4, texto: 'consulta 8'},
            {consultaid: 9, clienteid: 5, texto: 'consulta 9'},
            {consultaid: 10, clienteid: 2, texto: 'consulta 10'},
            {consultaid: 11, clienteid: 3, texto: 'consulta 11'},
            {consultaid: 12, clienteid: 3, texto: 'consulta 12'},
            {consultaid: 13, clienteid: 4, texto: 'consulta 13'},
            {consultaid: 14, clienteid: 5, texto: 'consulta 14'},
            {consultaid: 15, clienteid: 5, texto: 'consulta 15'},
        ],
        consultaid: null,
        clienteid: null
    };*/


}]);
