<?php

namespace App\Http\Controllers\Admin\RolePermission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RolePermission\RoleRequest;
use App\Models\Role;
use App\Services\Admin\RolePermission\RoleService;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::paginate(20);

        return view('admin.role-permission.role.index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $role = new Role();

        return view('admin.role-permission.role.create', compact('role'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request, RoleService $roleService)
    {
        $roleService->createRole($request->validated());

        return to_route('admin.roles.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        return view('admin.role-permission.role.edit', compact('role'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, Role $role, RoleService $roleService)
    {
        $roleService->updateRole($role, $request->validated());

        return to_route('admin.roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return to_route('admin.roles.index');
    }
}
