<?php

use App\Models\User;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\seed;

beforeEach(function () {
    seed(\Database\Seeders\DatabaseSeeder::class);
});

it('can view users in the index page', function () {
    $user = User::first();

    actingAs($user)
        ->get('/admin/users')
        ->assertOk();
});
