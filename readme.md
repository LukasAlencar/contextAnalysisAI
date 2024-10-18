# contextAnalysisAI

Este projeto é uma aplicação simples que utiliza a API Gemini para realizar uma análise de sentimentos com base no contexto fornecido. A análise é feita a partir de um assunto e de um comentário, retornando se o sentimento é positivo, negativo ou neutro.

## Tecnologias Utilizadas

- **React.js**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Google Generative AI API**: API da Google para análise de sentimentos utilizando o modelo `gemini-1.5-flash`.

## Pré-requisitos

Antes de começar, você precisará ter:

1. Node.js instalado.
2. Conta Google Cloud com acesso à API Google Generative AI.
3. Uma chave de API válida para o serviço.

## Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1. Clonar o repositório

```bash
git clone https://github.com/LukasAlencar/contextAnalysisAI
```

```bash
cd seu-repositorio
npm install
# ou
yarn install
```

```bash
npm install @google/generative-ai
# ou
yarn add @google/generative-ai

```

```js
    const Api_Key = "SUA_API_KEY_AQUI";
    const propmt = "Instruções para se fazer análise com base os campos de texto e assunto";

    async function analisar(){
        try {
            const AI = new GoogleGenerativeAI(Api_Key)
            const modelo = AI.getGenerativeModel({model: 'gemini-1.5-flash'})
            const resultado = await modelo.generateContent(prompt);
            const response = resultado.response.candidates[0].content.parts[0].text;
            console.log("Resposta do modelo:", response);
        } catch (error) {
            console.error("Erro ao gerar resposta:", error);
        }
    }
```