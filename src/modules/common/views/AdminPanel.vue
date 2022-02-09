<template>
  <div class="admin">
    <AdminHeader />
    <AdminUserCard
      v-for="(user, userKey) in usersData"
      :key="userKey"
      :image="user.image"
      :name="user.name"
      :email="user.email"
      :position="user.position"
      :phone="user.phone"
      @show="showEdit"
    />
    <AdminUserEdit v-if="editIsVisible" @close="closeEdit" />
  </div>
</template>

<script>
  import AdminHeader from '../components/AdminHeader';
  import AdminUserCard from '../components/AdminUserCard';
  import AdminUserEdit from '../components/AdminUserEdit';
  export default {
    components: { AdminHeader, AdminUserCard, AdminUserEdit },
    data() {
      return {
        editIsVisible: false,
        usersData: [
          {
            image: 'test-admin',
            name: 'Иванов Иван Иванович',
            email: 'ivan-vertalet@gmail.com',
            position: 'Администратор',
            phone: '+7 999-545-43-43',
          },
        ],
      };
    },
    methods: {
      showEdit() {
        this.editIsVisible = true;
      },
      closeEdit() {
        this.editIsVisible = false;
      },
    },
  };
</script>
