import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowDown,
    BarChart3,
    Banknote,
    Check,
    Heart,
    NotebookPen,
    Package,
    ShoppingBag,
    Smartphone,
    Sparkles,
    Store,
    Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import AnimatedNumber from '@/components/landing/animated-number';
import PosDemo from '@/components/landing/pos-demo';
import type { Sale } from '@/components/landing/pos-demo';
import Reveal from '@/components/landing/reveal';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { dashboard, login, register } from '@/routes';

// TODO: point this at your real sales contact (a mailto: link or a contact page).
const SALES_HREF = '#';

// Add real customer quotes here and the testimonials section appears
// automatically. It is empty on purpose so no invented reviews are shown.
type Testimonial = { quote: string; name: string; role: string };
const testimonials: Testimonial[] = [];

const rotatingWords = [
    'Tindahan',
    'Sari-sari Store',
    'Karinderya',
    'Panaderya',
    'Botika',
];

const features = [
    {
        icon: Zap,
        title: 'Lightning-fast POS',
        text: 'Ring up sales in seconds. Works offline too, perfect for areas with unstable internet. Supports barcode scanning.',
    },
    {
        icon: Package,
        title: 'Smart inventory',
        text: 'Auto-track stock levels. Get alerts when items run low. Never miss a sale because you ran out of stock.',
    },
    {
        icon: Smartphone,
        title: 'GCash & Maya ready',
        text: 'Accept cash, GCash, Maya, and bank transfers. Track all payments in one place. Auto-reconcile daily.',
    },
    {
        icon: BarChart3,
        title: 'Sales analytics',
        text: 'Know your best sellers, peak hours, and daily trends. Make smarter decisions with real-time dashboards.',
    },
    {
        icon: NotebookPen,
        title: 'Utang tracker',
        text: 'Track customer credit (utang) digitally. Send SMS reminders automatically. No more lost notebooks!',
    },
    {
        icon: Store,
        title: 'Multi-branch',
        text: 'Manage multiple stores from one account. Compare performance across branches. Centralized inventory.',
    },
];

const plans = [
    {
        id: 'starter',
        name: 'Starter',
        monthly: null,
        yearly: null,
        blurb: 'Perfect for sari-sari stores getting started',
        features: [
            '1 store location',
            'Up to 50 products',
            'Basic POS',
            'Utang tracker',
        ],
        cta: 'Get started free',
        popular: false,
    },
    {
        id: 'pro',
        name: 'Pro',
        monthly: 799,
        yearly: 639,
        blurb: 'For growing businesses and retail shops',
        features: [
            'Up to 3 branches',
            'Unlimited products',
            'GCash & Maya integration',
            'Sales analytics',
            'SMS reminders',
        ],
        cta: 'Start 14-day free trial',
        popular: true,
    },
];

const focusRing =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

