//creating this allows for avoiding global variables
(function(){

    var app = angular.module('funwithcountries',[]);

    app.factory('countryService',function($http){
        var baseUrl = 'services/';
        return{
           getCountries: function(){
               return $http.get(baseUrl + 'getCountries.php')
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

    app.directive('stateView', function(){
       return{
           restrict: 'E',
           templateUrl: 'state-view.html',
           controller: function() {
               this.addStateTo = function(country){
                   //adding an array for the countries that don't currently
                   //have states
                   if(!country.states){
                       country.states = [];
                   }
                   country.states.push({name: this.newState});
                   this.newState = ""; //clears the state after it's added
               };
           },
           controllerAs: 'stateCtrl'
       }
    });

})();
