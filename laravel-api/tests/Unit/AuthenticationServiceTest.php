<?php

use App\Services\Admin\Auth\AuthenticationService;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

it('has rate limiting', function (string $email, string $ip, bool $shouldThrow) {
    RateLimiter::shouldReceive('tooManyAttempts')
        ->with(Str::transliterate(Str::lower($email).'|'.$ip), 5)
        ->andReturn($shouldThrow);

    RateLimiter::shouldReceive('availableIn')
        ->with(Str::transliterate(Str::lower($email).'|'.$ip))
        ->andReturn(60);

    RateLimiter::shouldReceive('hit')
        ->with(Str::transliterate(Str::lower($email).'|'.$ip))
        ->andReturn(1);

    $service = new AuthenticationService();

    if ($shouldThrow) {
        expect(fn () => $service->ensureIsNotRateLimited($email, $ip))
            ->toThrow(ValidationException::class);
    } else {
        expect($service->ensureIsNotRateLimited($email, $ip))
            ->toBeNull();
    }
})->with('credentials');
