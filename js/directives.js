/* Directives */
var rubychinaDirectives = angular.module('rubychinaDirectives', []);

//这条directive用于将topic.reply_body中的.at_user的链接原始替换为spa项目支持的链接.
//个人的原生项目, 自己写api不需要这样做.
rubychinaDirectives.directive('atUser', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var pattern = /users/i
            element.on("click", function(e){
              // atUser directive的下级元素, 点击时判断是否@user模式, 若是, 则替换为本spa项目的链接
              var _el      = angular.element(e.toElement);
              var _href    = _el.attr("href");
              var at_title = _el.attr('title');
              if (_href.search(pattern) == -1 && at_title && at_title.search(/^@/i) == 0)
                _el.attr("href", "#/users" + _href);
            })
        }
    }
})

// rubychinaDirectives.directive("fileread", [function () {
//     return {
//         scope: {
//             fileread: "="
//         },
//         link: function (scope, element, attributes) {
//             element.bind("change", function (changeEvent) {
//                 scope.$apply(function () {
//                     scope.fileread = changeEvent.target.files[0];
//                     // or all selected files:
//                     // scope.fileread = changeEvent.target.files;
//                 });
//             });
//         }
//     }
// }]);
