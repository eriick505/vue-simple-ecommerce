import type { ActionContext } from "vuex";
import type { RootState } from "@/stores/types";
import type { Mutations } from "./mutation-types";
import type { AuthLoginRequest, AuthRegisterRequest } from "@/types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<RootState["auth"], RootState>, "commit">;

export interface Actions {
  authLogin(
    args: AugmentedActionContext,
    payload: AuthLoginRequest
  ): Promise<void>;
  authGetUserInfo(args: AugmentedActionContext): Promise<boolean>;
  authAutoLogin(args: AugmentedActionContext): Promise<void>;
  authRegisterUser(
    args: AugmentedActionContext,
    payload: AuthRegisterRequest
  ): Promise<void>;
  logout(args: AugmentedActionContext): void;
}
