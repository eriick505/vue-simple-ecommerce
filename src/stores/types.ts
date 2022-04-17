import type { AuthUser } from "@/types";

export interface RootState {
  auth: {
    user?: AuthUser;
    authenticated: boolean;
    loading: boolean;
    error: string;
  };
}
