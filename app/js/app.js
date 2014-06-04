/* App Module DEPENDENCIES */
var rubychinaApp = angular.module('rubychinaApp', [
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngElastic', //textarea auto grow
  'ngTimeago',
  'btford.markdown',
  'emoji',
  'mgcrea.ngStrap',
  'angular-loading-bar',//
  'angular-underscore',
  'rubychinaControllers',
  'rubychinaServices',
  'rubychinaDirectives',
  'rubychinaFilters'
]);

rubychinaApp.run(['$rootScope', 'Node', 'Auth', '$injector', '$location', '$cookieStore', function($rootScope, Node, Auth, $injector, $location, $cookieStore){
  $rootScope.nodes = Node.query();
  $rootScope.orderProp = "topics_count";
  $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {
      if (Auth.getAuth().token) {
          headersGetter()['Authorization'] = "Bearer "+ Auth.getAuth().token ;
      }else{
  			 delete headersGetter()['Authorization']
      }
  
      if (data) {
          return angular.toJson(data);
      }
  };
}]);

rubychinaApp.factory('authHttpResponseInterceptor',['$q', '$rootScope','$location', '$cookieStore', function($q, $rootScope, $location, $cookieStore){
    return {
        response: function(response){
            if (response.status === 401) {
                console.log("Response 401");
                alert("token验证出错, 请重新输入token.")
            }

            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
                $location.search('returnTo', $location.path()).path('/login');
            }
            return $q.reject(rejection);
        }
    }
}]).config(['$httpProvider',function($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);


rubychinaApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])
// ALLOW CROSS-SITE-RESOURCES

rubychinaApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

rubychinaApp.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    'https://api.github.com/**',
    'http://ruby-china.org/**',
    'http://localhost:1337/**']);
});
//routes settings
rubychinaApp.config(['$routeProvider',
  function($routeProvider){
    //topics#index
    $routeProvider.when('/login', { 
      templateUrl: '/views/application/login.html', 
      controller: 'AuthCtrl' 
    });
    $routeProvider.when('/topics', {
        templateUrl: '/views/topics/index.html',
        controller: 'TopicIndexCtrl'
    });
    //topics#new
    $routeProvider.when('/topics/new', {
        templateUrl: '/views/topics/new.html',
        controller: 'TopicNewCtrl'
    });


    //topics#show
    $routeProvider.when('/topics/:id', {
        templateUrl: '/views/topics/show.html',
        controller: 'TopicShowCtrl'
    });
    
    //nodes#index
    $routeProvider.when('/nodes', {
        templateUrl: '/views/nodes/index.html',
        controller: 'NodeIndexCtrl'
    });
    //nodes#show
    $routeProvider.when('/topics/node/:id', {
        templateUrl: '/views/nodes/show.html',
        controller: 'NodeShowCtrl'
    });

    //users#index
    $routeProvider.when('/users', {
        templateUrl: '/views/users/index.html',
        controller: 'UserIndexCtrl'
    });
    //users#show
    $routeProvider.when('/users/:id', {
        templateUrl: '/views/users/show.html',
        controller: 'UserShowCtrl'
    });

    //default root to
    $routeProvider.otherwise({
        redirectTo: '/topics'
    });

  }
]);