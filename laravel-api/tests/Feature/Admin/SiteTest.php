<?php

use App\Models\Site;
use App\Models\User;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\seed;

beforeEach(function () {
    seed(\Database\Seeders\DatabaseSeeder::class);
    Site::factory()->create([
        'title' => 'HORSE24',
    ]);
});

it('has default parent site', function () {
    $site = Site::first();

    expect($site->title)->toBe('HORSE24')
        ->and($site->default_language)->toBe(\App\Enums\Languages::GERMAN->value);
});

it('can access site list page', function () {
    $user = User::first();

    actingAs($user)
        ->get('/admin/sites')
        ->assertOk();
});

it('can access to create site page', function () {
    $user = User::first();

    actingAs($user)
        ->get('/admin/sites/create')
        ->assertOk();
});

it('can create new site', function () {
    $user = User::first();

    actingAs($user)
        ->post('/admin/sites', [
            'title' => $title = fake()->name,
            'domain' => $domain = fake()->userName,
            'admin_id' => $user->id,
            'default_language' => \App\Enums\Languages::GERMAN->value,
            'other_languages' => [\App\Enums\Languages::ENGLISH->value],
            'alternate_domain' => null,
        ])
        ->assertFound();

    $site = \App\Models\Site::find(2);

    expect($site->title)->toBe($title)
        ->and($site->tenant->domains->first()->domain)->toBe($domain)
        ->and($site->default_language)->toBe(\App\Enums\Languages::GERMAN->value);
});

it('cannot create site without title', function () {
    $user = User::first();

    actingAs($user)
        ->post('/admin/sites', [
            'domain' => fake()->userName,
            'admin_id' => $user->id,
            'default_language' => \App\Enums\Languages::GERMAN->value,
            'other_languages' => [\App\Enums\Languages::ENGLISH->value],
            'alternate_domain' => null,
        ])
        ->assertSessionHasErrors();
});

it('can update existing site')->todo();
