<?php

use App\Models\User;

beforeEach(function () {
    // Create a new user
    $user = User::factory()->create();

    // Authenticate the user
    $this->actingAs($user);
});

it('displays the list of roles', function () {
    $response = $this->get('/admin/roles');
    $response->assertStatus(200);
    $response->assertViewIs('admin.role-permission.role.index');
});
