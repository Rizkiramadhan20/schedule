"use client"

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import Link from 'next/link';
import { useAuth } from '@/utils/context/AuthContext';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError('Password dan konfirmasi password tidak sama.');
            return;
        }
        setLoading(true);
        try {
            await signUp(email, password, name);
            // Setelah signUp, redirect akan dihandle oleh context
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Gagal mendaftar.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-[var(--background)]">
            <div className="w-full container card flex flex-col md:flex-row overflow-hidden">
                {/* Left: Form */}
                <div className="md:w-1/2 w-full flex flex-col justify-center p-8 md:p-12">
                    <div className="mb-8 flex items-center gap-2">
                        <span className="font-bold text-xl text-[var(--primary)]">Sellora</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-[var(--foreground)]">Create an Account</h2>
                    <p className="mb-6">Join now to streamline your experience from day one.</p>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="text-red-500 text-sm mb-2">{error}</div>
                        )}
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="name" className="text-[var(--foreground)]">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Roger Gerard"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                required
                                className="bg-[var(--background)] text-[var(--foreground)]"
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="email" className="text-[var(--foreground)]">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="sellora@company.com"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                required
                                className="bg-[var(--background)] text-[var(--foreground)]"
                            />
                        </div>
                        <Label htmlFor="password" className="text-[var(--foreground)]">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                required
                                className="bg-[var(--background)] text-[var(--foreground)] pr-12 focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer bg-transparent"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.807 6.035 6.75 9.75 6.75 1.772 0 3.543-.457 5.02-1.223M21.75 12c-.511-.955-1.24-2.073-2.25-3.223m-3.5-2.527A6.75 6.75 0 0 0 12 6.75c-3.715 0-7.714 2.943-9.75 6.75a10.477 10.477 0 0 0 1.73 3.777m3.5 2.527A6.75 6.75 0 0 0 12 17.25c3.715 0 7.714-2.943 9.75-6.75a10.477 10.477 0 0 0-1.73-3.777" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12S5.25 6.75 12 6.75 21.75 12 21.75 12 18.75 17.25 12 17.25 2.25 12 2.25 12Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <Label htmlFor="confirmPassword" className="text-[var(--foreground)]">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                required
                                className="bg-[var(--background)] text-[var(--foreground)] pr-12 focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer bg-transparent"
                                onClick={() => setShowConfirmPassword((v) => !v)}
                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                            >
                                {showConfirmPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.807 6.035 6.75 9.75 6.75 1.772 0 3.543-.457 5.02-1.223M21.75 12c-.511-.955-1.24-2.073-2.25-3.223m-3.5-2.527A6.75 6.75 0 0 0 12 6.75c-3.715 0-7.714 2.943-9.75 6.75a10.477 10.477 0 0 0 1.73 3.777m3.5 2.527A6.75 6.75 0 0 0 12 17.25c3.715 0 7.714-2.943 9.75-6.75a10.477 10.477 0 0 0-1.73-3.777" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12S5.25 6.75 12 6.75 21.75 12 21.75 12 18.75 17.25 12 17.25 2.25 12 2.25 12Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <Button type="submit" disabled={loading} className="w-full bg-[var(--primary)] mb-4 hover:bg-[var(--primary)]/90">
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </form>

                    <p className="text-center text-sm">
                        Already have an account?{' '}
                        <Link href="/signin" className="text-[var(--primary)] hover:underline">Sign In</Link>
                    </p>
                    <div className="mt-8 text-xs flex justify-between">
                        <span>Copyright © 2023 Sellora Enterprises LTD.</span>
                        <Link href="#" className="hover:underline text-[var(--primary)]">Privacy Policy</Link>
                    </div>
                </div>
                {/* Right: Illustration/Info */}
                <div className="hidden md:flex md:w-1/2 bg-[var(--primary)] items-center justify-center p-8 relative overflow-hidden">
                    {/* Background palette geometric shapes */}
                    <div className="absolute inset-0 z-0">
                        <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <circle cx="320" cy="80" r="80" fill="var(--accent)" fillOpacity="0.12" />
                            <rect x="-40" y="220" width="200" height="120" rx="60" fill="var(--secondary)" fillOpacity="0.10" />
                            <circle cx="100" cy="60" r="40" fill="var(--info)" fillOpacity="0.10" />
                            <rect x="220" y="300" width="120" height="60" rx="30" fill="var(--warning)" fillOpacity="0.10" />
                        </svg>
                    </div>
                    <div className=" max-w-xs mx-auto text-center z-10">
                        <h3 className="text-xl font-bold mb-4 text-white">Effortlessly manage your team and operations.</h3>
                        <p className="mb-8 text-sm text-white">Log in to access your CRM dashboard and manage your team.</p>
                        <div className="rounded-xl overflow-hidden shadow-lg bg-white/10 p-4">
                            {/* Dummy dashboard illustration */}
                            <div className="bg-white rounded-lg p-4 text-[var(--foreground)] text-xs">
                                <div className="flex gap-2 mb-2">
                                    <div className="w-1/2">
                                        <div className="font-bold text-lg">$18,274</div>
                                        <div>Revenue</div>
                                    </div>
                                    <div className="w-1/2">
                                        <div className="font-bold text-lg">98.4%</div>
                                        <div>Growth</div>
                                    </div>
                                </div>
                                <div className="h-16 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] rounded mb-2" />
                                <div className="flex justify-between">
                                    <span>Team</span>
                                    <span>Operations</span>
                                    <span>Sales</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
