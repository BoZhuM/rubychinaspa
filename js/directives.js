/* Directives */
var rubychinaDirectives = angular.module('rubychinaDirectives', []);

//这条directive用于将topic.reply_body中的.at_user的链接原始替换为spa项目支持的链接.
rubychinaDirectives.directive('atUser', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var pattern = /users/i
            element.on("mouseenter", function(){
                angular.forEach(element.find("a"), function(e){
                   var _el = angular.element(e);
                   var _href = _el.attr("href");
                   if (_href.search(pattern) == -1)
                       _el.attr("href", "#/users" + _href)
                })
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
