import {
    Banknote,
    Candy,
    Check,
    Citrus,
    Coffee,
    Cookie,
    CreditCard,
    CupSoda,
    Droplet,
    Fish,
    GlassWater,
    Minus,
    Package,
    Plus,
    Popcorn,
    ShoppingCart,
    Smartphone,
    Soup,
    Wheat,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Category = 'grocery' | 'drinks' | 'snacks';
type PaymentMethod = 'cash' | 'gcash' | 'maya';

type Product = {
    id: string;
    name: string;
    price: number;
    category: Category;
    icon: LucideIcon;
    /** Shown in the compact (hero) terminal. */
    hero?: boolean;
};

export type Sale = { total: number; items: number };

// Sample catalogue for the demo only.
const products: Product[] = [
    {
        id: 'rice',
        name: 'Premium Rice 25kg',
        price: 1250,
        category: 'grocery',
        icon: Wheat,
    },
    {
        id: 'oil',
        name: 'Cooking Oil 1L',
        price: 185,
        category: 'grocery',
        icon: Droplet,
    },
    {
        id: 'sardines',
        name: 'Canned Sardines',
        price: 32,
        category: 'grocery',
        icon: Fish,
    },
    {
        id: 'noodles',
        name: 'Instant Noodles',
        price: 15,
        category: 'grocery',
        icon: Soup,
        hero: true,
    },
    {
        id: 'soy',
        name: 'Soy Sauce 350ml',
        price: 48,
        category: 'grocery',
        icon: Package,
    },
    {
        id: 'coffee',
        name: 'Coffee 3-in-1',
        price: 8,
        category: 'drinks',
        icon: Coffee,
        hero: true,
    },
    {
        id: 'water',
        name: 'Bottled Water 500ml',
        price: 15,
        category: 'drinks',
        icon: GlassWater,
        hero: true,
    },
    {
        id: 'coke',
        name: 'Coke Mismo',
        price: 20,
        category: 'drinks',
        icon: CupSoda,
        hero: true,
    },
    {
        id: 'chicharon',
        name: 'Chicharon Pack',
        price: 25,
        category: 'snacks',
        icon: Popcorn,
        hero: true,
    },
    {
        id: 'bawang',
        name: 'Boy Bawang',
        price: 12,
        category: 'snacks',
        icon: Candy,
    },
    {
        id: 'skyflakes',
        name: 'Skyflakes Pack',
        price: 10,
        category: 'snacks',
        icon: Cookie,
        hero: true,
    },
    {
        id: 'juice',
        name: 'Juice Drink 250ml',
        price: 12,
        category: 'drinks',
        icon: Citrus,
    },
];

const filters: { id: 'all' | Category; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'grocery', label: 'Grocery' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'snacks', label: 'Snacks' },
];

const payments: { id: PaymentMethod; label: string; icon: LucideIcon }[] = [
    { id: 'cash', label: 'Cash', icon: Banknote },
    { id: 'gcash', label: 'GCash', icon: Smartphone },
    { id: 'maya', label: 'Maya', icon: CreditCard },
];

export const peso = (n: number) =>
    '₱' +
    n.toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

const focusRing =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

type PosDemoProps = {
    /** Smaller version for the hero: six products, no filters. */
    compact?: boolean;
    onSale?: (sale: Sale) => void;
    className?: string;
};

