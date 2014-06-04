/* Controllers */

var rubychinaControllers = angular.module('rubychinaControllers', []);

rubychinaControllers.controller('NavCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location){
  // $scope.auth = Auth.getAuth();
  $scope.login = Auth.getAuth().login;
  // $scope.h = $scope.auth();
  $scope.$on("logged", function(evt, msg){
    console.log(msg)
    $scope.login = Auth.getAuth().login;
  })
  $scope.logout = function(){
      Auth.clear()
      $location.path("/")
      $scope.login = Auth.getAuth().login
  }
  }])
//topics/index
rubychinaControllers.controller('AuthCtrl', ['$scope', '$rootScope', '$location', '$routeParams', '$cookieStore', '$alert', 'Notification', 'User',
  function AuthCtrl($scope, $rootScope, $location, $routeParams, $cookieStore, $alert, Notification, User) {
    $scope.info = {login: '', token: ''}
    var successAlert = $alert(
      {
        scope: $scope,
        show: false,
        title: ':)', 
        content: '登陆成功.', 
        placement: 'top-right', 
        type: 'info',
        duration: 2
      });

    var  errorAlert = $alert(
      {
        scope: $scope,
        show: false,
        title: ':(', 
        content: '登陆失败, 请检查TOKEN是否出错.', 
        placement: 'top-right', 
        type: 'info',
        duration: 2
      });

    $scope.toLogin = function(info){
     $cookieStore.put("auth", info)
       Notification.query(
       {}, 
       function(data){
          $rootScope.notifications = data
          $scope.$emit("logged", $scope.login)
          if($location.path() == $routeParams.returnTo)
            $location.path("/")
          $location.path("returnTo")
          successAlert.$promise.then(successAlert.show);
       },
       function(err){
         if(err.status == 401)
             errorAlert.$promise.then(errorAlert.show)
			   $cookieStore.remove("auth")
      })
    }
}]);

//topics/index
rubychinaControllers.controller('TopicIndexCtrl', ['$scope', 'Topic', 'Node', '$routeParams', '$location',
  function TopicIndexCtrl($scope, Topic, Node, $routeParams, $location) {
    $scope.page      = parseInt($routeParams.page, 10) || 1
    $scope.per_page  = parseInt($routeParams.per_page, 10) || 30
    $scope.type      = $routeParams.type || 'none'
    // 'excellent', 'no_reply', 'popular', 'recent'
    $scope.query = ''
    var options = {page: $scope.page, per_page: $scope.per_page, type: $scope.type}
    //一般情况下并不需要parseInt, 这里是处理刷新页面后无法从select中显示默认值的quirks.
    $scope.orderProp = 'updated_at';
    $scope.topics    = Topic.query({page: $scope.page, per_page: $scope.per_page, type: $routeParams.type})
    //局部函数
    $scope.changeLocation = function(obj){
      if(obj == undefined)
        obj = {}
      var h = angular.extend(options, obj)
      $location.search(h)
    }
}]);


//topics/new
rubychinaControllers.controller("TopicNewCtrl", ['$scope', 'Photo', '$location', 'Topic',
  function TopicNewCtrl($scope, Photo, $location, Topic){
    $scope.topic = {};
    $scope.createTopic = function(){
      Topic.create(
        $scope.topic,
        function(successResult) {
          $location.path("#/topics/" + successResult.id)
        }, 
        function(errorResult) {
          if(errorResult.status === 404) {
              alert('some wrong ')          
          }
        }
      )
    }
  }
]);

//topics/show
rubychinaControllers.controller('TopicShowCtrl', ['$scope', 'Topic', 'Node', 'Photo', '$routeParams', '$anchorScroll','$sce', '$alert',
  function TopicShowCtrl($scope, Topic, Node, Photo, $routeParams, $anchorScroll, $sce, $alert) {
    $scope.topic = Topic.get({id: $routeParams.id})
    $scope.replyBody = '';
    $anchorScroll();
    $scope.favorite = function(){
      Topic.favorite({id: $scope.topic.id})
    }

    var successAlert = $alert(
      {
        scope: $scope,
        show: false,
        title: ':)', 
        content: '话题回复成功.', 
        placement: 'top-right', 
        type: 'info',
        container: '#alert-container',
        duration: 2
      });

    $scope.showAlert = function() {
        successAlert.$promise.then(successAlert.show);
    };

    $scope.replyTopic = function(bd){
      Topic.reply(
        {id: $scope.topic.id, body: $scope.replyBody},
        function(successResult) {
          $scope.topic = Topic.get({id: $routeParams.id})
          $scope.showAlert()
        }, function(errorResult) {
            if(errorResult.status === 404) {            
            }
        }
      )
    }
}]);


//nodes/index
rubychinaControllers.controller('NodeIndexCtrl', ['$scope', '$routeParams',
  function NodeIndexCtrl($scope, $routeParams) {
}]);

//nodes/show
rubychinaControllers.controller('NodeShowCtrl', ['$scope', 'Node', '$routeParams', '$location',
  function NodeShowCtrl($scope, Node, $routeParams, $location) {
    $scope.page      = parseInt($routeParams.page, 10) || 1
    $scope.per_page  = parseInt($routeParams.per_page, 10) || 30
    $scope.type      = $routeParams.type || 'none'
    // 'excellent', 'no_reply', 'popular', 'recent'
    $scope.query = ''
    var options = {page: $scope.page, per_page: $scope.per_page, type: $scope.type}
    //一般情况下并不需要parseInt, 这里是处理刷新页面后无法从select中显示默认值的quirks.
    $scope.orderProp = 'updated_at';
    //局部函数

    $scope.page = $routeParams.page || 1
    $scope.pageSize    = $routeParams.size || 30

    $scope.loadTopics  = function(){
      $scope.topics    = Node.get({ id: $routeParams.id, page: $scope.page, per_page: $scope.per_page, type: $routeParams.type}, 
          function(data){
            $scope.node_name = data[0].node_name;
          },
          function(err){}
        );
    }

    $scope.changeLocation = function(obj){
      if(obj == undefined)
        obj = {}
      var h = angular.extend(options, obj)
      $location.search(h)
    }

    $scope.loadTopics()
}]);

//users/index
rubychinaControllers.controller('UserIndexCtrl', ['$scope', 'User', '$routeParams',
  function UserIndexCtrl($scope, User, $routeParams) {
    $scope.users = User.query();
}]);

//users/show
rubychinaControllers.controller('UserShowCtrl', ['$scope', '$http', 'User', '$routeParams',
  function UserShowCtrl($scope, $http, User, $routeParams) {
    $scope.user         = User.get({ id: $routeParams.id, size: $scope.pageSize}, function(user){
      //这里用于得到其github的值.
      if(user.github_url){
        var github_login  = user.github_url.replace(/https\:\/\/github.com|\//g, '')
        $http({transformRequest: function(data, headersGetter){
          delete headersGetter()['Authorization']
        }, url: 'https://api.github.com/users/'+github_login+'/repos', method: 'GET'}).success(
         function(data, status){
          $scope.user_repos = data
         }, 
         function(data, stats){
			 console.log("没有与github帐号绑定.")
         }
        )
      }
    });

    $scope.user_topics  = User.topics({id: $routeParams.id, size: 100})
    $scope.user_favorite_topics  = User.favorite({id: $routeParams.id, size: 100})
    $scope.tabs = [
      {
        "title": "简介",
        "template": '/views/users/info.html'
      },
      {
        "title": "帖子",
        "template": '/views/users/topics.html'//,
      },
      {
        "title": '收藏',
        "template": '/views/users/favorite.html'
      }
    ]
}]);