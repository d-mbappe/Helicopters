<template>
  <modal-layout @close="close">
    <div class="add-responsible">
      <div class="add-responsible__title">
        Назначить ответственного сотрудника
      </div>
      <div class="add-responsible__text">Выберите сотрудника</div>

      <div class="add-responsible__form">
        <Select
          v-if="specialistsList"
          v-model="form.specialist"
          title="name"
          class="inpt__input--default"
          label="Имя сотрудника"
          :options="specialistsList"
          id="specialist"
        ></Select>
      </div>

      <div class="add-responsible__btns">
        <v-btn
          @click="close"
          label="Отменить"
          class="btn--cancel btn--normal add-responsible__btn"
        />
        <v-btn
          @click="submit()"
          label="Назначить"
          class="btn--primary btn--normal add-responsible__btn"
        />
      </div>
    </div>
  </modal-layout>
</template>

<script>
import ModalLayout from "@/components/common/ModalLayout";
import { mapGetters, mapActions } from "vuex";
import Select from "@/components/ui/Select";

export default {
  name: "AddResponsible",
  components: {
    ModalLayout,
    Select,
  },
  data: () => ({
    form: {
      specialist: "",
    },
  }),
  props: {
    workIds: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters("contracts", {
      specialistsList: "specialistsList",
    }),
    contractId() {
      return Number(this.$route.params.id);
    },
  },
  methods: {
    async submit() {
      await this.updateSpecialist({
        supplies: this.workIds,
        specialist: this.form.specialist.id,
        contractId: this.contractId,
      });
      this.$emit("close-and-update");
    },
    close() {
      this.$emit("close");
    },
    ...mapActions("contracts", {
      getSpecialistForm: "getSpecialistForm",
      updateSpecialist: "updateSpecialist",
    }),
  },
  mounted() {
    this.getSpecialistForm({ id: this.contractId });
  }
};
</script>

<style lang="scss" scoped>
.add-responsible {
  width: 576px;
  padding: 29px 20px 20px;
  background: $white;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-align: center;

  &__title {
    font-size: 20px;
    line-height: 23px;
    color: $table-black;
    margin-bottom: 6px;
  }

  &__text {
    font-size: 13px;
    line-height: 15px;
    color: $table-gray;
  }

  &__form {
    width: 100%;
    max-width: 332px;
    margin: 29px auto 0;
    text-align: left;
  }

  &__btns {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px -6px 0;
  }

  &__btn {
    margin: 0px 6px;
    width: 160px;
  }
}
</style>
