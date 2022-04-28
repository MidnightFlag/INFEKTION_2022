(function () {
    'use strict';

    angular
        .module('todoApp')
        .controller('EditTaskController', EditTaskController);

    EditTaskController.$inject = ['$rootScope', '$location', '$http'];

    function EditTaskController($scope, $location, $http) {
        if($scope.currentTodo == null)
            $location.path('/home');

        var idTodo = $scope.currentTodo._id;
        $scope.editTask = function() {
            $http.put('https://todoapp-m4104.herokuapp.com/tasks/' + idTodo, $scope.currentTodo).then(function(res) {
                $scope.refreshTodos();
            }, function(res) { });
        };

        $scope.back = function () {
            $location.path('/home');
        };
    }

})();