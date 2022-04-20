import type { RootState } from "@/stores/types";
import type { AuthUser } from "@/types";

export enum AuthMutationTypes {
  LOADING = "LOADING",
  ERROR = "ERROR",
  AUTHENTICATED = "AUTHENTICATED",
  USER = "USER",
  RESET = "RESET",
}

export type Mutations<S = RootState["auth"]> = {
  [AuthMutationTypes.LOADING](state: S, payload: boolean): void;
  [AuthMutationTypes.ERROR](state: S, payload: string): void;
  [AuthMutationTypes.AUTHENTICATED](state: S, payload: boolean): void;
  [AuthMutationTypes.USER](state: S, payload: AuthUser): void;
  [AuthMutationTypes.RESET](state: S): void;
};
