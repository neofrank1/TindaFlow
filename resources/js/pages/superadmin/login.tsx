import { Form, Head } from '@inertiajs/react';
import { LockKeyhole } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export default function SuperadminLogin() {
    return (
        <>
            <Head title="Superadmin sign in" />
            <div className="mb-6 flex flex-col items-center gap-2 text-center">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <LockKeyhole className="size-5" />
                </span>
                <p className="text-sm text-muted-foreground">
                    Restricted TindaFlow administration access
                </p>
            </div>

            <Form
                action="/superadmin/login"
                method="post"
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="admin@tindaflow.ph"
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                />
                                <InputError message={errors.password} />
                            </div>
                            <div className="flex items-center gap-3">
                                <Checkbox id="remember" name="remember" />
                                <Label htmlFor="remember">
                                    Remember this device
                                </Label>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            {processing && <Spinner />}
                            Sign in securely
                        </Button>
                    </>
                )}
            </Form>
        </>
    );
}

SuperadminLogin.layout = {
    title: 'Superadmin sign in',
    description: 'Use an approved superadmin account to continue.',
};
