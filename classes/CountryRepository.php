<?php

require 'Country.php';
require 'State.php';

class CountryRepository
{
    private static $countries = array();

    protected static function init() {
        $countries = array();
        array_push($countries, new Country('Austria', 'at', array(
            new State('Styria'), new State('Tyrol')
        )));

        array_push($countries, new Country('Canada', 'ca', array(
            new State('Ontario'), new State('Quebec')
        )));

        array_push($countries, new Country('Luxembourg', 'lu'));

        self::$countries = $countries;
    }

    public static function getCountries(){
        if(count(self::$countries) === 0){
            self::init();
        }
        return self::$countries;
    }

    public static function getStates($countryCode){
        if(count(self::$countries) === 0){
            self::init();
        }
        //array_filter takes in an array and adds an element of that array to the new
        //array if it returns true when passed into the passed in function
        $country = array_filter(self::$countries, function($c) use ($countryCode){
            return $c->code === $countryCode;
        });
        if (count($country) === 0){
            return array();
        }
        //shifts off an element from the beginning of the array
        $firstCountry = array_shift($country);
        return $firstCountry->states;
    }
}