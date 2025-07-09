import { Timestamp } from "firebase/firestore";

export interface Framework {
  id: string;
  name: string;
  createdAt: Timestamp | null;
}
