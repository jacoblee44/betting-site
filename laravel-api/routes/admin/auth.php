<?php

use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\Auth\NewPasswordController;
use App\Http\Controllers\Admin\Auth\PasswordController;
use App\Http\Controllers\Admin\Auth\PasswordResetLinkController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {

    Route::middleware('guest')->group(function () {
        Route::view('login', 'admin.auth.login')
            ->name('login');

        Route::post('login', [LoginController::class, 'store'])
            ->name('login.post');

        Route::view('forgot-password', 'admin.auth.forgot-password')
            ->name('password.request');

        Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
            ->name('password.email');

        Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
            ->name('password.reset');

        Route::post('reset-password', [NewPasswordController::class, 'store'])
            ->name('password.store');
    });

    Route::middleware('auth')->group(function () {
        Route::put('password', [PasswordController::class, 'update'])
            ->name('password.update');

        Route::get('logout', [LoginController::class, 'destroy'])
            ->name('logout');
    });

});
