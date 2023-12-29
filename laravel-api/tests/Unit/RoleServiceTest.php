<?php

use App\Models\Role;
use App\Services\Admin\RolePermission\RoleService;
use Mockery\MockInterface;

it('should call static create on Role model', function () {
    $data = [
        'name' => 'Test Role',
        'display_name' => 'Test Role Description',
    ];

    $serviceMock = Mockery::mock(RoleService::class, function (MockInterface $mock) use ($data) {
        $mock->shouldReceive('createRole')
            ->once()
            ->with($data);
    });

    Mockery::anyOf(Role::class, function (MockInterface $mock) use ($data) {
        $mock->shouldReceive('create')
            ->once()
            ->with($data);
    });

    $serviceMock->createRole($data);
});