export default function PosDemo({
    compact = false,
    onSale,
    className,
}: PosDemoProps) {
    const [filter, setFilter] = useState<'all' | Category>('all');
    const [cart, setCart] = useState<Record<string, number>>({});
    const [payment, setPayment] = useState<PaymentMethod>('cash');
    const [done, setDone] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    const visible = compact
        ? products.filter((p) => p.hero)
        : filter === 'all'
          ? products
          : products.filter((p) => p.category === filter);

    const lines = products
        .filter((p) => cart[p.id])
        .map((p) => ({ ...p, qty: cart[p.id] }));
    const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
    const vat = subtotal * 0.12;
    const total = subtotal + vat;

    const add = (id: string) => {
        if (done) {
            return;
        }

        setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
    };

    const remove = (id: string) => {
        if (done) {
            return;
        }

        setCart((c) => {
            const next = { ...c, [id]: (c[id] ?? 0) - 1 };

            if (next[id] <= 0) {
                delete next[id];
            }

            return next;
        });
    };

    const checkout = () => {
        if (!lines.length || done) {
            return;
        }

        onSale?.({ total, items: itemCount });
        setDone(true);
        timer.current = setTimeout(() => {
            setCart({});
            setDone(false);
        }, 1500);
    };

    return (
        <div
            className={cn(
                'rounded-2xl border bg-card shadow-sm',
                compact
                    ? 'flex flex-col gap-4 p-4'
                    : 'grid gap-6 p-5 lg:grid-cols-5',
                className,
            )}
        >
            {/* Products */}
            <div className={cn('min-w-0', !compact && 'lg:col-span-3')}>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold">Products</h3>
                    {!compact && (
                        <div className="flex flex-wrap gap-2">
                            {filters.map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    aria-pressed={filter === f.id}
                                    onClick={() => setFilter(f.id)}
                                    className={cn(
                                        'min-h-9 rounded-lg px-3.5 text-xs font-medium transition-colors',
                                        focusRing,
                                        filter === f.id
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-secondary text-muted-foreground hover:bg-accent',
                                    )}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div
                    className={cn(
                        'grid gap-2.5',
                        compact ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-3',
                    )}
                >
                    {visible.map((p) => {
                        const qty = cart[p.id] ?? 0;

                        return (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => add(p.id)}
                                aria-label={`Add ${p.name}, ${peso(p.price)}`}
                                className={cn(
                                    'relative flex flex-col items-center gap-1.5 rounded-xl border bg-background p-3 text-center transition duration-150 hover:-translate-y-0.5 hover:border-primary hover:shadow-md active:scale-95 motion-reduce:transform-none',
                                    focusRing,
                                    qty > 0 && 'border-primary bg-accent/40',
                                )}
                            >
                                {qty > 0 && (
                                    <span
                                        key={qty}
                                        className="absolute top-1.5 right-1.5 flex size-5 animate-pop items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground motion-reduce:animate-none"
                                    >
                                        {qty}
                                    </span>
                                )}
                                <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                                    <p.icon className="size-5" />
                                </span>
                                <span className="text-xs leading-tight font-semibold">
                                    {p.name}
                                </span>
                                <span className="text-sm font-bold text-primary">
                                    {peso(p.price)}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Cart */}
            <div
                className={cn(
                    'flex min-w-0 flex-col overflow-hidden rounded-xl border bg-background',
                    !compact && 'lg:col-span-2',
                )}
            >
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="flex items-center gap-2 font-bold">
                        <ShoppingCart className="size-4" />
                        Cart
                        {itemCount > 0 && (
                            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                                {itemCount}
                            </span>
                        )}
                    </h3>
                    <button
                        type="button"
                        onClick={() => !done && setCart({})}
                        disabled={!lines.length || done}
                        className={cn(
                            'min-h-8 rounded-lg bg-destructive/10 px-3 text-xs font-semibold text-destructive transition-opacity disabled:opacity-40',
                            focusRing,
                        )}
                    >
                        Clear
                    </button>
                </div>

                <div
                    className={cn(
                        'flex-1 overflow-y-auto px-4',
                        compact ? 'max-h-32 min-h-24' : 'max-h-72 min-h-44',
                    )}
                >
                    {lines.length === 0 ? (
                        <div className="flex h-full min-h-24 flex-col items-center justify-center gap-2 py-4 text-muted-foreground">
                            <ShoppingCart className="size-8 opacity-50" />
                            <p className="text-sm">Tap a product to start!</p>
                        </div>
                    ) : (
                        lines.map((l) => (
                            <div
                                key={l.id}
                                className="flex animate-slide-in items-center gap-3 border-b py-2.5 last:border-b-0 motion-reduce:animate-none"
                            >
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                                    <l.icon className="size-4" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <div className="truncate text-sm font-medium">
                                        {l.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {peso(l.price)} × {l.qty}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => remove(l.id)}
                                        aria-label={`Remove one ${l.name}`}
                                        className={cn(
                                            'flex size-7 items-center justify-center rounded bg-secondary',
                                            focusRing,
                                        )}
                                    >
                                        <Minus className="size-3" />
                                    </button>
                                    <span className="w-5 text-center text-xs font-bold">
                                        {l.qty}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => add(l.id)}
                                        aria-label={`Add one more ${l.name}`}
                                        className={cn(
                                            'flex size-7 items-center justify-center rounded bg-accent text-accent-foreground',
                                            focusRing,
                                        )}
                                    >
                                        <Plus className="size-3" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="flex flex-col gap-3 border-t bg-secondary/60 p-4">
                    <div aria-live="polite" className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Subtotal</span>
                            <span>{peso(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>VAT (12%)</span>
                            <span>{peso(vat)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-extrabold">
                            <span>Total</span>
                            <span className="text-primary">{peso(total)}</span>
                        </div>
                    </div>

                    <div
                        role="radiogroup"
                        aria-label="Payment method"
                        className="grid grid-cols-3 gap-2"
                    >
                        {payments.map((m) => (
                            <button
                                key={m.id}
                                type="button"
                                role="radio"
                                aria-checked={payment === m.id}
                                onClick={() => setPayment(m.id)}
                                className={cn(
                                    'flex min-h-10 items-center justify-center gap-1.5 rounded-lg border-2 text-xs font-semibold transition-colors',
                                    focusRing,
                                    payment === m.id
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : 'border-input bg-card text-muted-foreground hover:border-primary',
                                )}
                            >
                                <m.icon className="size-3.5" />
                                {m.label}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={checkout}
                        disabled={!lines.length && !done}
                        className={cn(
                            'flex min-h-12 items-center justify-center gap-2 rounded-xl text-base font-bold text-white transition-colors disabled:opacity-50',
                            focusRing,
                            done ? 'bg-[#0F2A3F]' : 'bg-destructive',
                        )}
                    >
                        {done ? (
                            <>
                                <Check className="size-5 text-[#F2C230]" />
                                Sale complete
                            </>
                        ) : lines.length ? (
                            `Charge ${peso(total)}`
                        ) : (
                            'Complete sale'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
