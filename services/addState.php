<?php
class DBClass {
    private static $DB_CONNECTIONSTRING = 'sqlite:/xampp/htdocs/angularjs-php/db/countries.db';
    private static $DB_USERNAME = '';
    private static $DB_PASSWORD = '';

    private static $db = null;

    protected static function connect() {
        self::$db = new PDO(self::$DB_CONNECTIONSTRING, self::$DB_USERNAME, self::$DB_PASSWORD);
    }

    public static function execute($sql,$values = array()){
        if(self::$db === null) {
            self::connect();
        }
        $statement = self::$db->prepare($sql);
        $statement->execute($values);
        return $statement;
    }

    public static function query($sql,$values = array()) {
        $statement = self::execute($sql,$values);
        return $statement->fetchAll(PDO::FETCH_CLASS);
    }

}