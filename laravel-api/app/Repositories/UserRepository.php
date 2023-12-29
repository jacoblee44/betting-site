<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository
{
    public function getAllUsers()
    {
        return User::query()
            ->with([
                'roles',
            ])
            ->latest()
            ->get();
    }

    public function createUser(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create($data);

            $user->roles()->attach($data['role_id']);

            return $user;
        });
    }

    public function updateUser(User $user, array $data): User
    {
        return DB::transaction(function () use ($user, $data) {
            $user->update($data);

            $user->roles()->sync($data['role_id']);

            return $user;
        });
    }

    public function deleteUser(User $user): void
    {
        $user->delete();
    }
}
