# 📦 Projeto PAMII - JSON Server + App Expo

Este projeto consiste em um servidor local utilizando JSON Server e um aplicativo mobile desenvolvido com Expo. Para que tudo funcione corretamente, é necessário configurar o ambiente, iniciar o servidor e criar um túnel externo para acesso via dispositivo móvel.

---

## 🚀 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

* Node.js (versão recomendada LTS)
* npm ou yarn
* Expo Go no celular
* Git

---

## 📥 Clonando o projeto

```bash
git clone https://github.com/Fabricio-Krull/PAMII-JSONServer
cd PAMII-JSONServer
```

---

## 📦 Instalação das dependências

Dentro da pasta do projeto, execute:

```bash
npm install --force
```

Caso ocorram vulnerabilidades ou erros:

```bash
npm audit fix --force
```

---

## 🖥️ Iniciando o servidor local

Execute o comando abaixo para iniciar o JSON Server:

```bash
npm run start-server
```

O servidor será iniciado localmente (geralmente na porta 3000).

---

## 🌐 Criando um túnel com Pinggy

Para permitir o acesso externo (necessário para o app mobile), execute:

```bash
npm run pinggy
```

Após rodar o comando:

* Uma URL pública será gerada no terminal
* Copie **qualquer uma das URLs exibidas**

---

## 🔧 Configurando a URL no projeto

Abra o arquivo:

```
PAMII-JSONServer/src/server/apiJS.ts
```

Substitua a URL dentro das aspas pela URL gerada pelo Pinggy:

```ts
const urlBase = "https://sua-url-aqui.pinggy.io";
```

---

## 📱 Executando o aplicativo

Agora inicie o app com:

```bash
npm run app:tun
```

---

## 📲 Rodando no celular

1. Abra o aplicativo **Expo Go** no seu celular
2. Escaneie o QR Code exibido no terminal
3. Aguarde o carregamento do app

---

Vídeo demonstrativo: https://youtu.be/mfoFm0cEVbA?si=UthViUEliSvCqC1k

## ⚠️ Observações importantes

* O servidor (`start-server`) deve estar rodando antes de iniciar o app
* O túnel do Pinggy precisa estar ativo durante o uso do app
* Sempre que reiniciar o túnel, será necessário atualizar a URL no `apiJS.ts`

---

## 🛠️ Possíveis problemas

### ❌ Erro ao instalar dependências

* Tente rodar novamente com:

```bash
npm install --force
```

### ❌ Vulnerabilidades no projeto

```bash
npm audit fix --force
```

### ❌ App não conecta ao servidor

Verifique se:

* O servidor está rodando
* O túnel está ativo
* A URL foi atualizada corretamente

---

## 📄 Licença

Este projeto é apenas para fins educacionais.
