/* Services */
var base_url = function(){
  return "http://ruby-china.org/api/v2/"
  // return "http://localhost:3000/api/v2/"
}


var rubychinaServices = angular.module("rubychinaServices", ['ngResource'])

//用于用户验证登陆.
rubychinaServices.factory('Auth', ['$cookieStore', function($cookieStore){
  var auth = {login: false, token: false};

  auth.getAuth = function(){
    return $cookieStore.get("auth") || auth;
  }
  auth.clear = function(){
    $cookieStore.remove("auth")
    return auth.getAuth();
  }
  return auth;
}])

//model topics
rubychinaServices.factory('Topic', ['$resource',
    function($resource){
        return $resource(base_url() + 'topics/:id.json', {id: '@id'}, {
            query:    { method: 'GET', isArray: true },
            favorite: { method: 'POST', url: base_url() + 'topics/:id/favorite.json' },
            reply:    { method: 'POST', url: base_url() + 'topics/:id/replies.json' },
            create:   { method: 'POST' }
        })
        }
    ]
)

//model Node
rubychinaServices.factory('Node', ['$resource',
    function($resource){
        return $resource(base_url() + 'topics/node/:id.json', {id: '@id'}, {
          query: { method: 'GET', url: base_url() + 'nodes.json', isArray: true},
          get:   { method: 'GET', isArray: true}
        });
    }
]);

//model Notification
rubychinaServices.factory('Notification', ['$resource',
    function($resource){
        return $resource(base_url() + 'notifications/:id.json', {id: '@id'}, {
          query: { method: 'GET', isArray: true},
          get:   { method: 'GET', isArray: true}
        });
    }
]);

//model User
rubychinaServices.factory('User', ['$resource',
    function($resource){
        return $resource(base_url() + 'users/:id.json', {id: '@id'}, {
          query:    { method: 'GET', isArray: true},
          topics:   { method: 'GET', isArray: true, url: base_url() + "users/:id/topics.json"},
          favorite: { method: 'GET', isArray: true, url: base_url() + "users/:id/topics/favorite.json"}//,
          // repos:    { method: 'GET', isArray: true, url: "https://api.github.com/users/:id/repos", withCredentials: false}
        });
    }
]);

//model Photo
rubychinaServices.factory('Photo', ['$resource',
    function($resource){
        return $resource(base_url() + 'photos.json',{}, {
          upload: { method: 'POST'  }
        });
    }
]);

//this method can generate standard restful model service for this site.
// var gservice = function(obj, source, url){
//     return obj.factory(source, ['$resource',
//         function($resource){
//             return $resource(base_url() + url + '/:id.json',{id: '@id'}, {
//                 query: { method: 'GET', isArray: true }
//             })
//         }
//     ]);
// }
// gservice(rubychinaServices, 'Topic', 'topics')
// gservice(rubychinaServices, 'User', 'users', 'users')
// gservice(rubychinaServices, 'Node', 'topics/node')
