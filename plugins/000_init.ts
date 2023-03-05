import packageJSON from "../package.json";

export default defineNuxtPlugin(async (nuxtApp) => {
  const version = packageJSON.version;
  const currentVersion = useCookie("currentVersion", {
    default: () => version,
    watch: "shallow",
    maxAge: 2592000, // Reset local storage data every 30 days
  });
  let host = "";
  // Get host in case of server side request
  if (import.meta.env.SSR) {
    host = nuxtApp?.ssrContext?.event?.req?.headers?.host || "";
  } else {
    host = window.location.host;
  }
  const origin = new URL(`https://${host}`);
  // Extract origin and set data in app context
  nuxtApp.provide("app_origin", origin.origin);
  nuxtApp.provide("app_hostname", origin.hostname);
  nuxtApp.provide("app_version", version);
  nuxtApp.provide("app_current_version", currentVersion);
});
