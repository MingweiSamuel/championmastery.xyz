var champApp = angular.module('champApp', []);
var baseUrl = 'https://script.google.com/macros/s/AKfycbyOAvaQmTEtU8HY70Pw5t_V45bFxszORZ_wwcbIu_jmVF-msAU/exec?json=true';

champApp.controller('MainController', function($scope, $http) {
  var url = baseUrl + '&' + document.location.search.substr(1);
  $scope.regions = ["NA", "BR", "EUNE", "EUW", "KR", "LAN", "LAS", "OCE", "TR", "RU"];
  $http.get(url).then(function(res) {
    console.log('response', res);
    $scope.data = res.data;
  });
});