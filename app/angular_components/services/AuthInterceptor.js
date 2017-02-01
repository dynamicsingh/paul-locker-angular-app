(function() {
    'use strict';
    angular.module("myApp.service.authinterceptor", ['myApp.service.localstorage']).factory("AuthInterceptor", function($rootScope, $q, LocalStorage, config) {
        return {
            // request: function(req) {
            //     var clientId, currentSpaceId, token, user, userId;
            //     token = LocalStorage.get('token');
            //     if (token) {
            //         req.headers = req.headers || {};
            //         req.headers.Authorization = "Bearer " + token;
            //         user = LocalStorage.get('user');
            //         currentSpaceId = LocalStorage.get('currentSpaceId');
            //         userId = user.id;
            //         clientId = user.clientId;
            //         req.headers.userId = userId;
            //         req.headers.clientId = clientId;
            //         req.headers.currentSpaceId = currentSpaceId;
            //     }
            //     return req;
            // },
            // response: function(response) {
            //     if (response.status === 401) {
            //         console.warn("user not authenticated", response);
            //     }
            //     return response || $q.when(response);
            // }
        };
    });
}).call(this);