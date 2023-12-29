<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RolePermission\AssignPermissionController;
use App\Http\Controllers\Admin\RolePermission\RoleController;
use App\Http\Controllers\Admin\SiteController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware(['auth', 'verified'])->group(callback: function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
        Route::resource('users', UserController::class);
        //Route::resource('sites', SiteController::class);

        Route::get('sites', [SiteController::class, 'index'])->name('sites.index');
        Route::get('sites/create', [SiteController::class, 'create'])->name('sites.create');
        Route::get('sites/{site}/edit', [SiteController::class, 'edit'])->name('sites.edit');
        Route::put('sites/{site}', [SiteController::class, 'update'])->name('sites.update');
        Route::post('sites', [SiteController::class, 'store'])
            ->name('sites.store')
            ->middleware([HandlePrecognitiveRequests::class]);

        // ROLE-PERMISSIONS
        Route::resource('roles', RoleController::class);
        Route::get('assign-permissions-to-role', AssignPermissionController::class)
            ->name('assign-permissions-to-role');
    });
});
