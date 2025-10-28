import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: Boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = true;
  
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = (email: string, password: string) => {
    if (email === "admin@neoloq.com" && password === "12345678") {
      setUser({ email });
      alert("Login realizado com sucesso!");
    } else {
      alert("Credenciais inválidas.");
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
