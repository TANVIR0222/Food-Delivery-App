import { useStorageState } from "@/hook/useStorageState";
import { clear_session, get_token } from "@/utils/token-store";
import { createContext, use, type PropsWithChildren } from "react";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
  console.log("AuthContext", value);

  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  console.log("session", session);

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          // Perform sign-in logic here
          const dummyToken = await get_token({ key: "token" });
          setSession(dummyToken);
        },
        signOut: async () => {
          setSession(null);
          await clear_session();
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
