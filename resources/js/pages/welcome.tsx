import { Head, Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    CreditCard,
    Package,
    ShieldCheck,
    ShoppingBag,
    ShoppingCart,
    Users,
} from 'lucide-react';
import { dashboard, login, register } from '@/routes';

const features = [
    {
        icon: ShoppingCart,
        title: 'Fast checkout',
        text: 'Tap products, apply discounts, split payments and print or send receipts without leaving one screen.',
    },
    {
        icon: Package,
        title: 'Live inventory',
        text: 'Stock counts drop as items sell. Get low-stock alerts before a best-seller runs out.',
    },
    {
        icon: BarChart3,
        title: 'Sales reports',
        text: 'See sales by hour, product and payment method, then export daily summaries for your bookkeeping.',
    },
    {
        icon: Users,
        title: 'Customers and loyalty',
        text: 'Keep purchase history for regulars and reward repeat visits with points or discounts.',
    },
    {
        icon: CreditCard,
        title: 'Cash, card and e-wallets',
        text: 'Record every payment type and reconcile your drawer at the end of each shift.',
    },
    {
        icon: ShieldCheck,
        title: 'Roles and permissions',
        text: 'Give cashiers only the checkout screen. Keep voids, refunds and reports for managers.',
    },
];

const steps = [
    {
        n: '01',
        title: 'Add your products',
        text: 'Create categories, set prices and stock levels, or import a spreadsheet.',
    },
    {
        n: '02',
        title: 'Invite your team',
        text: 'Add cashiers and managers, each with the access they need.',
    },
    {
        n: '03',
        title: 'Open the terminal',
        text: 'Start your shift, take orders, and watch the dashboard update as you sell.',
    },
];

const products = [
    { name: 'Americano', price: '₱110', selected: false },
    { name: 'Iced Latte', price: '₱145', selected: true },
    { name: 'Matcha Latte', price: '₱165', selected: false },
    { name: 'Croissant', price: '₱95', selected: true },
    { name: 'Banana Bread', price: '₱85', selected: false },
    { name: 'Bottled Water', price: '₱30', selected: false },
];

