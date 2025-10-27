# BLOMAQ Frontend

Sistema de gerenciamento frontend da BLOMAQ, desenvolvido com React, TypeScript e Vite.

## 🚀 Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/blomaq/frontend.git
cd frontend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias:
```env
VITE_API_URL=http://sua-api-url
```

## 🏃‍♂️ Rodando o projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:5173`

## 🏗️ Build

Para gerar a versão de produção:

```bash
npm run build
# ou
yarn build
```

## 📚 Estrutura do Projeto

```
src/
  ├── assets/        # Recursos estáticos
  ├── components/    # Componentes reutilizáveis
  ├── context/      # Contextos React
  ├── hooks/        # Hooks customizados
  ├── interfaces/   # Interfaces TypeScript
  ├── pages/        # Páginas da aplicação
  ├── payloads/     # Tipos para requisições/respostas
  ├── routes/       # Configuração de rotas
  ├── services/     # Serviços e integrações
  └── styles/       # Estilos globais
```

## 🔒 Autenticação

O sistema utiliza autenticação baseada em token JWT, gerenciada através do `AuthContext` e `AuthService`. O acesso às rotas protegidas é controlado pelo componente `AppRoutes`.

