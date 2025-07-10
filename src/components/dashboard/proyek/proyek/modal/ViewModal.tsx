import React from 'react'
import Image from 'next/image';
import { Proyek } from '@/types/Proyek';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface ViewModalProps {
    open: boolean;
    onClose: () => void;
    proyek: Proyek | null;
}

export default function ViewModal({ open, onClose, proyek }: ViewModalProps) {
    if (!proyek) return null;

    return (
        <Dialog open={open} onOpenChange={(val) => { if (!val) onClose(); }}>
            <DialogContent showCloseButton={false} className="sm:max-w-6xl max-h-[95vh] overflow-hidden flex flex-col p-0 bg-transparent border-0 shadow-none">
                {/* Visually hidden DialogTitle for accessibility */}
                <DialogTitle className="sr-only">Detail Proyek</DialogTitle>
                {/* Hero Image Section */}
                <div className="relative h-40 xs:h-52 sm:h-64 md:h-80 w-full group flex-shrink-0">
                    <Image
                        src={proyek.thumbnail || '/placeholder.png'}
                        alt={proyek.title || 'Project'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-xl"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent rounded-t-xl">
                        <div className="p-4 sm:p-8 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <div className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md transition-all duration-300
                                        ${proyek.status === 'published'
                                            ? 'bg-blue-100/80 text-blue-700 hover:bg-blue-200/80'
                                            : proyek.status === 'draft'
                                                ? 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80'
                                                : 'bg-red-100/80 text-red-700 hover:bg-red-200/80'}
                                    `}>
                                        <span className={`w-2 h-2 rounded-full mr-2
                                            ${proyek.status === 'published'
                                                ? 'bg-blue-500'
                                                : proyek.status === 'draft'
                                                    ? 'bg-gray-500'
                                                    : 'bg-red-500'}
                                        `}></span>
                                        {proyek.status || '-'}
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="btn btn-circle btn-sm bg-white/10 backdrop-blur-md border-0 hover:bg-white/20 text-white"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="text-white">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{proyek.title}</h2>
                                <p className="text-white/80 line-clamp-2 text-sm sm:text-base">{proyek.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content - Scrollable */}
                <div className="p-4 sm:p-8 space-y-6 sm:space-y-10 overflow-y-auto flex-grow bg-white dark:bg-zinc-900 rounded-b-xl">
                    {/* Stats Cards */}
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 sm:p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-amber-500/10 rounded-lg">
                                <span className="h-5 w-5 text-amber-600">⏳</span>
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-amber-600">Progres</span>
                        </div>
                        {/* Timeline Horizontal */}
                        <div className="flex flex-wrap items-center justify-between w-full mt-4 gap-2">
                            {(['pending', 'progress', 'revisi', 'selesai'] as const).map((step, idx, arr) => {
                                const stepLabels: Record<'pending' | 'progress' | 'revisi' | 'selesai', string> = { pending: 'Pending', progress: 'Progress', revisi: 'Revisi', selesai: 'Selesai' };
                                const stepColors: Record<'pending' | 'progress' | 'revisi' | 'selesai', string> = {
                                    pending: 'gray',
                                    progress: 'blue',
                                    revisi: 'amber',
                                    selesai: 'green',
                                };
                                const currentIdx = arr.indexOf(proyek.progres);
                                const isActive = idx <= currentIdx;
                                const color = stepColors[step];
                                return (
                                    <React.Fragment key={step}>
                                        <div className="flex flex-col items-center min-w-[48px]">
                                            <div
                                                className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 text-xs sm:text-sm font-bold transition-all duration-300
                                                        ${isActive
                                                        ? `bg-${color}-500 border-${color}-500 text-white`
                                                        : `bg-gray-200 border-gray-300 text-gray-400`}
                                                    `}
                                            >
                                                {isActive ? <span>✓</span> : idx + 1}
                                            </div>
                                            <span className={`mt-2 text-[10px] sm:text-xs font-medium ${isActive ? `text-${color}-700` : 'text-gray-400'}`}>{stepLabels[step]}</span>
                                        </div>
                                        {idx < arr.length - 1 && (
                                            <div className={`flex-1 h-1 mx-1 sm:mx-2 transition-all duration-300 ${idx < currentIdx ? `bg-${stepColors[arr[idx]]}-500` : 'bg-gray-200'}`}></div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 sm:p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-green-500/10 rounded-lg">
                                    <span className="h-5 w-5 text-green-600">💰</span>
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-green-600">Harga</span>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Rp{proyek.price}</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 sm:p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <span className="h-5 w-5 text-purple-600">🏷️</span>
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-purple-600">Kategori</span>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{proyek.category}</p>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-8">
                            {/* Project Details */}
                            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                                    <span className="h-5 w-5 text-blue-600">📄</span>
                                    Detail Proyek
                                </h3>
                                <div className="space-y-2 sm:space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500 dark:text-gray-300 text-xs sm:text-base">Kategori:</span>
                                        <span className="px-3 sm:px-4 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-xs sm:text-sm font-medium">
                                            {proyek.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500 dark:text-gray-300 text-xs sm:text-base">Framework:</span>
                                        <span className="px-3 sm:px-4 py-1 bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full text-xs sm:text-sm font-medium">
                                            {Array.isArray(proyek.framework) && proyek.framework.length > 0 ? (
                                                proyek.framework.map((fw, i) => {
                                                    if (typeof fw === 'string') return fw + (i < proyek.framework.length - 1 ? ', ' : '');
                                                    if (fw && typeof fw === 'object' && 'name' in fw && typeof (fw as { name: string }).name === 'string') return (fw as { name: string }).name + (i < proyek.framework.length - 1 ? ', ' : '');
                                                    return String(fw) + (i < proyek.framework.length - 1 ? ', ' : '');
                                                })
                                            ) : '-'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Kolom Baru: Info User & Email & Password Email */}
                            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                                    <span className="h-5 w-5 text-green-600">👤</span>
                                    Info User & Email & Password Email
                                </h3>
                                <div className="space-y-2 sm:space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500 dark:text-gray-300 text-xs sm:text-base">Nama User:</span>
                                        <span className="px-3 sm:px-4 py-1 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-full text-xs sm:text-sm font-medium">
                                            {proyek.nama_user || '-'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500 dark:text-gray-300 text-xs sm:text-base">User Email:</span>
                                        <span className="px-3 sm:px-4 py-1 bg-amber-50 dark:bg-amber-900 text-amber-700 dark:text-amber-200 rounded-full text-xs sm:text-sm font-medium">
                                            {proyek.user_email || '-'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500 dark:text-gray-300 text-xs sm:text-base">Password Email:</span>
                                        <span className="px-3 sm:px-4 py-1 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-full text-xs sm:text-sm font-medium">
                                            {proyek.password_email || '-'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Card Link Terkait */}
                            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                                    <span className="h-5 w-5 text-blue-600">🔗</span>
                                    Link Terkait
                                </h3>
                                {Array.isArray(proyek.link) && proyek.link.length > 0 ? (
                                    <ul className="space-y-2">
                                        {proyek.link.map((l) => (
                                            <li key={l.id} className="bg-zinc-50 dark:bg-zinc-700 rounded-lg p-2 sm:p-3 flex flex-col">
                                                <span className="font-semibold text-blue-700 dark:text-blue-300 text-xs sm:text-base">{l.label}</span>
                                                <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all text-xs sm:text-base">{l.url}</a>
                                                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-300 mt-1">Updated: {l.updatedAt && typeof l.updatedAt.toDate === 'function' ? l.updatedAt.toDate().toLocaleString() : '-'}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className="text-gray-400 text-xs sm:text-sm">Tidak ada link</span>
                                )}
                            </div>

                        </div>

                        {/* Right Column */}
                        <div className="space-y-4 sm:space-y-8 flex-col flex">
                            {/* Timeline */}
                            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                                    <span className="h-5 w-5 text-amber-600">🕒</span>
                                    Timeline
                                </h3>
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                            <span className="h-5 w-5 text-green-600">🟢</span>
                                        </div>
                                        <div>
                                            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Created</p>
                                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">{proyek.createdAt && typeof proyek.createdAt.toDate === 'function' ? proyek.createdAt.toDate().toLocaleString() : '-'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                            <span className="h-5 w-5 text-blue-600">🔄</span>
                                        </div>
                                        <div>
                                            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Last Updated</p>
                                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">{proyek.updatedAt && typeof proyek.updatedAt.toDate === 'function' ? proyek.updatedAt.toDate().toLocaleString() : '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Deposit Timeline */}
                            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                                    <span className="h-5 w-5 text-amber-600">💸</span>
                                    Deposit Timeline
                                </h3>
                                {Array.isArray(proyek.deposit) && proyek.deposit.length > 0 ? (
                                    <ol className="relative border-l-2 border-amber-300 dark:border-amber-700 ml-2 sm:ml-4">
                                        {proyek.deposit.map((d, idx) => (
                                            <li key={d.id || idx} className="mb-6 sm:mb-8 ml-2 sm:ml-4">
                                                <div className="absolute -left-4 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-amber-100 dark:bg-amber-800 rounded-full border-2 border-amber-400 dark:border-amber-600">
                                                    <span className="text-amber-600 dark:text-amber-200 font-bold text-xs sm:text-base">{idx + 1}</span>
                                                </div>
                                                <div className="pl-4">
                                                    <div className="font-semibold text-amber-700 dark:text-amber-300 text-xs sm:text-base">{d.label}</div>
                                                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">Percent: <span className="font-medium text-gray-900 dark:text-white">{d.percent}%</span></div>
                                                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">Price: <span className="font-medium text-green-700 dark:text-green-300">Rp{d.price}</span></div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <span className="text-gray-400 text-xs sm:text-sm">Tidak ada deposit</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
