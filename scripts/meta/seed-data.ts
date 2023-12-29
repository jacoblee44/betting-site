interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface Site {
  title: string;
  admin_id: number;
  tenant_id?: string;
  default_language: string;
  other_languages?: string[];
}

interface Role {
  name: string;
  guard_name: string;
  display_name: string;
}

interface Permission {
  name: string;
  display_name: string;
  children?: Permission[];
}

interface Seed {
  users: User[];
  sites: Site[];
  roles: Role[];
  permissions: Permission[];
}

export const seed: Seed = {
  users: [
    {
      firstname: 'Admin',
      lastname: 'User',
      email: 'admin@example.com',
      password: 'password',
    },
  ],
  sites: [
    {
      title: 'HORSE24',
      admin_id: 1,
      default_language: 'DE',
      other_languages: ['EN'],
    },
  ],
  roles: [
    {
      name: 'super-admin',
      guard_name: 'web',
      display_name: 'Super Admin',
    },
    {
      name: 'admin',
      guard_name: 'web',
      display_name: 'Admin',
    },
    {
      name: 'site-owner',
      guard_name: 'web',
      display_name: 'Site Owner',
    },
    {
      name: 'site-admin',
      guard_name: 'web',
      display_name: 'Site Admin',
    },
    {
      name: 'breeder',
      guard_name: 'web',
      display_name: 'Breeder',
    },
    {
      name: 'horse-owner',
      guard_name: 'web',
      display_name: 'Horse Owner',
    },
    {
      name: 'horse-agent',
      guard_name: 'web',
      display_name: 'Horse Agent',
    },
    {
      name: 'marketplace-user',
      guard_name: 'web',
      display_name: 'Marketplace User',
    },
    {
      name: 'site-user',
      guard_name: 'web',
      display_name: 'Site User',
    },
  ],
  permissions: [
    {
      name: 'adverts.all',
      display_name: 'Adverts',
      children: [
        {
          name: 'adverts.index',
          display_name: 'List of adverts',
        },
        {
          name: 'adverts.create',
          display_name: 'Create an advert',
        },
        {
          name: 'adverts.edit',
          display_name: 'Update an advert',
        },
        {
          name: 'adverts.destroy',
          display_name: 'Delete an advert',
        },
      ],
    },
    {
      name: 'auctions.all',
      display_name: 'Auctions',
      children: [
        {
          name: 'auctions.index',
          display_name: 'List of auctions',
        },
        {
          name: 'auctions.create',
          display_name: 'Create an auction',
        },
        {
          name: 'auctions.edit',
          display_name: 'Update an auction',
        },
        {
          name: 'auctions.destroy',
          display_name: 'Delete an auction',
        },
      ],
    },
  ],
};
