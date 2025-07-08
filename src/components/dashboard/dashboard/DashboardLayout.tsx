"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
    { label: "Total Order", value: 120, change: "+11%" },
    { label: "Order Selesai", value: 90, change: "+9%" },
    { label: "Order Proses", value: 30, change: "-2%" },
    { label: "Revenue", value: "Rp 25jt", change: "+15%" },
];

const chartData = [
    { month: 'Jan', order: 10 },
    { month: 'Feb', order: 15 },
    { month: 'Mar', order: 20 },
    { month: 'Apr', order: 18 },
    { month: 'Mei', order: 25 },
    { month: 'Jun', order: 12 },
    { month: 'Jul', order: 20 },
    { month: 'Agu', order: 22 },
    { month: 'Sep', order: 17 },
    { month: 'Okt', order: 30 },
    { month: 'Nov', order: 28 },
    { month: 'Des', order: 35 },
];

const target = 100; // Target order bulanan
const achieved = 75; // Order tercapai bulan ini

const recentOrders = [
    { name: "Website Toko Online", price: "Rp 3.500.000", status: "Selesai", date: "2024-06-01" },
    { name: "Company Profile", price: "Rp 2.000.000", status: "Proses", date: "2024-06-03" },
    { name: "Landing Page", price: "Rp 1.200.000", status: "Selesai", date: "2024-06-05" },
    { name: "Web Sekolah", price: "Rp 4.000.000", status: "Proses", date: "2024-06-07" },
    { name: "Web Portfolio", price: "Rp 1.000.000", status: "Selesai", date: "2024-06-10" },
];

export default function DashboardLayout() {
    return (
        <section className="space-y-8">
            {/* Statistik Ringkas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                            <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Grafik Order Bulanan & Target */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Order Bulanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="order" stroke="#6366f1" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Target Bulan Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-2 text-lg font-semibold">{achieved} / {target} Order</div>
                        <Progress value={achieved / target * 100} className="h-4" />
                        <div className="mt-2 text-xs text-muted-foreground">Target {target} order tercapai {Math.round(achieved / target * 100)}%</div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabel Order Terbaru */}
            <Card>
                <CardHeader>
                    <CardTitle>Order Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Order</TableHead>
                                    <TableHead>Harga</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.map((order, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{order.name}</TableCell>
                                        <TableCell>{order.price}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${order.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
                                        </TableCell>
                                        <TableCell>{order.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
