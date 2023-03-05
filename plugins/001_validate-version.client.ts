export default defineNuxtPlugin((nuxtApp) => {
  // Compare versions and clear localStorage if we have updated version of application
  if (nuxtApp.$app_current_version.value !== nuxtApp.$app_version) {
    nuxtApp.$app_current_version.value = nuxtApp.$app_version;
    localStorage.clear();
    setTimeout(() => location.reload(), 100);
  }
});
