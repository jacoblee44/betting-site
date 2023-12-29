<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\UpdatePasswordRequest;
use App\Services\Admin\Auth\PasswordService;
use Illuminate\Http\RedirectResponse;

class PasswordController extends Controller
{
    public function __construct(private readonly PasswordService $passwordService)
    {
    }

    /**
     * Update the password for the admin.
     *
     * @throws \Illuminate\Validation\ValidationException
     * @throws \InvalidArgumentException
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function update(UpdatePasswordRequest $request): RedirectResponse
    {
        $this->passwordService->updatePassword($request->user(), $request->validated());

        return back()->with('status', 'password-updated');
    }
}
