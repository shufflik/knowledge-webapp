const tg = window.Telegram.WebApp;

export const initTelegram = () => {
  tg.ready();
};

export const sendDataToBot = (data) => {
  tg.sendData(data);
};

export const closeTelegram = () => {
  tg.close();
};

export default tg;