<?php

namespace App\Services\Admin\RolePermission;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Support\Str;

class RoleService
{
    public function createRole(array $data)
    {
        $data['guard_name'] = 'web';
        $data['name'] = Str::slug($data['display_name'], '.');
        $role = Role::create($data);

        return $role;
    }

    public function updateRole(Role $role, array $data)
    {
        $data['name'] = Str::slug($data['display_name'], '.');

        return tap($role)->update($data);
    }

    public function getRolePermissions($roleId)
    {
        $role = Role::withCount('permissions')
            ->findOrFail($roleId);

        $permissions = Permission::get();

        $data = [
            'id' => 0,
            'text' => 'Check all',
            'depth' => 2,
            'state' => [
                'checked' => $role->permissions_count === $permissions->count(),
                'selected' => false,
                'expanded' => true,
            ],
            'nodes' => $this->generateRolePermissions($role, $permissions),
        ];

        return $data;
    }

    /**
     * Recursive function to generate all permissions tree
     */
    public function generateRolePermissions($role, $permissions, $parent = null)
    {
        $data = [];
        $parentPermissions = $permissions->where('parent_id', $parent);

        foreach ($parentPermissions as $parentPermission) {
            $data[] = [
                'id' => $parentPermission->id,
                'text' => $parentPermission->display_name,
                'depth' => 1,
                'state' => [
                    'checked' => $this->roleHasPermissions($role, $parentPermission->id),
                    'selected' => false,
                    'expanded' => false,
                ],
                'nodes' => $this->generateRolePermissions($role, $permissions, $parentPermission->id),
            ];
        }

        return $data;
    }

    /**
     * Check if the role has the permission
     *
     * @return bool
     */
    public function roleHasPermissions($role, $permissionId)
    {
        return in_array($permissionId, $role->permissions->pluck('id')->toArray());
    }

    public function assignPermissionsToRole($data)
    {
        $role = Role::findOrFail($data['roleId']);

        $permissions = Permission::whereIn('id', $data['permissions'])
            ->pluck('name')
            ->toArray();

        $role->syncPermissions($permissions);
    }
}
