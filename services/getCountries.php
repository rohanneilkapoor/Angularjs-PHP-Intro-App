<?php

require '../classes/CountryRepository.php';

header('Content-type: application/json');

echo ")]}'\n"; //this is a feature of angularjs that prevents
//users from trying to parse json info

$countries = CountryRepository::getCountries();
echo json_encode($countries);