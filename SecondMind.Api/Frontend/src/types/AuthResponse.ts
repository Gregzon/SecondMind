import type { User } from "./User";

export interface AuthResponse {
    token: string;
    expiresAt: string;
    user: User;
}
