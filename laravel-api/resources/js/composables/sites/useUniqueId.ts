import { ref, onMounted } from 'vue';

export default function useUniqueId(prefix = 'id') {
  const id = ref('');

  onMounted(() => {
    id.value = `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  });

  return { id };
}
