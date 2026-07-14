import { Client } from "@/types/client";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState =
  | {
      isLoggedIn: true;
      isOnBoardingComplete: true;
      user: Client.User;
      token: string;
      _hasHydrated: boolean;
    }
  | {
      isLoggedIn: false;
      isOnBoardingComplete: false | true;
      user: undefined;
      token: undefined;
      _hasHydrated: boolean;
    };

type AuthActions = {
  login: (session: Client.AuthSession) => void;
  logout: () => void;
  completeOnboarding: () => void;
  setHasHydrated: (hydrated: boolean) => void;
};

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  isLoggedIn: false,
  isOnBoardingComplete: false,
  user: undefined,
  token: undefined,
  _hasHydrated: false,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      login: (session) =>
        set({
          isLoggedIn: true,
          user: session.user,
          token: session.token,
        }),

      logout: () =>
        set({
          ...initialState,
        }),

      completeOnboarding: () =>
        set({
          isOnBoardingComplete: true,
        }),

      setHasHydrated: (hydrated) =>
        set({
          _hasHydrated: hydrated,
        }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        setItem: setItemAsync,
        getItem: getItemAsync,
        removeItem: deleteItemAsync,
      })),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);

export const getAuthToken = () => useAuthStore.getState().token;

export default useAuthStore;
