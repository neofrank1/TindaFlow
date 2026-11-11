<?php

use App\Models\User;

test('guests are redirected to the superadmin login page', function () {
    $response = $this->get(route('superadmin'));

    $response->assertRedirect(route('superadmin.login'));
});

test('ordinary users cannot access the superadmin dashboard', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('superadmin'))
        ->assertForbidden();
});

test('approved superadmins can sign in and access the dashboard', function () {
    $user = User::factory()->create(['is_superadmin' => true]);

    $response = $this->post(route('superadmin.login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $response->assertRedirect(route('superadmin', absolute: false));
    $this->assertAuthenticatedAs($user);
    $this->get(route('superadmin'))->assertOk();
});

test('ordinary users cannot sign in through the superadmin login page', function () {
    $user = User::factory()->create();

    $this->from(route('superadmin.login'))
        ->post(route('superadmin.login.store'), [
            'email' => $user->email,
            'password' => 'password',
        ])
        ->assertRedirect(route('superadmin.login'))
        ->assertSessionHasErrors('email');

    $this->assertGuest();
});
