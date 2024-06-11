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

export const openMainButton = () => {
  tg.MainButton.color = "#2cab37"
  tg.MainButton.textColor = "#FFFFFF"
  tg.MainButton.setText("Create note")
  if (tg.MainButton.isVisible) {
    tg.MainButton.hide();
  } else {
    tg.MainButton.show();
  }
};

export const openSettingsButton = () => {
  if (tg.SettingsButton.isVisible) {
    tg.SettingsButton.hide();
  } else {
    tg.SettingsButton.show();
  }
};

export const openBackButton = () => {
    tg.BackButton.setText("Notes")
  if (tg.BackButton.isVisible) {
    tg.BackButton.hide();
  } else {
    tg.BackButton.show();
  }
};

// eslint-disable-next-line no-undef
Telegram.WebApp.onEvent("mainButtonClicked", function () {

})

export default tg;