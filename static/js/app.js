var app = angular.module('TodoApp', ["ngCookies"]).config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('//').endSymbol('//');
}).run(function ($http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken || document.getElementsByName('csrfmiddlewaretoken')[0];
    console.log($http.defaults.headers.post['X-CSRFToken'])
});
app.controller('TodoController', function ($scope, todoService) {
    $scope.todos = [];
    $scope.form = {
        text: $scope.todoText
    };
    var bodyScope = $scope;
    loadRemoteData();
    $scope.addTodo = function () {
        todoText = bodyScope.todoText;
        bodyScope.todoText = "";
        todoService.addTodo(todoText)
            .then(loadRemoteData,
            function (errorMessage) {
                console.warn(errorMessage);
            });
        $scope.form.text = "";
    };
    $scope.removeTodo = function (todo) {
        todoService.removeTodo(todo.pk)
            .then(loadRemoteData);
    };
    $scope.editTodo = function (todo) {
        todoService.editTodo(todo)
            .then(loadRemoteData())
    };
    function applyRemoteData(newTodos) {
        $scope.todos = newTodos;

    }

    function loadRemoteData() {
        todoService.getTodos()
            .then(
            function (todos) {
                applyRemoteData(todos);
            }
        )
    }

});

// -------------------------------------------------- //
// -------------------------------------------------- //


app.service(
    "todoService",
    function ($http, $q) {
        return({
            addTodo: addTodo,
            getTodos: getTodos,
            removeTodo: removeTodo,
            editTodo: editTodo
        });

        function addTodo(text) {
            var request = $http({
                method: 'post',
                url: 'add/',
                data: {
                    text: text
                }
            });
            return(request.then(handleSuccess, handleError));
        };
        function getTodos() {
            var request = $http({
                method: 'post',
                url: 'get/'
            });
            return(request.then(handleSuccess, handleError));
        }

        function removeTodo(id) {
            var request = $http({
                method: 'post',
                url: 'remove/',
                data: {
                    id: id
                }
            });
            return(request.then(handleSuccess, handleError));
        }

        function editTodo(id) {
            console.log('editting...');
            var request = $http({
                method: 'post',
                url: 'edit/',
                data: {
                    id: id
                }
            });
            return(request.then(handleSuccess, handleError));
        }

        function handleError(response) {
            if (!angular.isObject(response.data) || !response.data.message) {
                return ($q.reject("unknown error occurred"));
            }
            return ($q.reject(response.data.message));
        }

        function handleSuccess(response) {
            return (response.data);
        };
    }
);
