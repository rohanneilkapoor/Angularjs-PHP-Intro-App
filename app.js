//creating this allows for avoiding global variables
(function(){

    var app = angular.module('funwithcountries',['ngRoute']);

    app.factory('countryService',function($http){
        var baseUrl = 'services/';
        return{
            getCountries: function(){
               return $http.get(baseUrl + 'getCountries.php')
            },
            getStates: function(countryCode) {
                return $http.get(baseUrl + 'getStates.php?countryCode=' +
                    encodeURIComponent(countryCode));
            }
        };
    });

    app.controller('CountryController', function(countryService){
        var that = this;
        countryService.getCountries().success(function(data){
            //this.countries = data; will not work because this
            //refers to the window object, not the controller instance
            that.countries = data;
        });
    });

    app.config(function($routeProvider) {
        $routeProvider.when('/states/:countryCode', {
            templateUrl: 'state-view.html',
            controller: function ($routeParams, countryService) {
                this.params = $routeParams;

                var that = this;

                countryService.getStates(this.params.countryCode || "").success(function (data) {
                    that.states = data;
                })

                this.addStateTo = function () {
                    //adding an array for the countries that don't currently
                    //have states
                    if (!this.states) {
                        this.states = [];
                    }
                    this.states.push({name: this.newState});
                    this.newState = ""; //clears the state after it's added
                };
            },
            controllerAs: 'stateCtrl'
        });
    });
})();
