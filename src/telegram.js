const isTelegramWebApp = window.Telegram !== undefined;
const tg = window.Telegram.WebApp;

export const initTelegram = () => {
  if (isTelegramWebApp) {
    tg.ready();
    tg.expand();
    tg.SettingsButton.show();
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

export const mainButton = (buttonText, isEnabled, callback) => {
  if (buttonText) {
    tg.MainButton.setText(buttonText);
  }

  if (isEnabled) {
    tg.MainButton.color = "#2cab37"
    tg.MainButton.textColor = "#FFFFFF";
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }

  if (callback) {
    tg.MainButton.onClick(callback);
  }
};

export const backButton = (isEnabled, callback) => {
  if (isEnabled) {
    tg.BackButton.show();
  } else {
    tg.BackButton.hide();
  }
  if (callback !== null) {
    tg.BackButton.onClick(callback);
  }
};

export const settingsButton = (callback) => {
  tg.SettingsButton.onClick(callback);
};

// eslint-disable-next-line no-undef
// Telegram.WebApp.onEvent("settingsButtonClicked", function () {
//
// })

export default tg;