<?php

namespace App\Services\Admin\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthenticationService
{
    /**
     * Log the admin user into the application.
     *
     * @return void
     *
     * @throws \Throwable
     * @throws \RuntimeException
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     * @throws \Psr\Container\NotFoundExceptionInterface
     * @throws \Psr\Container\ContainerExceptionInterface
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(array $credentials, bool $remember, string $ip)
    {
        if (! Auth::attempt($credentials, $remember)) {
            $this->hitAttempt($credentials['email'], $ip);

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        $this->clearAttempts($credentials['email'], $ip);
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @return void
     *
     * @throws \Psr\SimpleCache\InvalidArgumentException
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     * @throws \Psr\Container\NotFoundExceptionInterface
     * @throws \Psr\Container\ContainerExceptionInterface
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(string $email, string $ip)
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey($email, $ip), 5)) {
            return;
        }

        event(new Lockout(request()));

        $seconds = RateLimiter::availableIn($this->throttleKey($email, $ip));

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Increment the login attempts for the user.
     */
    public function hitAttempt(string $email, string $ip): int
    {
        return RateLimiter::hit($this->throttleKey($email, $ip));
    }

    /**
     * Clear the login locks for the given user credentials.
     *
     * @return void
     */
    public function clearAttempts(string $email, string $ip)
    {
        RateLimiter::clear($this->throttleKey($email, $ip));
    }

    /**
     * Get the throttle key for the given credentials.
     */
    private function throttleKey(string $email, string $ip): string
    {
        return Str::transliterate(Str::lower($email).'|'.$ip);
    }
}
