import { useLanguageStore } from '~/stores/language';

// useLanguage function
export function useLanguage() {
  const store = useLanguageStore();

  // On the server, get the language from the header
  if (process.server) {
    const initialLanguage = useLanguageFromHeader();
    console.log('server language', initialLanguage);
    store.setLanguage(initialLanguage);
  }

  // On the client, get the language from the browser
  onMounted(() => {
    const browserLanguage = window.navigator.language.split('-')[0];
    console.log('client language', browserLanguage);
    store.setLanguage(browserLanguage || 'en');
  });

  return {
    // Expose the language reactive state
    language: computed(() => store.language),

    // Expose the action to set the language
    setLanguage: store.setLanguage,
  };
}

function useLanguageFromHeader() {
  const headers = useRequestHeaders();

  // Get 'Accept-Language' header
  const langHeader = headers['accept-language'] || null;

  // Check if the header exists
  const language = langHeader ? langHeader.split(',')[0] : 'en';

  return language;
}
