const { IgApiClient } = require('instagram-private-api');
const path = require('path');
const fs = require('fs');

function AutoDailyInstaPost() {
  //Captura a data atual para colocar na legenda
  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  var dataAtual = dia + '/' + mes + '/' + ano;

  (async () => {
    // Cria uma nova instância do cliente do Instagram
    const ig = new IgApiClient();

    // Configura o cliente para uso do Instagram na versão web
    ig.state.generateDevice(process.env.IG_USERNAME);

    // Faz login na conta do Instagram
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

    // Carrega a foto a ser postada 
    const photoPath = path.join(__dirname, 'photo.jpeg');

    // Faz o upload da foto para o Instagram
    const publishResult = await ig.publish.photo({
      file: await readFileAsync(photoPath),
      caption:
      `
        📆${dataAtual}
        •
        •
        •
        •
        👤 @danieldpereira01
        •
        •
        •
        •
        #danieldpereira #danieldiastodosdias #danieldayseverydays #selfie #lensa #dev #devpython #python #javascript #js #programmingboy #frc #firstroboticcompetitions #robotic #student #brazilian #brazil #nerdy #geek #marvelfan #spiderman #projetoverus #daily #photo #dailyphoto
      `,
    });

    console.log('Foto postada com sucesso!');
  })();

  // Função auxiliar para ler um arquivo de forma assíncrona
  function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
}

AutoDailyInstaPost();

setInterval(AutoDailyInstaPost, 1000 * 60 * 60 * 24);