const isTelegramWebApp = window.Telegram !== undefined;
const tg = window.Telegram.WebApp;

export const initTelegram = () => {
  if (isTelegramWebApp) {
    tg.ready();
    tg.expand();
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

export const vibrate = (pattern) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  } else {
    console.log('Vibration API is not supported in this browser.');
  }
};

export default tg;