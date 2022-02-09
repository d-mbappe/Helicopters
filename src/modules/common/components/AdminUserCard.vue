<template>
  <div class="admin__user-card">
    <img :src="userAvatar" :alt="name" class="admin__avatar" />
    <div class="admin__text">
      <h2 class="title title_h2 admin__name">{{ name }}</h2>
      <p class="admin__text-field">
        Email: <span>{{ email }}</span>
      </p>
      <p class="admin__text-field">
        Должность: <span>{{ position }}</span>
      </p>
      <p class="admin__text-field">
        Телефон: <span>{{ phone }}</span>
      </p>
      <button class="admin__change-data" @click="$emit('show')">
        Изменить данные
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      image: {
        type: String,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      position: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    data() {
      return {};
    },
    computed: {
      userAvatar() {
        return require(`@/assets/img/${this.image}.png`);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .admin {
    &__user {
      &-card {
        width: 544px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        background: #ffffff;
        box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
        border-radius: 8px;
        padding: 26px 30px;
      }
    }
    &__avatar {
      width: 120px;
      height: 120px;
      border-radius: 100%;
      margin-right: 20px;
      object-fit: cover;
    }
    &__name {
      margin-bottom: 14px;
    }
    &__text {
      &-field {
        font-size: 0.8125rem;
        font-weight: 400;
        letter-spacing: 1%;
        color: $table-gray;
        margin: 0;
        margin-bottom: 8px;
        & span {
          color: $table-black;
        }
      }
    }
    &__change-data {
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 1%;
      color: $accent-blue;
      margin-top: 18px;
      border: none;
      outline: transparent;
      cursor: pointer;
    }
  }
</style>
