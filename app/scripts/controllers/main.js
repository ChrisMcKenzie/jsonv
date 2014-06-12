'use strict';

angular.module('jsonschemav4ValidatorApp')
  .controller('MainCtrl', function ($scope) {
    var env = jjv();

    $scope.success = 'No Errors Found...'

    $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'json',
    };

    $scope.data = '{\"x\": 20, \"y\": 50}';
    $scope.schema = angular.toJson({
        "type": "object",
        "properties": {
            "x": {
                "type": "number"
            },
            "y": {
                "type": "number"
            }
        },
        "required": ["x", "y"]
     }, true)
    $scope.$watch('schema', function(newVal,oldVal){
      if(newVal !== oldVal){
        $scope.errors = env.validate(angular.fromJson($scope.schema), angular.fromJson($scope.data));
        if(!$scope.errors) $scope.success = 'No Errors Found...'
        else $scope.success = false
      }
    })

    $scope.$watch('data', function(newVal,oldVal){
      if(newVal !== oldVal && newVal !== ''){
        $scope.errors = env.validate(angular.fromJson($scope.schema), angular.fromJson($scope.data));
        if(!$scope.errors) $scope.success = 'No Errors Found...'
        else $scope.success = false
      }
    });


  });
