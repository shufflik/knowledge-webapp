const isTelegramWebApp = window.Telegram !== undefined;
const tg = isTelegramWebApp ? window.Telegram.WebApp : null;

export const initTelegram = () => {
  if (isTelegramWebApp) {
    tg.ready();
  } else {
    console.log('Telegram WebApp is not defined. Running in local mode.');
  }
};

export const sendDataToBot = (data) => {
  if (isTelegramWebApp) {
    tg.sendData(data);
  } else {
    console.log('Sending data to bot:', data);
  }
};

export const closeTelegram = () => {
  if (isTelegramWebApp) {
    tg.close();
  } else {
    console.log('Closing local mode.');
  }
};

export default tg;