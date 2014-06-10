/* Directives */
var rubychinaDirectives = angular.module('rubychinaDirectives', []);

//这条directive用于将topic.reply_body中的.at_user的链接原始替换为spa项目支持的链接.
rubychinaDirectives.directive('atUser', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var ptt = /users/i
            $(element).bind("mouseenter", function(){
                $(this).find("a.at_user").each(function(){
                   if ($(this).attr("href").search(ptt) == -1)
                        $(this).attr("href", "#/users" + $(this).attr("href"))
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
