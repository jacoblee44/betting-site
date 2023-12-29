<?php

namespace App\Services\Admin\Auth;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class PasswordService
{
    /**
     * Reset the given user's password.
     */
    public function resetPassword(array $credentials): string|User
    {
        return Password::reset(
            $credentials,
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );
    }

    public function updatePassword(User $user, array $requestData): bool
    {
        return $user->forceFill([
            'password' => Hash::make($requestData['password']),
            'remember_token' => Str::random(60),
        ])->save();
    }
}
