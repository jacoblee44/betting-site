<?php

declare(strict_types=1);

use App\Models\User;
use App\Providers\RouteServiceProvider;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\seed;
use Symfony\Component\Process\Process;

beforeAll(fn () => Process::fromShellCommandline('npm run build', __DIR__.'/../../../../')->run());

beforeEach(function () {
    seed(\Database\Seeders\UsersTableSeeder::class);
});

it('can render login screen', function () {
    get(uri: route('admin.login'))->assertOk();
});

it('user can authenticate using login screen', closure: function () {
    $user = User::first();

    post(uri: route('admin.login.post'), data: [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect(RouteServiceProvider::HOME);
});

it('user cannot authenticate with invalid password', function () {
    $user = User::first();

    post(uri: route('admin.login.post'), data: [
        'email' => $user->email,
        'password' => fake()->password,
    ])->assertSessionHasErrors();
});
