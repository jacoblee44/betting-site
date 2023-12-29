<?php

use Illuminate\Support\Facades\Route;

/**
 * All web routes will be placed here as they are used for tenant.php and web.php routes.
 * web.php and tenant.php won't be update. If you have any web route to add you SHOULD use this file
 */
Route::get('/', function () {
    return view('welcome');
});

require __DIR__.'/admin/auth.php';
