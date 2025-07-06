#  Fasiclin - Sistema de Manutenção de Equipamentos

Este projeto constitui um Projeto Interdisciplinar, desenvolvido como requisito parcial para o cumprimento das disciplinas integradas ao curso de Análise e Desenvolvimento de Sistemas (ADS). O objetivo é demonstrar a aplicação prática dos conhecimentos adquiridos ao longo da graduação, integrando fundamentos teóricos e habilidades técnicas no desenvolvimento de soluções digitais que atendam a demandas reais do mercado.

A proposta deste trabalho é apresentar o desenvolvimento de um aplicativo móvel funcional, concebido como resposta a desafios enfrentados diariamente em ambientes organizacionais, especialmente na gestão interna de recursos, comunicação entre setores e controle de processos operacionais. Este aplicativo foi idealizado com foco na experiência do usuário, eficiência nos fluxos de solicitação e clareza na organização das funcionalidades.

### O sistema desenvolvido permite que os usuários realizem diversas operações essenciais de maneira simplificada e centralizada. Entre as funcionalidades disponíveis, destacam-se:
•	Fazer Solicitação: interface intuitiva para registrar pedidos de serviço, manutenção, suporte ou qualquer necessidade operacional;
•	Fazer Reserva: módulo destinado a reserva de recursos, como salas, equipamentos ou veículos, com controle de disponibilidade;
•	Manutenção: acompanhamento de ordens de serviço e manutenção de equipamentos ou infraestruturas, com histórico e atualizações de status;
•	Minhas Solicitações: espaço exclusivo para o usuário visualizar, editar ou acompanhar o andamento de suas solicitações anteriores;

Além disso, o projeto envolveu o uso de prototipação com ferramentas como Figma, implementação com linguagens de programação e frameworks como React (Ionic), TypeScript, e banco de dados MySQL, garantindo que a solução 


## Tecnologia Utilizadas
*Ionic + Capacitor:* Utilizado para criar aplicações híbridas com acesso a recursos nativos dos dispositivos;
*React + TypeScript + Vite:* Utilizados para a construção da interface do usuário com tipagem estática e arquitetura baseada em componentes;
*Banco de Dados:* MySQL

## ⚙️ Instalação

###  Backend

1. Acesse a pasta:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env` (já incluído).

4. Inicie o servidor:

```bash
node server.js
```

###  Frontend

1. Acesse a pasta:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o app com o Expo:

```bash
npx expo start
```

 

## 📦 Geração de APK (Expo)

Para gerar um APK de produção:

```bash
eas build --platform android
```

> ⚠️ Se estiver usando HTTP (sem HTTPS), adicione no `app.json`:

```json
"plugins": [
  [
    "expo-build-properties",
    {
      "android": {
        "usesCleartextTraffic": true
      }
    }
  ]
]
```

## 👨‍💻 Autor

Bruno Rodrigues  
Projeto desenvolvido para fins acadêmicos  
Faculdade FASIPE Cuiabá - FASICLIN


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
