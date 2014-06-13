// configuration here
var rubychinaConfigs = angular.module("rubychinaConfigs", []);
rubychinaConfigs.factory("Configuration", function(){
    var config = {
        api_url: 'http://ruby-china.org/api/v2/'
    };
})