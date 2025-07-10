"use client"

import React from 'react'

import Link from 'next/link'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import useManagementProyek from './useManagementProyek'

import ModalForm from './modal/ModalForm';

import ViewModal from './modal/ViewModal';

import DeleteModal from './modal/DeleteModal';

import Image from 'next/image'

import { Proyek } from '@/types/Proyek';

import { FormatIndoDate } from '@/lib/formatDate';


import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@/components/ui/card';

import { EmptyDataSVG } from "@/base/helper/Empety"

// SVG ICONS
const StatusIcon = ({ status }: { status: string }) => (
    status === 'published' ? (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
    ) : status === 'draft' ? (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
    ) : (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
    )
);
const ProgressIcon = ({ progres }: { progres: string }) => (
    progres === 'pending' ? (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
    ) : progres === 'progress' ? (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9" /></svg>
    ) : progres === 'revisi' ? (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>
    ) : (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
    )
);

export default function ProyekLayout() {
    const {
        open, setOpen, loading, form,
        handleInputChange, handleImageChange, addProyek, editProyek,
        categories, frameworks, loadingCategories, loadingFrameworks,
        addLink, updateLink, removeLink,
        addDeposit, updateDeposit, removeDeposit,
        proyeks, // gunakan semua data, bukan paginatedProyeks
        handleEdit, editOpen, setEditOpen,
        deleteProyek,
        setDeleteId // <-- add this
    } = useManagementProyek();

    // State untuk modal view dan delete
    const [viewOpen, setViewOpen] = React.useState(false);
    const [deleteOpenModal, setDeleteOpenModal] = React.useState(false);
    const [selectedProyek, setSelectedProyek] = React.useState<Proyek | null>(null);

    function getFrameworkName(framework: unknown): string {
        if (typeof framework === 'string') return framework;
        if (
            framework &&
            typeof framework === 'object' &&
            'name' in framework &&
            typeof (framework as { name?: unknown }).name === 'string'
        ) {
            return (framework as { name: string }).name;
        }
        return '-';
    }

    const handleDeleteProyek = async () => {
        await deleteProyek();
        setDeleteOpenModal(false);
        setSelectedProyek(null);
    };

    return (
        <section>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-8 border rounded-2xl border-border bg-card shadow-sm">
                <div className='flex flex-col gap-4'>
                    <h3 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                        Management Proyek
                    </h3>

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Proyek</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {/* Modal Tambah */}
                <ModalForm
                    open={open}
                    setOpen={setOpen}
                    loading={loading}
                    form={form}
                    handleInputChange={handleInputChange}
                    handleImageChange={handleImageChange}
                    addProyek={addProyek}
                    categories={categories}
                    frameworks={frameworks}
                    loadingCategories={loadingCategories}
                    loadingFrameworks={loadingFrameworks}
                    addLink={addLink}
                    updateLink={updateLink}
                    removeLink={removeLink}
                    addDeposit={addDeposit}
                    updateDeposit={updateDeposit}
                    removeDeposit={removeDeposit}
                />
                {/* Modal Edit */}
                {editOpen && (
                    <ModalForm
                        open={editOpen}
                        setOpen={setEditOpen}
                        loading={loading}
                        form={form}
                        handleInputChange={handleInputChange}
                        handleImageChange={handleImageChange}
                        addProyek={editProyek}
                        categories={categories}
                        frameworks={frameworks}
                        loadingCategories={loadingCategories}
                        loadingFrameworks={loadingFrameworks}
                        addLink={addLink}
                        updateLink={updateLink}
                        removeLink={removeLink}
                        addDeposit={addDeposit}
                        updateDeposit={updateDeposit}
                        removeDeposit={removeDeposit}
                    />
                )}
            </div>
            {/* Tampilkan pemberitahuan jika data kosong */}
            {proyeks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <EmptyDataSVG />
                    <p className="text-lg text-muted-foreground">Belum ada data proyek yang tersedia.</p>
                </div>
            ) : (
                <div className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {proyeks.map((proyek) => (
                            <Card key={proyek.id} className="relative p-0 bg-gradient-to-br from-card via-background to-muted rounded-3xl border border-border transition-all duration-300 group flex flex-col overflow-hidden">
                                <CardHeader className="p-0 relative">
                                    <div className="relative w-full aspect-[4/3] bg-muted flex items-center justify-center overflow-hidden rounded-t-3xl border-b border-border">
                                        {/* Badge Status */}
                                        <span className={`absolute bottom-14 left-2 px-3 py-1.5 inline-flex items-center text-xs leading-5 font-semibold rounded-full z-10 transition-colors duration-200 gap-1 shadow ${proyek.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : proyek.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-muted text-muted-foreground'}`} title={`Status: ${proyek.status}`}>
                                            <StatusIcon status={proyek.status} />
                                            {proyek.status.charAt(0).toUpperCase() + proyek.status.slice(1)}
                                        </span>
                                        {/* Badge Progres */}
                                        <span className={`absolute bottom-14 l  eft-22 px-3 py-1.5 inline-flex items-center text-xs leading-5 font-semibold rounded-full z-10 transition-colors duration-200 gap-1 shadow ${proyek.progres === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : proyek.progres === 'progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : proyek.progres === 'revisi' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`} title={`Progres: ${proyek.progres}`}>
                                            <ProgressIcon progres={proyek.progres} />
                                            {proyek.progres.charAt(0).toUpperCase() + proyek.progres.slice(1)}
                                        </span>
                                        {proyek.thumbnail ? (
                                            <Image
                                                src={proyek.thumbnail}
                                                alt={proyek.title}
                                                width={400}
                                                height={300}
                                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 z-0"
                                                style={{ aspectRatio: '4/3' }}
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center w-full h-full text-muted-foreground">
                                                {/* SVG ilustrasi default */}
                                                <svg width="64" height="64" fill="none" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#f3f4f6" /><path d="M20 44V28a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v16" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M24 36l8 8 8-8" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                <span className="mt-2 text-xs">No image</span>
                                            </div>
                                        )}
                                        {/* Start and End Dates absolutely positioned at bottom of image */}
                                        <div className="absolute bottom-0 left-0 w-full flex gap-4 justify-between items-center py-4 bg-background/80 backdrop-blur-sm z-20 px-2">
                                            <span className="text-xs inline-flex items-center gap-1">
                                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4" /><path d="M8 3v4" /></svg>
                                                Start: {FormatIndoDate(proyek.start_date)}
                                            </span>
                                            <span className="text-xs inline-flex items-center gap-1">
                                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4" /><path d="M8 3v4" /></svg>
                                                End: {FormatIndoDate(proyek.end_date)}
                                            </span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-base font-bold text-foreground px-4 pt-4 tracking-tight">
                                        <span className="inline-flex items-center gap-2">
                                            {proyek.title}
                                        </span>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="flex-1 flex flex-col gap-2 px-4">
                                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                        <span>Category: <span className="font-medium text-foreground">{proyek.category}</span></span>
                                        <span>Framework: <span className="font-medium text-foreground">{Array.isArray(proyek.framework) && proyek.framework.length > 0 ? getFrameworkName(proyek.framework[0]) : '-'}</span></span>
                                    </div>
                                </CardContent>
                                <CardAction className="flex flex-row gap-2 p-4 pt-0 w-full">
                                    <button
                                        type="button"
                                        className="flex-1 min-w-[80px] border border-border rounded px-2 py-1 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => { setSelectedProyek(proyek); setViewOpen(true); }}
                                    >
                                        View
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 min-w-[80px] border border-border rounded px-2 py-1 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => handleEdit(proyek)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 min-w-[80px] border border-destructive text-destructive rounded px-2 py-1 text-sm hover:bg-destructive/10 hover:text-destructive"
                                        onClick={() => { setSelectedProyek(proyek); setDeleteOpenModal(true); setDeleteId(proyek.id); }}
                                    >
                                        Delete
                                    </button>
                                </CardAction>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
            <ViewModal open={viewOpen} onClose={() => setViewOpen(false)} proyek={selectedProyek} />
            <DeleteModal
                open={deleteOpenModal}
                onClose={() => setDeleteOpenModal(false)}
                proyek={selectedProyek}
                onDelete={handleDeleteProyek}
                loading={loading}
            />
        </section>
    )
}
