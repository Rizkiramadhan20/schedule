import { Timestamp } from "firebase/firestore";

export interface Link {
    id: string;
    label: string;
    url: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface depositList {
    id: string;
    label: string;
    price: number;
    percent: number;
}

export interface frameworkList {
    name: string;
}

export interface Proyek {
    id: string;
    title: string;
    description: string;
    start_date: Timestamp;
    end_date: Timestamp;
    status: "draft" | "published" | "archived";
    progres: "pending" | "progress" | "revisi" | "selesai";
    category: string;
    thumbnail: string;
    framework: string[];
    nama_user: string;
    user_email: string;
    password_email: string;
    price: number;
    deposit: depositList[];
    link: Link[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}