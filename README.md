# Teste Front-End Econverse

Implementação do desafio Front-End Jr da Econverse: página responsiva com vitrines de produtos, carrosséis e modal de detalhes, desenvolvida a partir do layout fornecido no Figma.

## Tecnologias

- React e TypeScript
- Vite
- Sass (SCSS)
- Vitest, React Testing Library e jsdom
- GitHub Actions para integração contínua

Não são utilizadas bibliotecas de componentes de interface.

## Executar localmente

Pré-requisitos: Node.js **22.19.0** (definido em `.nvmrc`), npm e Git.

```bash
git clone https://github.com/DiogoRocha07/teste-front-end.git
cd teste-front-end
npm ci
npm run dev
```

O endereço local é informado pelo Vite no terminal. Não são necessárias variáveis de ambiente.

## Testar e compilar

```bash
npm run lint           # Análise estática do código
npm run test:run       # Execução única dos testes
npm run test:coverage  # Testes com relatório de cobertura
npm run build         # Verificação de tipos e compilação para dist/
npm run preview       # Prévia local da compilação
```

Para executar os testes em modo de acompanhamento, utilize `npm test`. O relatório HTML de cobertura é gerado em `coverage/index.html`.

Os testes cobrem regras de preço, validação e falhas do serviço de produtos, estados das vitrines, compartilhamento dos dados entre seções, seleção de produtos, interações do modal e formulário da newsletter. As requisições são simuladas nos testes; não dependem da disponibilidade da API externa.

APIs ausentes no jsdom, como os métodos do diálogo nativo e `ResizeObserver`, são simuladas em `src/test/setup.ts`. Os testes não substituem a conferência visual, de responsividade e de comportamento nativo no navegador.

## Organização

```text
src/
├── assets/       # Imagens, ícones e logotipo
├── components/   # Componentes da página e seus estilos SCSS
├── services/     # Consulta e validação dos produtos
├── styles/       # Estilos globais
├── test/         # Configuração compartilhada dos testes
├── types/        # Tipos dos produtos
├── utils/        # Formatação monetária e regras de preço
└── App.tsx       # Composição da página e carregamento dos dados
```

Os arquivos de teste ficam próximos aos componentes, serviços e utilitários que verificam.

## Dados e implementação

Os produtos são obtidos do [JSON oficial da Econverse](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json). O carregamento é centralizado no `App`, e os mesmos dados são compartilhados pelas três vitrines, com estados de carregamento, erro e lista vazia.

A aplicação consulta `/api/produtos`. Em desenvolvimento, o proxy do Vite encaminha a consulta ao endpoint oficial para contornar a restrição de CORS. Na Vercel, o mesmo encaminhamento é definido em `vercel.json`.

Cada vitrine mantém sua própria navegação e seleção de produto. Imagem, nome e botão do card abrem o modal com os dados do item selecionado. O modal utiliza o elemento nativo `dialog`, permite ajustar a quantidade a partir de uma unidade e fecha pelo botão, Escape ou clique externo, restaurando o foco e a rolagem da página.

A estrutura utiliza HTML semântico, hierarquia de títulos, nomes acessíveis nos controles e metadados básicos de SEO.

## Regras demonstrativas e limites

Para preencher os campos comerciais do layout, são aplicadas as seguintes regras de apresentação:

- Preço anterior: valor atual acrescido de 15%, arredondado para centavos.
- Parcelamento: dez vezes sem juros para valores maiores que R$ 3.000.
- Frete grátis: valores maiores que R$ 200.

Os preços do JSON são interpretados em reais. Essas regras são demonstrativas e não representam condições comerciais reais.

Categorias e navegação são estáticas. Busca, ícones de conta/pedidos/favoritos/carrinho, compra no modal, botões de parceiros e detalhes adicionais não possuem integração e estão desabilitados. A newsletter utiliza validação nativa e informa que o envio é demonstrativo; nenhum dado é enviado. Não há autenticação, carrinho ou checkout.

## Integração contínua e hospedagem

[![CI](https://github.com/DiogoRocha07/teste-front-end/actions/workflows/ci.yml/badge.svg)](https://github.com/DiogoRocha07/teste-front-end/actions/workflows/ci.yml)

O GitHub Actions executa instalação pelo lockfile, lint, testes com cobertura e build em pushes e pull requests para `main`. O relatório de cobertura fica disponível como artefato da execução.

A configuração da Vercel utiliza Vite, instala as dependências com `npm ci --include=dev`, executa lint, testes e build e publica o diretório `dist`. O acesso ao JSON oficial depende do encaminhamento de `/api/produtos`; uma hospedagem estática diferente precisa oferecer uma configuração equivalente.

O enunciado original está preservado em [README.desafio.md](./README.desafio.md).
