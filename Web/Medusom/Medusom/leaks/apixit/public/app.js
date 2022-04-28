(function () {
  'use strict';

  angular
      .module('todoApp', ['ngRoute', 'ngSanitize'])
      .config(config);

  config.$inject = ['$routeProvider'];
  function config($routeProvider) {
    $routeProvider
        .when('/home', {
          controller: 'HomeController',
          templateUrl: 'partials/home.html'
        })
        .when('/add', {
          controller: 'AddTaskController',
          templateUrl: 'partials/addTask.html'
        })
        .when('/edit', {
          controller: 'EditTaskController',
          templateUrl: 'partials/editTask.html'
        })
        .otherwise({ redirectTo: '/home' });
  }
})();