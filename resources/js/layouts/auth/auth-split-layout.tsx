import { Link, usePage } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

const bars = [24, 36, 50, 42, 58, 46, 64, 0, 54, 38];

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="grid min-h-svh bg-background lg:grid-cols-2">
            <div className="flex flex-col gap-8 p-6 md:p-10">
                <Link
                    href={home()}
                    className="flex items-center gap-2.5 self-start text-lg font-bold"
                >
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <ShoppingBag className="size-5" />
                    </span>
                    {name}
                </Link>

                <div className="flex flex-1 items-center justify-center">
                    <div className="flex w-full max-w-sm flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl leading-tight font-bold tracking-tight">
                                {title}
                            </h1>
                            <p className="text-base text-muted-foreground">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>

            <aside className="hidden flex-col justify-center gap-8 bg-[#0F2A3F] p-12 text-white lg:flex">
                <span className="self-start rounded-full bg-[#F2C230] px-3.5 py-1.5 text-xs font-semibold text-[#0F2A3F]">
                    Today at the counter
                </span>
                <h2 className="max-w-md text-4xl leading-tight font-bold tracking-tight">
                    Your shop, one tap from open.
                </h2>
                <div className="flex max-w-md flex-col gap-4 rounded-2xl border border-[#35566E] bg-[#16405E] p-6">
                    <div className="flex items-baseline justify-between">
                        <span className="text-sm text-[#BFD6E4]">
                            Sales so far
                        </span>
                        <span className="text-xs font-semibold text-[#F2C230]">
                            +12.4%
                        </span>
                    </div>
                    <span className="text-4xl font-bold tracking-tight">
                        ₱44,200.00
                    </span>
                    <div
                        className="flex h-20 items-end gap-2"
                        role="img"
                        aria-label="Small bar chart of sales growing through the day"
                    >
                        {bars.map((h, i) => (
                            <div
                                key={i}
                                className={
                                    i === 6
                                        ? 'flex-1 rounded bg-[#D2392D]'
                                        : 'flex-1 rounded bg-[#8CC4E2]/55'
                                }
                                style={{ height: `${Math.max(h, 40)}%` }}
                            />
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm text-[#BFD6E4]">
                        <span>126 orders</span>
                        <span>7 items low on stock</span>
                    </div>
                </div>
                <p className="text-xs text-[#BFD6E4]">
                    Sample figures shown for illustration.
                </p>
            </aside>
        </div>
    );
}
