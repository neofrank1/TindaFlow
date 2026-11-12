<?php

use App\Models\User;
use Database\Seeders\SuperadminSeeder;
use Illuminate\Support\Facades\Hash;

beforeEach(function () {
    config()->set('tindaflow.superadmin', [
        'name' => 'Frank Owner',
        'email' => 'owner@tindaflow.test',
        'password' => 'a-long-static-password',
    ]);
});

test('the seeder creates the static superadmin account', function () {
    $this->seed(SuperadminSeeder::class);

    $user = User::where('email', 'owner@tindaflow.test')->firstOrFail();

    expect($user->name)->toBe('Frank Owner')
        ->and($user->is_superadmin)->toBeTrue()
        ->and($user->email_verified_at)->not->toBeNull()
        ->and(Hash::check('a-long-static-password', $user->password))->toBeTrue();
});

test('the static superadmin can sign in through the superadmin login', function () {
    $this->seed(SuperadminSeeder::class);

    $this->post(route('superadmin.login.store'), [
        'email' => 'owner@tindaflow.test',
        'password' => 'a-long-static-password',
    ])->assertRedirect(route('superadmin', absolute: false));

    $this->get(route('superadmin'))->assertOk();
});

test('running the seeder again does not create a duplicate', function () {
    $this->seed(SuperadminSeeder::class);
    $this->seed(SuperadminSeeder::class);

    expect(User::where('email', 'owner@tindaflow.test')->count())->toBe(1);
});

test('the seeder does nothing when the credentials are not configured', function () {
    config()->set('tindaflow.superadmin', [
        'name' => 'Frank Owner',
        'email' => null,
        'password' => null,
    ]);

    $this->seed(SuperadminSeeder::class);

    expect(User::count())->toBe(0);
});
