'use strict';

angular.module('jsonv')
  .controller('MainCtrl', function ($scope) {
    var env = jjv();

    $scope.success = 'No Errors Found...';

    $scope.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      mode: 'application/json',
      theme: 'monokai'
    };

    $scope.clear = function(){
      $scope.schema = '';
      $scope.data = '';
    };

    var demoData = {
      'x': 50,
      'y': 100
    };
    $scope.data = angular.toJson(demoData, true);

    var demoSchema = {
      'type': 'object',
      'properties': {
        'x': {
          'type': 'number'
        },
        'y': {
          'type': 'number'
        }
      },
      'required': ['x', 'y']
    };
    $scope.schema = angular.toJson(demoSchema, true);

    $scope.$watch('schema', function(newVal,oldVal){
      if(newVal !== oldVal && newVal !== '') {
        $scope.errors = env.validate(angular.fromJson($scope.schema), angular.fromJson($scope.data));
        if(!$scope.errors) $scope.success = 'No Errors Found...';
        else $scope.success = false;
      }
    });

    $scope.$watch('data', function(newVal,oldVal){
      if(newVal !== oldVal && newVal !== ''){
        $scope.errors = env.validate(angular.fromJson($scope.schema), angular.fromJson($scope.data));
        if(!$scope.errors) $scope.success = 'No Errors Found...';
        else $scope.success = false;
      }
    });


  });
