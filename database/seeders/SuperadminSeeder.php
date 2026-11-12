<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class SuperadminSeeder extends Seeder
{
    /**
     * Create or update the static superadmin account from the environment.
     */
    public function run(): void
    {
        $name = config('tindaflow.superadmin.name');
        $email = config('tindaflow.superadmin.email');
        $password = config('tindaflow.superadmin.password');

        if (! is_string($email) || $email === '' || ! is_string($password) || $password === '') {
            Log::warning('Superadmin was not seeded: set SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD in .env.');

            return;
        }

        $user = User::firstOrNew(['email' => $email]);

        // is_superadmin is intentionally not mass assignable, so set it explicitly.
        $user->forceFill([
            'name' => is_string($name) && $name !== '' ? $name : 'TindaFlow Superadmin',
            'password' => $password,
            'email_verified_at' => $user->email_verified_at ?? now(),
            'is_superadmin' => true,
        ])->save();
    }
}
