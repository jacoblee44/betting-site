<?php

use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Spatie\Activitylog\Models\Activity;

beforeEach(function () {
    Artisan::call('migrate');
});

it('should log into DB', function () {
    expect(Activity::count())->toBe(0);

    activity()->log('Test');

    expect(Activity::count())->toBe(1);
    expect(Activity::first()->description)->toBe('Test');
});

it('should log into DB with changes', function () {
    expect(Activity::count())->toBe(0);

    $user = User::factory()->create();

    expect(Activity::count())->toBe(1);
    expect(Activity::first()->description)->toBe('created');
    expect(Activity::first()->changes)
        ->toMatchArray(
            ['attributes' => $user->only('firstname', 'lastname', 'email')]
        );

    $oldData = $user->only('firstname', 'lastname', 'email');
    $user->update(['firstname' => 'Tester']);

    expect(Activity::count())->toBe(2);
    expect(Activity::latest('id')->first())
        ->description->toBe('updated')
        ->changes
        ->toMatchArray(collect(
            [
                'old' => $oldData,
                'attributes' => $user->only('firstname', 'lastname', 'email'),
            ]
        ));
});
