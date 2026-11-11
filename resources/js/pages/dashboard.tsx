import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

// Sample data for the design. Replace with real props from your controller.
const kpis = [
    {
        label: "Today's sales",
        value: '₱44,200.00',
        note: '+12.4% vs yesterday',
    },
    { label: 'Orders', value: '126', note: '+8 vs yesterday' },
    { label: 'Average order', value: '₱350.79', note: 'Same as yesterday' },
];

const hourly = [
    { h: '8a', v: 0.6 },
    { h: '9a', v: 1.1 },
    { h: '10a', v: 1.9 },
    { h: '11a', v: 3.0 },
    { h: '12p', v: 3.8 },
    { h: '1p', v: 3.2 },
    { h: '2p', v: 2.2 },
    { h: '3p', v: 2.7 },
    { h: '4p', v: 3.5 },
    { h: '5p', v: 5.6 },
    { h: '6p', v: 3.9 },
    { h: '7p', v: 2.9 },
    { h: '8p', v: 1.7 },
];

const payments = [
    { label: 'Cash', pct: 46 },
    { label: 'E-wallet', pct: 31 },
    { label: 'Card', pct: 23 },
];

const orders = [
    {
        id: '#10482',
        time: '2:34 PM',
        pay: 'Cash',
        status: 'Paid',
        total: '₱385.00',
    },
    {
        id: '#10481',
        time: '2:29 PM',
        pay: 'E-wallet',
        status: 'Paid',
        total: '₱620.00',
    },
    {
        id: '#10480',
        time: '2:21 PM',
        pay: 'Card',
        status: 'Refunded',
        total: '₱145.00',
    },
    {
        id: '#10479',
        time: '2:12 PM',
        pay: 'Cash',
        status: 'Paid',
        total: '₱275.00',
    },
    {
        id: '#10478',
        time: '2:05 PM',
        pay: 'E-wallet',
        status: 'Pending',
        total: '₱910.00',
    },
];

const topProducts = [
    { name: 'Iced Latte', sold: 38 },
    { name: 'Croissant', sold: 27 },
    { name: 'Americano', sold: 22 },
    { name: 'Banana Bread', sold: 15 },
];

const lowStock = [
    { name: 'Oat milk 1L', left: '3 left' },
    { name: 'Matcha powder', left: '2 left' },
    { name: 'Paper cups 12oz', left: '24 left' },
];

const statusClass: Record<string, string> = {
    Paid: 'bg-accent text-accent-foreground',
    Refunded: 'bg-destructive/15 text-destructive',
    Pending: 'bg-secondary text-muted-foreground',
};

export default function Dashboard() {
    const max = Math.max(...hourly.map((d) => d.v));

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Dashboard
                        </h1>
                        <span className="text-sm text-muted-foreground">
                            Sample figures for the design
                        </span>
                    </div>
                    <Link
                        href="#"
                        className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground"
                    >
                        <Plus className="size-[18px]" />
                        New sale
                    </Link>
                </div>

                {/* KPIs */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {kpis.map((k) => (
                        <Card key={k.label} className="gap-2 p-5">
                            <span className="text-sm font-medium text-muted-foreground">
                                {k.label}
                            </span>
                            <span className="text-3xl font-bold tracking-tight">
                                {k.value}
                            </span>
                            <span className="text-[13px] font-semibold text-accent-foreground">
                                {k.note}
                            </span>
                        </Card>
                    ))}
                    <Card className="gap-2 border-[#F2C230] bg-[#FDF1C4] p-5 text-[#5C4300]">
                        <span className="text-sm font-medium">
                            Low stock items
                        </span>
                        <span className="text-3xl font-bold tracking-tight">
                            7
                        </span>
                        <span className="text-[13px] font-semibold underline">
                            Review inventory
                        </span>
                    </Card>
                </div>

                {/* Chart + payments */}
                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex-row items-baseline justify-between">
                            <CardTitle>Sales by hour</CardTitle>
                            <span className="text-[13px] text-muted-foreground">
                                Peak: 5 PM · ₱5,600
                            </span>
                        </CardHeader>
                        <CardContent>
                            <div
                                className="flex h-52 items-end gap-2"
                                role="img"
                                aria-label="Bar chart of sales by hour from 8 AM to 8 PM, peaking at 5 PM"
                            >
                                {hourly.map((d) => (
                                    <div
                                        key={d.h}
                                        className="flex h-full flex-1 flex-col justify-end gap-1.5"
                                    >
                                        <div
                                            className={
                                                d.v === max
                                                    ? 'rounded-md bg-destructive'
                                                    : 'rounded-md bg-primary/35'
                                            }
                                            style={{
                                                height: `${(d.v / max) * 100}%`,
                                            }}
                                        />
                                        <span className="text-center text-[11px] text-muted-foreground">
                                            {d.h}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment methods</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            {payments.map((p) => (
                                <div
                                    key={p.label}
                                    className="flex flex-col gap-1.5"
                                >
                                    <div className="flex justify-between text-sm">
                                        <span>{p.label}</span>
                                        <span className="font-semibold">
                                            {p.pct}%
                                        </span>
                                    </div>
                                    <div className="h-2.5 rounded-full bg-secondary">
                                        <div
                                            className="h-full rounded-full bg-primary"
                                            style={{ width: `${p.pct}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                            <p className="text-[13px] text-muted-foreground">
                                Share of today's orders by payment type.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Orders + side lists */}
                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Recent orders</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-x-auto">
                            <table className="w-full min-w-[460px] border-collapse text-sm">
                                <thead>
                                    <tr className="text-left text-[13px] text-muted-foreground">
                                        <th className="py-2 pr-2 font-semibold">
                                            Order
                                        </th>
                                        <th className="p-2 font-semibold">
                                            Time
                                        </th>
                                        <th className="p-2 font-semibold">
                                            Payment
                                        </th>
                                        <th className="p-2 font-semibold">
                                            Status
                                        </th>
                                        <th className="py-2 pl-2 text-right font-semibold">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((o) => (
                                        <tr key={o.id} className="border-t">
                                            <td className="py-3 pr-2 font-semibold">
                                                {o.id}
                                            </td>
                                            <td className="p-3">{o.time}</td>
                                            <td className="p-3">{o.pay}</td>
                                            <td className="p-3">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[o.status]}`}
                                                >
                                                    {o.status}
                                                </span>
                                            </td>
                                            <td className="py-3 pl-2 text-right font-semibold">
                                                {o.total}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Top products today</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col">
                                {topProducts.map((p, i) => (
                                    <div
                                        key={p.name}
                                        className={`flex justify-between py-3 text-sm ${i > 0 ? 'border-t' : 'pt-0'}`}
                                    >
                                        <span>{p.name}</span>
                                        <span className="font-semibold">
                                            {p.sold} sold
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Low stock</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col">
                                {lowStock.map((p, i) => (
                                    <div
                                        key={p.name}
                                        className={`flex items-center justify-between py-3 text-sm ${i > 0 ? 'border-t' : 'pt-0'}`}
                                    >
                                        <span>{p.name}</span>
                                        <span className="rounded-full bg-[#FDF1C4] px-2.5 py-1 text-xs font-semibold text-[#5C4300]">
                                            {p.left}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
