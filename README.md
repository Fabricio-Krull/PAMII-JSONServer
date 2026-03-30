Primeiro, rode "npm i --force" dentro do diretório "./PAMII-JSONServer". Caso necessário, rode "npm audit fix --force".

Após instalar as dependências no passo anterior, primeiro rode "npm run start-server", para iniciar o servidor local.

Então, rode o comando "ssh -p 443 -R0:127.0.0.1:3000 qr@free.pinggy.io" para iniciar um túnel com o Pinggy.io. Este comando irá gerar uma URL no terminal do VSCode, CMD ou Powershell. Selecione e copie a URL (qualquer uma das duas geradas), e coloque dentro das aspas no arquivo localizado em PAMII-JSONServer/src/server/apiJS.ts.

Após ter o servidor rodando corretamente, execute o comando "npm run app:tun", para iniciar o aplicativo. Quando terminar de executar, leia o QR Code usando o aplicativo do Expo para celular, o Expo Go.