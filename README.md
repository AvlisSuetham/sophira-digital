# 🌟 Sophira Digital: Sua Agência Online de Landing Pages

Bem-vindo ao repositório central da **Sophira Digital**, uma agência online dedicada à criação de landing pages de alta conversão para empresas e micro-empreendedores.

Este repositório serve como nossa **Base de Operações Digital**, funcionando simultaneamente como:
1.  **Site Institucional/Lead:** Nossa página comercial principal para atrair clientes.
2.  **Demonstrações de Produto:** Exposição de nosso portfólio e exemplos de landing pages.
3.  **Ambiente de Gerenciamento:** Estrutura para gerenciamento interno e mapeamento de rotas/conteúdo.

---

## ✨ Recursos e Funcionalidades

O projeto Sophira Digital oferece uma experiência digital fluida, com foco em:

* **Página Comercial Otimizada:** Apresentação clara de nossos serviços, portfólio e valores da agência.
* **Demonstração de Landing Pages:** Visualização de templates e projetos recentes.
* **Mapeamento de Rotas Dinâmico:** Utilização de arquivos `.json` para gerenciar dinamicamente as rotas e o conteúdo exibido no site.
* **Banco de Dados Simulado:** Uso de arquivos `.json` para simular um banco de dados, armazenando informações como portfólio, depoimentos ou configurações.
* **Estrutura Leve e Rápida:** Construído com tecnologias que garantem um carregamento rápido e uma manutenção simplificada.

---

## 💻 Pilha de Tecnologia (Stack)

O projeto Sophira Digital é construído sobre uma pilha de tecnologia moderna, ideal para agências que buscam agilidade e eficiência na entrega de landing pages e demonstrações.

| Tecnologia | Função Principal |
| :--- | :--- |
| **Node.js** | Ambiente de *runtime* do lado do servidor para execução do código JavaScript. |
| **Express** | *Framework* web minimalista e flexível para gerenciar rotas e requisições HTTP. |
| **EJS (Embedded JavaScript)** | Motor de template para renderização dinâmica de HTML no lado do servidor. |
| **JSON** | Utilizado para *mockar* dados (BD simulado) e para o mapeamento dinâmico das rotas da aplicação. |



---

## 🚀 Como Executar o Projeto Localmente

Para clonar e executar o projeto em seu ambiente local para desenvolvimento ou demonstração, siga os passos abaixo.

### Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** (incluso no Node.js) instalados em sua máquina.

1. Clonar o Repositório

2. Instalar Dependências
No diretório do projeto, execute o comando para instalar as dependências necessárias (Express e outras, se houver):
Utilize o comando **npm install**

3. Configurar e Mapear Dados
Verifique os arquivos .json (ex: data/portfolio.json, config/routes.json) para entender como os dados e as rotas estão sendo mapeados.

Você pode editar esses arquivos para customizar o conteúdo e as demonstrações do site.

4. Iniciar o Servidor
Execute o script de inicialização com **npm start**
5. Acessar a Aplicação
Abra seu navegador e acesse:

http://localhost:3000

📂 Estrutura de Diretórios 
Uma estrutura bem organizada facilita a manutenção do projeto:

sophira-digital/
├── node_modules/         # Dependências do Node
├── public/               # Arquivos estáticos (CSS, JS do cliente, imagens)
│   ├── css/
│   ├── img/
│   └── js/
├── views/                # Templates EJS (estrutura das páginas)
│   ├── layouts/          # Layouts base (header, footer, etc.)
│   ├── includes/         # Componentes EJS reutilizáveis
│   └── pages/            # Views principais
├── data/                 # Arquivos .json de BD simulado
├── config/               # Arquivos .json para mapeamento de rotas/configurações
├── routes/               # Arquivos de rotas do Express (se necessário)
├── server.js             # Ponto de entrada e configuração do Express
├── package.json          # Metadados e dependências do projeto
└── README.md             # Este arquivo

🤝 Contribuição
Interessado em contribuir para o aprimoramento da nossa base de operações?

Faça um fork do projeto.

Crie uma branch para sua funcionalidade (git checkout -b feature/NovaFuncionalidade).

Faça o commit das suas alterações (git commit -m 'feat: Adiciona Nova Funcionalidade').

Faça o push para a branch (git push origin feature/NovaFuncionalidade).

Abra um Pull Request.
