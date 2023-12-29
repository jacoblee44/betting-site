<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * All api routes will be placed here as they are used for tenant.php and api.php routes.
 * api.php and tenant.php won't be update. If you have any api route to add you SHOULD use this file.
 */
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
