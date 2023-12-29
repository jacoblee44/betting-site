<?php

namespace App\Http\Controllers\Admin\RolePermission;

use App\Http\Controllers\Controller;

class AssignPermissionController extends Controller
{
    public function __invoke()
    {
        return view('admin.role-permission.assign-permissions-to-role');
    }
}
