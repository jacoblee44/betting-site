<template>
  <PermissionEdition
    :roles="roles"
    v-model:role="role"
    v-model:permissions="permissions"
    @save="save"
  />
</template>

<script setup lang="ts">
import { watch, onMounted, ref, Ref } from 'vue';
import { getTreeNodesData } from '../../../helpers/dom';
import { Role } from '../../../interfaces/role-permission';
import axios from 'axios';
import PermissionEdition from './PermissionEdit.vue';

const permissions: Ref<any[]> = ref([]);
const role = ref(null);
const roles: Ref<Role[]> = ref([]);

onMounted(() => {
  getRoles();
});

watch(
  () => role,
  async (val) => {
    val.value ? await getPermissions(val.value) : [];
  },
  { deep: true },
);

const getRoles = () => {
  axios.get('/api/admin/role-list').then(
    ({ data }) => {
      roles.value = data.data;
    },
    (error) => {},
  );
};

const getPermissions = (roleId: number) => {
  axios.get(`/api/admin/role-permissions/${roleId}`).then(
    ({ data }) => {
      permissions.value = data.data;
    },
    (error) => {},
  );
};

const save = async () => {
  const formattedPermissions = getTreeNodesData(permissions.value);
  await assignPermissionsToRole(formattedPermissions).then(() => {
    location.reload();
  });
};

const assignPermissionsToRole = async (body: any): Promise<void> => {
  await axios
    .post(`/api/admin/update-role-permissions`, {
      roleId: role.value,
      permissions: body,
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
