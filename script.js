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
    var val = decodeURIComponent(pair[1]).replace(/\+/g, ' ');
    if (pair[0] === 'summoner')
      $scope.summoner = val;
    if (pair[0] === 'region')
      $scope.region = val;
  }
  $scope.searched = !!$scope.summoner || !!$scope.region;
  $scope.region = $scope.region || 'NA';
  $scope.regions = ["NA", "BR", "EUNE", "EUW", "KR", "LAN", "LAS", "OCE", "TR", "RU"];
  
  $http.get(url).then(function(res) {
    //success
    $scope.loaded = true;
    $scope.data = res.data;
    
    var total = 0;
    res.data.data.forEach(function(a) {
      total += a.championPoints;
    });
    $scope.total = total;
  }, function(res) {
    //error
    $scope.error = true;
  });
});