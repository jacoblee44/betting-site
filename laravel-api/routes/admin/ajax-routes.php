<?php

use App\Http\Controllers\Admin\RolePermission\Ajax\RoleListController;
use App\Http\Controllers\Admin\RolePermission\Ajax\RolePermissionController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    // ROLE-PERMISSIONS
    Route::get('role-list', RoleListController::class)->name('role.list');
    Route::get('role-permissions/{roleId}', [RolePermissionController::class, 'show'])->name('role.show.permissions');
    Route::post('update-role-permissions', [RolePermissionController::class, 'update'])->name('update.role.permissions');
});
