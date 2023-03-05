import packageJSON from "../package.json";

export default defineNuxtPlugin(() => {
  const version = packageJSON.version;
  const currentVersion = useCookie("currentVersion", {
    default: () => version,
    watch: "shallow",
    maxAge: 2592000, // Reset local storage data every 30 days
  });

  // Compare versions and clear localStorage if we have updated version of application
  if (currentVersion.value !== version) {
    currentVersion.value = version;
    localStorage.clear();
    setTimeout(() => location.reload(), 100);
  }
});