/** Tilts its children slightly toward the mouse. Mouse only, off for reduced motion. */
function TiltCard({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();

    const onMove = (e: PointerEvent<HTMLDivElement>) => {
        const el = ref.current;

        if (!el || reduced || e.pointerType !== 'mouse') {
            return;
        }

        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;

        el.style.transform = `perspective(1100px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    };

    const onLeave = () => {
        if (ref.current) {
            ref.current.style.transform = '';
        }
    };

    return (
        <div
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            className="transition-transform duration-200 ease-out will-change-transform"
        >
            {children}
        </div>
    );
}

/** Cycles through the kinds of store TindaFlow is for. */
function RotatingWord() {
    const reduced = useReducedMotion();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (reduced) {
            return;
        }

        const id = setInterval(
            () => setIndex((i) => (i + 1) % rotatingWords.length),
            2400,
        );

        return () => clearInterval(id);
    }, [reduced]);

    return (
        <span
            key={index}
            className="block animate-word-in text-primary motion-reduce:animate-none"
        >
            {rotatingWords[index]}
        </span>
    );
}

export default function Welcome() {
    const { auth, name } = usePage().props;
    const [yearly, setYearly] = useState(false);
    const [stats, setStats] = useState({ sales: 0, items: 0, revenue: 0 });

    const startHref = auth.user ? dashboard() : register();
    const hasTestimonials = testimonials.length > 0;

    const handleSale = (sale: Sale) =>
        setStats((s) => ({
            sales: s.sales + 1,
            items: s.items + sale.items,
            revenue: s.revenue + sale.total,
        }));

    const floating = [
        { icon: Store, pos: '-top-5 -left-8', delay: '0s' },
        { icon: Package, pos: 'top-1/3 -right-9', delay: '1s' },
        { icon: Banknote, pos: '-bottom-6 left-10', delay: '2s' },
        { icon: BarChart3, pos: '-top-7 right-16', delay: '0.5s' },
    ];

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-background text-foreground">
                {/* Nav */}
                <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-3.5 lg:px-8">
                        <Link
                            href="/"
                            className={cn(
                                'flex items-center gap-2.5 text-xl font-bold',
                                focusRing,
                            )}
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
                            <a href="#demo" className="hover:text-primary">
                                Live demo
                            </a>
                            <a href="#pricing" className="hover:text-primary">
                                Pricing
                            </a>
                            {hasTestimonials && (
                                <a
                                    href="#testimonials"
                                    className="hover:text-primary"
                                >
                                    Testimonials
                                </a>
                            )}
                        </nav>
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className={cn(
                                        'inline-flex min-h-11 items-center rounded-[10px] bg-foreground px-[18px] text-[15px] font-semibold text-background',
                                        focusRing,
                                    )}
                                >
                                    Open dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className={cn(
                                            'inline-flex min-h-11 items-center px-3.5 text-[15px] font-medium',
                                            focusRing,
                                        )}
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className={cn(
                                            'inline-flex min-h-11 items-center rounded-[10px] bg-foreground px-[18px] text-[15px] font-semibold text-background',
                                            focusRing,
                                        )}
                                    >
                                        Start free trial
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero */}
                <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pt-14 pb-24 lg:grid-cols-2 lg:px-8">
                    <div className="flex min-w-0 flex-col gap-6">
                        <span className="inline-flex animate-fade-up items-center gap-2 self-start rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-foreground motion-reduce:animate-none">
                            <Sparkles className="size-4" />
                            Built for Filipino store owners
                        </span>
                        <h1 className="animate-fade-up text-5xl leading-[1.04] font-bold tracking-tight [animation-delay:100ms] motion-reduce:animate-none lg:text-6xl">
                            <span className="sr-only">
                                Run your tindahan like a pro
                            </span>
                            <span aria-hidden="true">
                                Run your
                                <RotatingWord />
                                like a pro
                            </span>
                        </h1>
                        <p className="max-w-xl animate-fade-up text-lg leading-relaxed text-muted-foreground [animation-delay:200ms] motion-reduce:animate-none">
                            From sari-sari stores to growing businesses: track
                            inventory, manage orders, and boost sales with the
                            easiest POS system built for Filipino entrepreneurs.
                        </p>
                        <div className="mt-2 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms] motion-reduce:animate-none">
                            <Link
                                href={startHref}
                                className={cn(
                                    'inline-flex min-h-12 animate-pulse-ring items-center rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground motion-reduce:animate-none',
                                    focusRing,
                                )}
                            >
                                {auth.user
                                    ? 'Open dashboard'
                                    : 'Start free trial'}
                            </Link>
                            <a
                                href="#features"
                                className={cn(
                                    'inline-flex min-h-12 items-center gap-2 rounded-xl border border-input bg-card px-6 text-base font-semibold transition-colors hover:border-primary hover:text-primary',
                                    focusRing,
                                )}
                            >
                                See features
                                <ArrowDown className="size-4" />
                            </a>
                        </div>

                        {/* Live stats driven by the demo terminal */}
                        <div className="mt-4 animate-fade-up [animation-delay:400ms] motion-reduce:animate-none">
                            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                                <div>
                                    <div className="text-3xl font-extrabold">
                                        <AnimatedNumber value={stats.sales} />
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Sales rung up
                                    </div>
                                </div>
                                <div className="hidden h-10 w-px bg-border sm:block" />
                                <div>
                                    <div className="text-3xl font-extrabold">
                                        <AnimatedNumber value={stats.items} />
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Items sold
                                    </div>
                                </div>
                                <div className="hidden h-10 w-px bg-border sm:block" />
                                <div>
                                    <div className="text-3xl font-extrabold">
                                        <AnimatedNumber
                                            value={stats.revenue}
                                            format={(n) =>
                                                '₱' +
                                                Math.round(n).toLocaleString(
                                                    'en-PH',
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Revenue tracked
                                    </div>
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-muted-foreground">
                                Try the demo terminal: add items, pick a payment
                                method and tap Charge to watch these numbers
                                move.
                            </p>
                        </div>
                    </div>

                    {/* Interactive terminal */}
                    <div className="relative min-w-0 animate-fade-up [animation-delay:250ms] motion-reduce:animate-none">
                        {floating.map(({ icon: Icon, pos, delay }) => (
                            <span
                                key={pos}
                                aria-hidden="true"
                                style={{ animationDelay: delay }}
                                className={cn(
                                    'absolute z-10 hidden size-12 animate-float items-center justify-center rounded-2xl border bg-card text-primary shadow-lg motion-reduce:animate-none xl:flex',
                                    pos,
                                )}
                            >
                                <Icon className="size-6" />
                            </span>
                        ))}
                        <TiltCard>
                            <PosDemo
                                compact
                                onSale={handleSale}
                                className="shadow-[0_24px_60px_-24px_rgba(15,42,63,0.35)]"
                            />
                        </TiltCard>
                    </div>
                </section>

                {/* Features */}
                <section
                    id="features"
                    className="mx-auto max-w-7xl scroll-mt-20 px-6 pt-8 pb-24 lg:px-8"
                >
                    <Reveal className="mb-12 flex max-w-2xl flex-col gap-3">
                        <span className="text-sm font-semibold text-accent-foreground">
                            Features
                        </span>
                        <h2 className="text-4xl leading-tight font-bold tracking-tight">
                            Everything your tindahan needs
                        </h2>
                        <p className="text-base text-muted-foreground">
                            Powerful tools designed for Filipino store owners.
                            Simple to use, malakas ang features.
                        </p>
                    </Reveal>
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((f, i) => (
                            <Reveal
                                key={f.title}
                                delay={(i % 3) * 100}
                                className="h-full"
                            >
                                <article className="group flex h-full flex-col gap-3 rounded-2xl border bg-card p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:transform-none">
                                    <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none">
                                        <f.icon className="size-6" />
                                    </span>
                                    <h3 className="text-lg font-bold">
                                        {f.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {f.text}
                                    </p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* Live demo */}
                <section id="demo" className="scroll-mt-20 bg-secondary">
                    <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
                        <Reveal className="mx-auto mb-12 flex max-w-xl flex-col items-center gap-3 text-center">
                            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                                Interactive
                            </span>
                            <h2 className="text-4xl leading-tight font-bold tracking-tight">
                                Try the POS, right here, right now
                            </h2>
                            <p className="text-base text-muted-foreground">
                                Click products to add them to the cart. See how
                                fast and simple it is!
                            </p>
                        </Reveal>
                        <Reveal delay={100}>
                            <PosDemo onSale={handleSale} />
                        </Reveal>
                    </div>
                </section>

                {/* Pricing */}
                <section
                    id="pricing"
                    className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 lg:px-8"
                >
                    <Reveal className="mx-auto mb-12 flex max-w-md flex-col items-center gap-3 text-center">
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                            Pricing
                        </span>
                        <h2 className="text-4xl leading-tight font-bold tracking-tight">
                            Simple, transparent pricing
                        </h2>
                        <p className="text-base text-muted-foreground">
                            Start free. Upgrade when you're ready. No hidden
                            fees.
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            <span
                                className={cn(
                                    'text-sm font-medium',
                                    yearly && 'text-muted-foreground',
                                )}
                            >
                                Monthly
                            </span>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={yearly}
                                aria-label="Bill yearly"
                                onClick={() => setYearly((y) => !y)}
                                className={cn(
                                    'relative h-7 w-12 rounded-full transition-colors',
                                    focusRing,
                                    yearly ? 'bg-primary' : 'bg-input',
                                )}
                            >
                                <span
                                    className={cn(
                                        'absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform duration-300 motion-reduce:transition-none',
                                        yearly && 'translate-x-5',
                                    )}
                                />
                            </button>
                            <span
                                className={cn(
                                    'text-sm font-medium',
                                    !yearly && 'text-muted-foreground',
                                )}
                            >
                                Yearly{' '}
                                <span className="text-xs font-bold text-accent-foreground">
                                    Save 20%
                                </span>
                            </span>
                        </div>
                    </Reveal>

                    <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
                        {plans.map((plan, i) => {
                            const price = yearly ? plan.yearly : plan.monthly;

                            return (
                                <Reveal
                                    key={plan.id}
                                    delay={i * 100}
                                    className="h-full"
                                >
                                    <div
                                        className={cn(
                                            'relative flex h-full flex-col rounded-2xl bg-card p-7 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none',
                                            plan.popular
                                                ? 'border-2 border-primary shadow-lg'
                                                : 'border',
                                        )}
                                    >
                                        {plan.popular && (
                                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold whitespace-nowrap text-primary-foreground">
                                                MOST POPULAR
                                            </span>
                                        )}
                                        <div
                                            className={cn(
                                                'mb-1 text-sm font-semibold',
                                                plan.popular
                                                    ? 'text-primary'
                                                    : 'text-muted-foreground',
                                            )}
                                        >
                                            {plan.name}
                                        </div>
                                        <div className="mb-1 flex items-end gap-1">
                                            {price === null ? (
                                                <span className="text-4xl font-extrabold">
                                                    Free
                                                </span>
                                            ) : (
                                                <>
                                                    <span
                                                        key={String(yearly)}
                                                        className="animate-pop text-4xl font-extrabold motion-reduce:animate-none"
                                                    >
                                                        ₱
                                                        {price.toLocaleString(
                                                            'en-PH',
                                                        )}
                                                    </span>
                                                    <span className="mb-1 text-sm text-muted-foreground">
                                                        /month
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <p className="mb-6 text-sm text-muted-foreground">
                                            {plan.blurb}
                                        </p>
                                        <ul className="mb-8 flex flex-1 flex-col gap-3">
                                            {plan.features.map((feat) => (
                                                <li
                                                    key={feat}
                                                    className="flex items-center gap-2 text-sm"
                                                >
                                                    <Check className="size-[18px] shrink-0 text-primary" />
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            href={startHref}
                                            className={cn(
                                                'inline-flex min-h-12 items-center justify-center rounded-xl text-sm font-semibold transition-colors',
                                                focusRing,
                                                plan.popular
                                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                                    : 'bg-secondary hover:bg-accent',
                                            )}
                                        >
                                            {plan.cta}
                                        </Link>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>

                {/* Testimonials (shown only when real ones are added above) */}
                {hasTestimonials && (
                    <section
                        id="testimonials"
                        className="scroll-mt-20 bg-secondary"
                    >
                        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
                            <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
                                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                                    Testimonials
                                </span>
                                <h2 className="text-4xl leading-tight font-bold tracking-tight">
                                    Loved by Filipino store owners
                                </h2>
                            </Reveal>
                            <div className="grid gap-6 md:grid-cols-3">
                                {testimonials.map((t, i) => (
                                    <Reveal
                                        key={t.name}
                                        delay={i * 100}
                                        className="h-full"
                                    >
                                        <figure className="flex h-full flex-col gap-5 rounded-2xl border bg-card p-6 transition-transform duration-300 hover:scale-[1.02] motion-reduce:transform-none">
                                            <blockquote className="text-sm leading-relaxed">
                                                “{t.quote}”
                                            </blockquote>
                                            <figcaption className="mt-auto">
                                                <div className="text-sm font-semibold">
                                                    {t.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {t.role}
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Final CTA */}
                <section
                    id="start"
                    className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
                >
                    <Reveal className="rounded-3xl bg-[#0F2A3F] px-8 py-16 text-center md:px-12">
                        <div className="mx-auto max-w-3xl">
                            <h2 className="mb-4 text-4xl leading-tight font-bold tracking-tight text-white">
                                Ready to level up your tindahan?
                            </h2>
                            <p className="mb-8 text-lg text-[#BFD6E4]">
                                Start your free trial today. No credit card
                                required.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    href={startHref}
                                    className={cn(
                                        'inline-flex min-h-12 items-center rounded-xl bg-[#F2C230] px-9 text-base font-bold text-[#0F2A3F] transition-transform hover:-translate-y-0.5 motion-reduce:transform-none',
                                        focusRing,
                                    )}
                                >
                                    {auth.user
                                        ? 'Open dashboard'
                                        : 'Start free trial'}
                                </Link>
                                <Link
                                    href={SALES_HREF}
                                    className={cn(
                                        'inline-flex min-h-12 items-center rounded-xl border border-[#35566E] bg-white/10 px-9 text-base font-bold text-white transition-colors hover:bg-white/20',
                                        focusRing,
                                    )}
                                >
                                    Talk to sales
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* Footer */}
                <footer className="border-t">
                    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
                        <div className="lg:col-span-2">
                            <div className="mb-4 flex items-center gap-2 text-lg font-bold">
                                <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <ShoppingBag className="size-4" />
                                </span>
                                {name}
                            </div>
                            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                                The modern store management system built for
                                Filipino entrepreneurs.
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-3 text-sm font-semibold">
                                Product
                            </h4>
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <a
                                    href="#features"
                                    className="hover:text-primary"
                                >
                                    Features
                                </a>
                                <a href="#demo" className="hover:text-primary">
                                    Live demo
                                </a>
                                <a
                                    href="#pricing"
                                    className="hover:text-primary"
                                >
                                    Pricing
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="mb-3 text-sm font-semibold">
                                Account
                            </h4>
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="hover:text-primary"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="hover:text-primary"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={register()}
                                            className="hover:text-primary"
                                        >
                                            Sign up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-1.5 border-t px-6 py-6 text-sm text-muted-foreground lg:px-8">
                        © 2026 {name}. Made with
                        <Heart className="size-4 fill-destructive text-destructive" />
                        in the Philippines.
                    </div>
                </footer>
            </div>
        </>
    );
}
