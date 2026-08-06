# TaskManager

Interface web para gerenciamento de tarefas, construída com React e Vite e integrada a uma API REST publicada em produção.

O projeto oferece uma experiência direta para organizar atividades, acompanhar o progresso e localizar tarefas pelo título em uma interface dark com efeitos de glassmorphism.

## Aplicação online

Acesse a interface publicada em:

### [Abrir o TaskManager](https://tasks-front-seven.vercel.app)

| Serviço | Endereço |
| --- | --- |
| Front-end na Vercel | [https://tasks-front-seven.vercel.app](https://tasks-front-seven.vercel.app) |
| Tarefas da API no Render | [https://tasks-api-ggyw.onrender.com/tasks](https://tasks-api-ggyw.onrender.com/tasks) |

O endereço do Render pertence à API e retorna JSON. Ele não contém a interface visual; a página da aplicação está hospedada na Vercel.

## Funcionalidades

- Criação de tarefas com título obrigatório e descrição opcional
- Listagem das tarefas cadastradas na API
- Busca por título em tempo real
- Edição de título e descrição
- Alternância entre os estados pendente e concluída
- Exclusão de tarefas
- Indicadores com o total exibido e a quantidade de tarefas concluídas
- Estado vazio quando nenhuma tarefa é encontrada

## Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| React 19 | Componentes, estado e ciclo de vida da interface |
| React DOM 19 | Renderização da aplicação no navegador |
| Vite 8 | Servidor de desenvolvimento e build de produção |
| Lucide React | Ícones da interface |
| CSS | Variáveis, animações, tema dark e glassmorphism |
| ESLint 10 | Análise estática do código JavaScript e JSX |

## Integração com a API

A aplicação está configurada em `src/App.jsx` para consumir a seguinte URL base da API:

```text
https://tasks-api-ggyw.onrender.com
```

As tarefas podem ser consultadas diretamente pela rota [`/tasks`](https://tasks-api-ggyw.onrender.com/tasks). A raiz da API (`/`) não é uma página web e atualmente responde que a rota não foi encontrada.

Não é necessário executar o back-end localmente para usar o front-end com a configuração atual.

As operações realizadas pela interface são:

| Método | Endpoint | Finalidade |
| --- | --- | --- |
| `GET` | `/tasks` | Listar tarefas |
| `GET` | `/tasks?title=termo` | Buscar tarefas por título |
| `POST` | `/tasks` | Criar uma tarefa |
| `PUT` | `/tasks/:id` | Atualizar uma tarefa |
| `PATCH` | `/tasks/:id/complete` | Alternar o estado de conclusão |
| `DELETE` | `/tasks/:id` | Excluir uma tarefa |

O código-fonte do serviço está disponível no repositório [tasks-api](https://github.com/taaehy/tasks-api).

## Estrutura do projeto

```text
tasks-front/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Pré-requisitos

- Node.js `20.19+` ou `22.12+`
- npm

Essas versões atendem ao requisito do Vite 8 usado pelo projeto.

## Execução local para desenvolvimento

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/taaehy/tasks-front.git
cd tasks-front
```

Instale exatamente as versões registradas no arquivo de lock:

```bash
npm ci
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o endereço exibido pelo Vite no terminal. Por padrão, ele usa `http://localhost:5173` quando essa porta está disponível. Esse endereço funciona apenas no computador que está executando o projeto; a versão pública está na [Vercel](https://tasks-front-seven.vercel.app).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite |
| `npm run build` | Gera os arquivos otimizados para produção em `dist/` |
| `npm run preview` | Serve localmente o conteúdo gerado pelo build |
| `npm run lint` | Executa a análise estática com ESLint |

Para validar uma versão de produção localmente:

```bash
npm run build
npm run preview
```

## Deploy

O front-end pode ser publicado em um serviço de hospedagem de aplicações estáticas com a seguinte configuração:

```text
Build command: npm ci && npm run build
Publish directory: dist
```

A API de produção aceita requisições do navegador via CORS e já está definida diretamente na aplicação.

## Observações técnicas

- A busca consulta novamente a API a cada alteração no campo de título.
- Os indicadores refletem a lista retornada pela consulta atual. Durante uma busca, os totais representam apenas os resultados filtrados.
- A configuração atual não utiliza variáveis de ambiente; o endereço da API está definido pela constante `API_URL` em `src/App.jsx`.
- O projeto ainda não possui uma suíte de testes automatizados configurada.
