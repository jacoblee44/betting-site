<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use App\Services\Admin\Auth\AuthenticationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function __construct(private readonly AuthenticationService $authService)
    {
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $this->authService->ensureIsNotRateLimited(
            email: $request->email,
            ip: $request->ip()
        );

        $this->authService->login(
            credentials: $request->only('email', 'password'),
            remember: $request->boolean('remember'),
            ip: $request->ip()
        );

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
