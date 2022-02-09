/*Подключение компонентов*/

const AdminPanel = () => import('../views/AdminPanel');
const Contacts = () => import('../views/AdminContacts');
const Access = () => import('../views/AdminAccess');
const UserAccess = () => import('../views/UserAccess');

export default [
  {
    path: '/admin-panel',
    name: 'admin-panel',
    component: AdminPanel,
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts,
  },
  {
    path: '/access',
    name: 'access',
    component: Access,
  },
  {
    path: '/user-access',
    name: 'user-access',
    component: UserAccess,
  },
];
