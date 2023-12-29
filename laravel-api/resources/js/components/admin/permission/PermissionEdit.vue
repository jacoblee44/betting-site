<template>
  <div class="mt-5 w-full h-full">
    <div class="w-full mb-7">
      <label for="roles" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Select a role</label
      >
      <select
        v-model="selectedRole"
        id="roles"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option v-for="(role, index) in roles" :value="role.id" :key="'role' + index">
          {{ role.display_name }}
        </option>
      </select>
    </div>
    <Tree
      v-if="permissionData?.length"
      id="my-tree-id"
      :custom-options="myCustomOptions"
      :custom-styles="myCustomStyles"
      :nodes="permissionData"
    ></Tree>
    <div class="flex items-center justify-end mt-4" v-if="permissionData?.length">
      <button
        @click.prevent="emit('save')"
        class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { connectModelValue } from '../../../composables/use-connect-model';
import { Role, Permission } from '../../../interfaces/role-permission';
import Tree from 'vuejs-tree';

const props = defineProps({
  roles: {
    type: Array as PropType<Role[]>,
    required: true,
  },
  role: {
    type: Number as PropType<number | null>,
    default: null,
  },
  permissions: {
    type: Array as PropType<Permission[]>,
    required: true,
  },
});
const emit = defineEmits(['update:role', 'update:permissions', 'save']);

const selectedRole = connectModelValue(props, emit, 'role');
const permissionData = connectModelValue(props, emit, 'permissions');

const myCustomStyles = {
  tree: {
    style: {
      maxHeight: '500px',
      width: '100%',
    },
  },
  selectIcon: {
    class: 'fa fa-folder mx-2',
    style: {
      color: '#007AD5',
    },
    active: {
      class: 'fa fa-folder-open mx-2',
      style: {
        color: '#2ECC71',
      },
    },
  },
  text: {
    class: 'mx-2',
  },
};
const myCustomOptions = {
  events: {
    expanded: {
      state: true,
    },
    selected: {
      state: true,
    },
    checked: {
      state: true,
    },
  },
};
</script>
