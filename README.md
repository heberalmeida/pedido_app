# Aplicação de Pedidos e Pagamentos

Esta aplicação permite consultar pedidos pendentes, selecionar pedidos para pagamento, e processar pagamentos com diversas formas de pagamento.

## Funcionalidades

1. **Tela de Login:**
   - Permite que o usuário faça login utilizando as credenciais fornecidas.
   - Redireciona para a tela de Pedidos após login bem-sucedido.

2. **Tela de Pedidos:**
   - Consulta pedidos pendentes com suporte a paginação.
   - Opções de filtro por CNPJ do cliente, nome e código - serve side ou não.
   - Seleção de pedidos para pagamento.

3. **Tela de Pagamento:**
   - Exibe informações detalhadas sobre o pedido selecionado.
   - Permite selecionar a forma de pagamento entre Dinheiro, Crédito, Débito, Link e PIX.
   - Coleta informações de pagamento de acordo com a forma selecionada.
   - Inicia o processo de pagamento e exibe o status do pagamento.

## Tecnologias Utilizadas

- React
- TypeScript
- Axios
- Tailwind CSS

## Instalação e Uso

### Pré-requisitos

- Node.js
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/heberalmeida/pedido_app
   cd pedido_app
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   # ou
   yarn start
   ```

   ### Demonstração

Você pode acessar a demonstração da aplicação através do seguinte link:
[https://pedidos.heber.com.br](https://pedidos.heber.com.br)
