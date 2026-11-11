import { Head } from '@inertiajs/react';
import {
    Activity,
    ArrowUpRight,
    Building2,
    Search,
    ShieldCheck,
    Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type User = {
    name: string;
    email: string;
    business: string;
    plan: 'Starter' | 'Pro';
    status: 'Active' | 'Inactive';
    lastActive: string;
    orders: number;
    sales: string;
};

// Mock data for the superadmin preview. Replace this with users and usage
// aggregates from your admin API once it is available.
const users: User[] = [
    {
        name: 'Maria Santos',
        email: 'maria@tindahan.ph',
        business: "Maria's Sari-sari Store",
        plan: 'Pro',
        status: 'Active',
        lastActive: '2 min ago',
        orders: 126,
        sales: '₱44,200',
    },
    {
        name: 'Jomar Reyes',
        email: 'jomar@panaderya.ph',
        business: "Jomar's Bakery",
        plan: 'Pro',
        status: 'Active',
        lastActive: '18 min ago',
        orders: 89,
        sales: '₱28,450',
    },
    {
        name: 'Ana Cruz',
        email: 'ana@cruzmart.ph',
        business: 'Cruz Mini Mart',
        plan: 'Starter',
        status: 'Active',
        lastActive: '1 hr ago',
        orders: 34,
        sales: '₱9,780',
    },
    {
        name: 'Paolo Garcia',
        email: 'paolo@garciastore.ph',
        business: 'Garcia General Store',
        plan: 'Starter',
        status: 'Inactive',
        lastActive: '3 days ago',
        orders: 12,
        sales: '₱3,240',
    },
    {
        name: 'Liza Mendoza',
        email: 'liza@mendozapharmacy.ph',
        business: 'Mendoza Pharmacy',
        plan: 'Pro',
        status: 'Active',
        lastActive: 'Yesterday',
        orders: 211,
        sales: '₱72,600',
    },
    {
        name: 'Carlo Villanueva',
        email: 'carlo@cvstore.ph',
        business: 'CV Neighborhood Store',
        plan: 'Starter',
        status: 'Inactive',
        lastActive: 'Nov 6, 2026',
        orders: 8,
        sales: '₱1,920',
    },
];

const overview = [
    {
        label: 'Total users',
        value: '1,248',
        note: '+86 this month',
        icon: Users,
    },
    {
        label: 'Active today',
        value: '684',
        note: '54.8% of users',
        icon: Activity,
    },
    {
        label: 'Active businesses',
        value: '912',
        note: '+5.1% vs last month',
        icon: Building2,
    },
    {
        label: 'Pro subscribers',
        value: '376',
        note: '30.1% conversion',
        icon: ShieldCheck,
    },
];

export default function Superadmin() {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<'All' | User['status']>('All');

    const filteredUsers = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        return users.filter((user) => {
            const matchesQuery = [user.name, user.email, user.business]
                .join(' ')
                .toLowerCase()
                .includes(normalized);
            return matchesQuery && (status === 'All' || user.status === status);
        });
    }, [query, status]);

    return (
        <>
            <Head title="Superadmin" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                            <ShieldCheck className="size-4" /> Superadmin
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            TindaFlow overview
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Monitor user activity and business usage across
                            TindaFlow.
                        </p>
                    </div>
                    <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
                        Mock dashboard
                    </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {overview.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card key={item.label} className="gap-2 p-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {item.label}
                                    </span>
                                    <Icon className="size-4 text-primary" />
                                </div>
                                <span className="text-3xl font-bold tracking-tight">
                                    {item.value}
                                </span>
                                <span className="text-[13px] font-semibold text-accent-foreground">
                                    {item.note}
                                </span>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex-row items-center justify-between">
                            <div>
                                <CardTitle>Platform activity</CardTitle>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Daily active users for the last 7 days
                                </p>
                            </div>
                            <span className="flex items-center gap-1 text-sm font-semibold text-accent-foreground">
                                <ArrowUpRight className="size-4" /> 12.4%
                            </span>
                        </CardHeader>
                        <CardContent>
                            <div
                                className="flex h-44 items-end gap-3"
                                role="img"
                                aria-label="Daily active users increased over the last 7 days"
                            >
                                {[52, 61, 57, 70, 66, 76, 88].map(
                                    (height, index) => (
                                        <div
                                            key={height}
                                            className="flex h-full flex-1 flex-col justify-end gap-2"
                                        >
                                            <div
                                                className={
                                                    index === 6
                                                        ? 'rounded-md bg-primary'
                                                        : 'rounded-md bg-primary/30'
                                                }
                                                style={{ height: `${height}%` }}
                                            />
                                            <span className="text-center text-xs text-muted-foreground">
                                                {
                                                    [
                                                        'Thu',
                                                        'Fri',
                                                        'Sat',
                                                        'Sun',
                                                        'Mon',
                                                        'Tue',
                                                        'Today',
                                                    ][index]
                                                }
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Plan distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <UsageRow
                                label="Starter"
                                value="872 users"
                                percent={70}
                            />
                            <UsageRow
                                label="Pro"
                                value="376 users"
                                percent={30}
                                highlight
                            />
                            <div className="border-t pt-4 text-sm text-muted-foreground">
                                ₱300,424 estimated monthly recurring revenue
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle>Users & usage</CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                                See who is using TindaFlow and their current
                                activity.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(['All', 'Active', 'Inactive'] as const).map(
                                (item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setStatus(item)}
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${status === item ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                                    >
                                        {item}
                                    </button>
                                ),
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 overflow-x-auto">
                        <div className="relative max-w-sm">
                            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                placeholder="Search users or businesses"
                                className="pl-9"
                            />
                        </div>
                        <table className="w-full min-w-[790px] border-collapse text-sm">
                            <thead>
                                <tr className="border-b text-left text-xs text-muted-foreground">
                                    <th className="px-3 py-3 font-semibold">
                                        User
                                    </th>
                                    <th className="px-3 py-3 font-semibold">
                                        Business
                                    </th>
                                    <th className="px-3 py-3 font-semibold">
                                        Plan
                                    </th>
                                    <th className="px-3 py-3 font-semibold">
                                        Last active
                                    </th>
                                    <th className="px-3 py-3 text-right font-semibold">
                                        Orders
                                    </th>
                                    <th className="px-3 py-3 text-right font-semibold">
                                        Sales
                                    </th>
                                    <th className="px-3 py-3 font-semibold">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user.email}
                                        className="border-b last:border-0 hover:bg-muted/40"
                                    >
                                        <td className="px-3 py-4">
                                            <div className="font-semibold">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-3 py-4">
                                            {user.business}
                                        </td>
                                        <td className="px-3 py-4">
                                            <span
                                                className={
                                                    user.plan === 'Pro'
                                                        ? 'rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary'
                                                        : 'rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold'
                                                }
                                            >
                                                {user.plan}
                                            </span>
                                        </td>
                                        <td className="px-3 py-4 text-muted-foreground">
                                            {user.lastActive}
                                        </td>
                                        <td className="px-3 py-4 text-right font-semibold">
                                            {user.orders}
                                        </td>
                                        <td className="px-3 py-4 text-right font-semibold">
                                            {user.sales}
                                        </td>
                                        <td className="px-3 py-4">
                                            <span
                                                className={
                                                    user.status === 'Active'
                                                        ? 'inline-flex items-center gap-1.5 text-xs font-semibold text-accent-foreground'
                                                        : 'inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground'
                                                }
                                            >
                                                <span
                                                    className={
                                                        user.status === 'Active'
                                                            ? 'size-2 rounded-full bg-accent-foreground'
                                                            : 'size-2 rounded-full bg-muted-foreground'
                                                    }
                                                />
                                                {user.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                No users match your filters.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

function UsageRow({
    label,
    value,
    percent,
    highlight = false,
}: {
    label: string;
    value: string;
    percent: number;
    highlight?: boolean;
}) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span className="font-semibold">{value}</span>
            </div>
            <div className="h-2.5 rounded-full bg-secondary">
                <div
                    className={
                        highlight
                            ? 'h-full rounded-full bg-primary'
                            : 'h-full rounded-full bg-primary/35'
                    }
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}

Superadmin.layout = {
    breadcrumbs: [{ title: 'Superadmin', href: '/superadmin' }],
};
