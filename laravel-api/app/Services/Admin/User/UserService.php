<?php

namespace App\Services\Admin\User;

use App\Models\User;
use App\Repositories\UserRepository;

class UserService
{
    public function __construct(protected UserRepository $userRepository)
    {
        //
    }

    public function getAllUsers()
    {
        return $this->userRepository->getAllUsers();
    }

    public function createUser(array $data): User
    {
        $user = $this->userRepository->createUser($data);

        // TODO: Send email to user
        return $user;
    }

    public function updateUser(User $user, array $data): User
    {
        return $this->userRepository->updateUser($user, $data);
    }

    public function deleteUser(User $user): void
    {
        $this->userRepository->deleteUser($user);
    }
}
