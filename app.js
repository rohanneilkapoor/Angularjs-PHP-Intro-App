//creating this allows for avoiding global variables
(function(){

    var app = angular.module('funwithcountries',[]);

    app.controller('CountryController', function($http){
        var that = this;
        $http({
            method: 'GET',
            url: 'services/getCountries.php'
        }).success(function(data){
            //this.countries = data; will not work because this
            //refers to the window object, not the controller instance
            that.countries = data;
        });


        //this.countries =[];
    });
})();