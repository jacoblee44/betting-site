<?php

namespace App\Http\Controllers\Admin\RolePermission\Ajax;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RolePermission\RolePermissionRequest;
use App\Services\Admin\RolePermission\RoleService;

class RolePermissionController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(int $roleId, RoleService $roleService)
    {
        $data = $roleService->getRolePermissions($roleId);

        return response()->json(['data' => [$data]]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RolePermissionRequest $request, RoleService $roleService)
    {
        $roleService->assignPermissionsToRole($request->validated());

        return response()->json([
            'success' => true,
        ]);
    }
}
