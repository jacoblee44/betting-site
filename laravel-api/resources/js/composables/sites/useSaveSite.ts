import { computed, ComputedRef, Ref, ref } from 'vue';
import { Message } from '../../interfaces/site';

export default function useSaveSite(form: any): {
  submit: () => void;
  message: Ref<Message>;
  loading: Ref<boolean>;
  showAlert: ComputedRef<boolean>;
  initMessage: () => void;
} {
  const initMessage = () => {
    message.value = { message: '', body: '', type: '' };
  };

  const loading: Ref<boolean> = ref(false);

  const message: Ref<Message> = ref({ message: '', body: '', type: '' });

  const showAlert: ComputedRef<boolean> = computed(() => message.value.message !== '');

  const submit = () => {
    loading.value = true;
    form
      .submit()
      .then((response: any): void => {
        message.value = {
          message: 'Site Saved successfully',
          body: '',
          type: 'success',
        };

        form.reset();
      })
      .catch((error: any): void => {
        message.value = {
          message: error.message,
          body: '',
          type: 'danger',
        };
      })
      .finally((): void => {
        loading.value = false;
      });
  };

  return {
    message,
    loading,
    submit,
    showAlert,
    initMessage,
  };
}
