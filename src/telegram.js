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

export const getUsername = () => {
  return tg.initDataUnsafe?.user?.username
}

export const getUserId = () => {
  return tg.initDataUnsafe?.user?.id
}

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

export const showAlertPopup = (text) => {
  if (isTelegramWebApp) {
    tg.showAlert(text)
  } else {
    console.log("Can't show alert message");
  }
};

export const openLink = (url) => {
  if (isTelegramWebApp && url?.length > 0) {
    if (url.startsWith('https://t.me/')) {
      tg.openTelegramLink(url)
    } else {
      tg.openLink(url)
    }
  }
}

export const mainButton = (buttonText, isEnabled, color, callback) => {
  if (buttonText) {
    tg.MainButton.setText(buttonText);
  }

  if (isEnabled) {
    tg.MainButton.color = color !== null ? color : "#2cab37"
    tg.MainButton.textColor = "#FFFFFF";
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }

  if (callback !== null) {
    tg.MainButton.onClick(callback);
  } else {
    tg.MainButton.onClick(null);
  }
};

export const setMainButtonVisibility = (isEnabled) => {
  console.log(`Set mainButton visibility: ${isEnabled}`)
  if (isEnabled) {
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
}

export const backButton = (isEnabled, callback) => {
  if (isEnabled) {
    tg.BackButton.show();
  } else {
    tg.BackButton.hide();
  }
  if (callback !== null) {
    tg.BackButton.onClick(callback);
  } else {
    tg.BackButton.onClick(null);
  }
};

export const settingsButton = (callback) => {
  tg.SettingsButton.onClick(callback);
};

export default tg;
