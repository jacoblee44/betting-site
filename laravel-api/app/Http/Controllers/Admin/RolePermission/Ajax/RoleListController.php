<?php

namespace App\Http\Controllers\Admin\RolePermission\Ajax;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\RolePermission\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleListController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $roles = Role::all();

        return RoleResource::collection($roles);
    }
}
