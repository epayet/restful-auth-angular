angular.module("auth-services").factory("User", function ($http) {
    return {
        get: function() {
            return $http.get("http://localhost:3000/user");
        }
    }
});