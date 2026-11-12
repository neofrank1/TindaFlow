<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Static Superadmin Account
    |--------------------------------------------------------------------------
    |
    | The fixed account that can sign in to the TindaFlow superadmin area.
    | It is created or updated by `php artisan db:seed --class=SuperadminSeeder`.
    | Keep the credentials in your .env file and never commit them.
    |
    */

    'superadmin' => [
        'name' => env('SUPERADMIN_NAME', 'TindaFlow Superadmin'),
        'email' => env('SUPERADMIN_EMAIL'),
        'password' => env('SUPERADMIN_PASSWORD'),
    ],

];
