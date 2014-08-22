angular.module("auth", [
    'Satellizer',
    'auth-controllers',
    'auth-services'
])

    .config(function($authProvider) {
        $authProvider.config.loginUrl = 'http://localhost:3000/auth/login';
    }
);

angular.module("auth-controllers", []);
angular.module("auth-services", []);