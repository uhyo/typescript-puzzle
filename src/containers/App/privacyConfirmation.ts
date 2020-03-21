import { privacyConfirmationKey } from "~/design/localStorageKey";

export const getPrivacyConfirmed = (): boolean => {
  return localStorage.getItem(privacyConfirmationKey) === "yes";
};

export const savePrivacyConfirmed = () => {
  localStorage.setItem(privacyConfirmationKey, "yes");
};
