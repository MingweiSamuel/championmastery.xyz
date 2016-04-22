var champApp = angular.module('champApp', []);
var baseUrl = 'https://script.google.com/macros/s/AKfycbyOAvaQmTEtU8HY70Pw5t_V45bFxszORZ_wwcbIu_jmVF-msAU/exec?json=true';

champApp.controller('MainController', function($scope, $http) {
  var params = document.location.search.substr(1);
  var url = baseUrl + '&' + params;
  
  params = params.split('&');
  for (var i = 0; i < params.length; i++) {
    var pair = params[i].split('=');
    if (pair.length < 2)
      continue;
    if (pair[0] === 'summoner')
      $scope.summoner = pair[1];
    if (pair[0] === 'region')
      $scope.region = pair[1];
  }
  $scope.searched = !!$scope.summoner || !!$scope.region;
  $scope.regions = ["NA", "BR", "EUNE", "EUW", "KR", "LAN", "LAS", "OCE", "TR", "RU"];
  
  $http.get(url).then(function(res) {
    console.log('response', res);
    $scope.loaded = true;
    $scope.data = res.data;
  });
});