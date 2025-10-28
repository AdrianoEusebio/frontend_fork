import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepConnected, setKeepConnected] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex h-screen">
      {/* Lado esquerdo */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-white px-10">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-semibold mb-4">Acesso</h1>
          <p className="text-gray-500 mb-6">Entre com seu e-mail e senha.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              placeholder="ex: email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Mín. 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={keepConnected}
                  onChange={(e) => setKeepConnected(e.target.checked)}
                  className="accent-blue-600"
                />
                <span>Me manter conectado</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <Button text="Entrar" type="submit" />
          </form>

          <p className="text-gray-400 text-xs mt-10">
            © 2025 NeoLoq. Todos os Direitos Reservados
          </p>
        </div>
      </div>

      {/* Lado direito */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-400 to-sky-600 text-white text-5xl font-semibold">
        <span>
          Neo<span className="font-bold text-black">Loq</span>
        </span>
      </div>
    </div>
  );
}
