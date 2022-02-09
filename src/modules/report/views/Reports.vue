<template>
  <div>
    <ReportStatistics />
    <ReportManage 
      @showCreate="showCreateModal"
      @showShedule="showSheduleModal"
    />
    <CardsGallery 
      :data="reports"
    />
    <CreateReport v-if="isCreate" @close="closeModal"/>
    <SheduleReport v-if="isShedule" @close="closeModal"/>
    <ReportsNotices v-if="isNotices" @close="closeModal"/>
    <CreateReportForm v-if="isForm" @close="closeModal"/>
    <ReportsNotices v-if="isNotices" @close="closeModal"/>
  </div>
</template>

<script>
  import CardsGallery from '@/components/common/CardsGallery'
  import ReportStatistics from '../components/ReportsStatistics';
  import ReportManage from '../components/ReportsManage';
  import CreateReport from '../modals/CreateReport';
  import SheduleReport from '../modals/SheduleReport';
  import ReportsNotices from '../modals/ReportsNotices';
  export default {
    components: {
      CardsGallery,
      ReportStatistics,
      ReportManage,
      CreateReport,
      SheduleReport,
      ReportsNotices,
    },
    name: 'Reports',
    data() {
      return {
        reports: [
          { title: 'Отчёт №1', status: {name: 'от 02.01.2021'}, link: 'report-view'},
          { title: 'Отчёт №2', status: {name: 'от 01.03.2021'}, link: 'report-view'},
          { title: 'Отчёт №3', status: {name: 'от 04.02.2021'}, link: 'report-view'},
          { title: 'Отчёт №4', status: {name: 'от 05.06.2021'}, link: 'report-view'},
          { title: 'Отчёт №5', status: {name: 'от 01.07.2021'}, link: 'report-view'},
          { title: 'Отчёт №6', status: {name: 'от 01.09.2021'}, link: 'report-view'},
          { title: 'Отчёт №7', status: {name: 'от 02.09.2021'}, link: 'report-view'},
          { title: 'Отчёт №8', status: {name: 'от 03.09.2021'}, link: 'report-view'},
        ],
        isCreate: false,
        isShedule: false,
        isNotices: false,
        isForm: false,
        isNotices: false,
      };
    },
    methods: {
      closeModal() {
        this.isCreate = false;
        this.isShedule = false;
        this.isNotices = false;
        this.isForm = false;
        this.isNotices = false;
      },
      showCreateModal() {
        this.isCreate = true;
      },
      showSheduleModal() {
        this.isShedule = true;
      },
      showNoticesModal() {
        this.isNotices = true;
      }
    }
  };
</script>