export default function Welcome() {
    const { auth, name } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-background text-foreground">
                {/* Nav */}
                <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 text-xl font-bold"
                    >
                        <span className="flex size-9 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
                            <ShoppingBag className="size-5" />
                        </span>
                        {name}
                    </Link>
                    <nav
                        aria-label="Primary"
                        className="hidden gap-7 text-[15px] font-medium md:flex"
                    >
                        <a href="#features" className="hover:text-primary">
                            Features
                        </a>
                        <a href="#how" className="hover:text-primary">
                            How it works
                        </a>
                        <a href="#start" className="hover:text-primary">
                            Get started
                        </a>
                    </nav>
                    <div className="flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-flex min-h-11 items-center rounded-[10px] bg-foreground px-[18px] text-[15px] font-semibold text-background"
                            >
                                Open dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-flex min-h-11 items-center px-3.5 text-[15px] font-medium"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-flex min-h-11 items-center rounded-[10px] bg-foreground px-[18px] text-[15px] font-semibold text-background"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </header>

                {/* Hero */}
                <section className="mx-auto flex max-w-7xl flex-wrap items-center gap-14 px-6 pt-12 pb-20 lg:px-8">
                    <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
                        <span className="self-start rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-foreground">
                            Point of sale for shops, cafés and small chains
                        </span>
                        <h1 className="text-5xl leading-[1.04] font-bold tracking-tight lg:text-6xl">
                            Ring up sales faster. Know your shop better.
                        </h1>
                        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                            {name} gives your cashiers a quick checkout screen
                            and gives you a clear view of sales, stock and
                            customers, all in the browser on any tablet or
                            laptop.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-3">
                            <Link
                                href={auth.user ? dashboard() : register()}
                                className="inline-flex min-h-12 items-center rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground"
                            >
                                Start selling
                            </Link>
                            <a
                                href="#features"
                                className="inline-flex min-h-12 items-center rounded-xl border border-input bg-card px-6 text-base font-semibold"
                            >
                                See what's inside
                            </a>
                        </div>
                    </div>

                    {/* Terminal mock */}
                    <div
                        className="min-w-0 flex-[1_1_480px]"
                        aria-hidden="true"
                    >
                        <div className="flex flex-wrap gap-5 rounded-[20px] border bg-card p-5 shadow-[0_24px_60px_-24px_rgba(15,42,63,0.3)]">
                            <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-3.5">
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-foreground px-3.5 py-1.5 text-[13px] font-semibold text-background">
                                        All
                                    </span>
                                    <span className="rounded-full bg-secondary px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground">
                                        Drinks
                                    </span>
                                    <span className="rounded-full bg-secondary px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground">
                                        Bakery
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2.5">
                                    {products.map((p) => (
                                        <div
                                            key={p.name}
                                            className={
                                                p.selected
                                                    ? 'flex flex-col gap-5 rounded-xl border-2 border-primary bg-accent/50 p-[11px]'
                                                    : 'flex flex-col gap-5 rounded-xl border p-3'
                                            }
                                        >
                                            <span className="text-sm font-semibold">
                                                {p.name}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {p.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-3 rounded-[14px] bg-background p-4">
                                <div className="text-[15px] font-bold">
                                    Current order
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>2 × Iced Latte</span>
                                    <span>₱290.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>1 × Croissant</span>
                                    <span>₱95.00</span>
                                </div>
                                <div className="flex justify-between border-t border-dashed border-input pt-3 text-[13px] text-muted-foreground">
                                    <span>VAT (12% incl.)</span>
                                    <span>₱41.25</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>₱385.00</span>
                                </div>
                                <div className="rounded-[10px] bg-destructive p-3 text-center text-sm font-semibold text-white">
                                    Charge ₱385.00
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section
                    id="features"
                    className="mx-auto max-w-7xl px-6 pt-10 pb-24 lg:px-8"
                >
                    <div className="mb-10 flex max-w-2xl flex-col gap-3">
                        <span className="text-sm font-semibold text-accent-foreground">
                            Features
                        </span>
                        <h2 className="text-4xl leading-tight font-bold tracking-tight">
                            Everything at the counter, nothing you don't need.
                        </h2>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((f) => (
                            <article
                                key={f.title}
                                className="flex flex-col gap-3 rounded-2xl border bg-card p-7"
                            >
                                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                                    <f.icon className="size-[22px]" />
                                </span>
                                <h3 className="text-xl font-semibold">
                                    {f.title}
                                </h3>
                                <p className="leading-relaxed text-muted-foreground">
                                    {f.text}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* How it works */}
                <section id="how" className="bg-[#0F2A3F] text-white">
                    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-22 lg:px-8">
                        <h2 className="max-w-2xl text-4xl leading-tight font-bold tracking-tight">
                            From first login to first sale in three steps.
                        </h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            {steps.map((s) => (
                                <div
                                    key={s.n}
                                    className="flex flex-col gap-2.5 border-t border-[#35566E] pt-5"
                                >
                                    <span className="text-sm font-semibold text-[#F2C230]">
                                        {s.n}
                                    </span>
                                    <h3 className="text-[22px] font-semibold">
                                        {s.title}
                                    </h3>
                                    <p className="leading-relaxed text-[#BFD6E4]">
                                        {s.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section
                    id="start"
                    className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
                >
                    <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-primary p-10 md:px-12 md:py-14">
                        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-2.5">
                            <h2 className="text-4xl leading-tight font-bold tracking-tight text-primary-foreground">
                                Ready to open your first register?
                            </h2>
                            <p className="text-[17px] text-[#F2F9FD]">
                                Create your account and have the terminal
                                running today.
                            </p>
                        </div>
                        <Link
                            href={auth.user ? dashboard() : register()}
                            className="inline-flex min-h-12 items-center rounded-xl bg-white px-7 text-base font-semibold text-[#0F2A3F]"
                        >
                            {auth.user ? 'Open dashboard' : 'Create your account'}
                        </Link>
                    </div>
                </section>

                <footer className="border-t">
                    <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-6 py-8 text-sm text-muted-foreground lg:px-8">
                        <span>© 2026 {name}</span>
                        <span className="flex gap-5">
                            <a href="#">Privacy</a>
                            <a href="#">Terms</a>
                            <a href="#">Contact</a>
                        </span>
                    </div>
                </footer>
            </div>
        </>
    );
}
