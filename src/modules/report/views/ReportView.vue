<template>
 <section>
    <ReportsStatistics />
    <div class="reports__shape">
      <router-link to="report-create" class="reports__create">
        <img src="@/assets/icons/trending-up.svg" alt="icon" />
        <span>Сформировать отчёт</span>
      </router-link>
    </div>
    <div class="reports__graphics">
      <Graphic 
        class="grid-area-2"
        name="График №1" 
        type="bar" 
        calendar 
        :tabs="['Год', 'Неделя', 'День']" 
        width="648" 
        :options="graph1Options" 
        :series="graph1Series"
      />
      <PercentGraph 
        class="grid-area-1"
        name="График №2"
        :content="percentGraphContent"
      />
      <Graphic 
        class="grid-area-1"
        name="График №3" 
        type="bar"
        width="290"
        height="310"
        :options="graph3Options"
        :series="graph3Series"
      />
      <Graphic
        class="grid-area-1" 
        name="График №4" 
        width="290" 
        type="donut"
        :options="graph4Options"
        :series="graph4Series"
        :years="[2020, 2021, 2022, 2023, 2024]"
      />
      <TableGraph
        class="grid-area-1" 
        name="KPI"
        :content="KPIcontent"
      />
      <Graphic
        class="grid-area-1" 
        name="График №6" 
        width="170"
        height="173"
        type="radialBar"
        :options="graph6Options"
        :series="graph6Series"
        :digits="{
          sum: 100000,
          month: 'июнь'
        }"
      />
      <Graphic
        class="grid-area-1" 
        name="График №7" 
        width="310"
        height="95"
        type="line"
        quotes
        :options="graph7Options"
        :series="graph7Series"
      />
      <Graphic
        class="grid-area-1" 
        name="График №8" 
        width="170"
        height="173"
        type="radialBar"
        :options="graph8Options"
        :series="graph8Series"
        :digits="{
          sum: 0,
          month: 'июнь'
        }"
      />
    </div>
    <div class="reports__table">
      <Table
        v-if="contractWorks"
        :data="contractWorks.data"
        :total="contractWorks.total"
        :columns="columns"
        @change-table-state="changeTableState"
        @change-table-sort="changeTableSort"
        @edit-item="editItem"
        @delete-item="deleteItem"
        @select-rows="checkBoxedRows = $event"
        @approve="approve"
        :menu-items="menuItems"
        tableTitle="Таблица формирование перечня"
        commonDots
        commonCheckbox
        rowCheckbox
        rowDots
      >
        <template #titlePanel>
          <IconSwitch
            name="search"
            color="#90A0B7"
            :isButton="true"
            class="icon"
          />
          <IconSwitch name="excel" color="#90A0B7" :isButton="true" />
          <div @click="isFilterActive = true">
            <IconSwitch name="filter" color="#90A0B7" :isButton="true" />
          </div>
          <div @click="downloadFile">
            <IconSwitch name="download" color="#90A0B7" :isButton="true" />
          </div>
          <BaseButton
            :text="'Согласовать'"
            :isDisabled="!checkBoxedRows.length"
            @click="isAgreeModalActive = true"
          />
        </template>
      </Table>
    </div>
 </section>
</template>

<script>
  import ReportsStatistics from '../components/ReportsStatistics';
  import BaseButton from '@/components/simple/BaseButton';
  import Graphic from '../graphics/Graphic';
  import TableGraph from '../graphics/TableGraph';
  import PercentGraph from '../graphics/PercentGraph'
  import Table from '@/components/common/Table';
  import { mapGetters, mapActions, mapMutations } from "vuex";
  export default {
    name: 'ReportsView',
    components: {
      ReportsStatistics,
      BaseButton,
      Graphic,
      TableGraph,
      PercentGraph,
      Table
    },
    data() {
      return {
        graph1Options: {
            chart: {
              type: 'bar',
              height: 350,
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: false,
                columnWidth: '35%',
                endingShape: 'rounded',
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            legend: {
              markers: {
                width: 15,
                height: 15,
                radius: 100,
                fillColors: ['#2ED47A', '#FFB946']
              }
            },
            xaxis: {
              categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            },
            yaxis: {
              labels: {
                formatter: function(index) {
                  return ['Данные ' + index]
                }
              }
            },
            fill: {
              opacity: 1,
              colors: ['#2ED47A', '#FFB946']
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val
                }
              }
            }
        },
        graph1Series: [
          {
            name: 'Аванс/Расчёт',
            data: [76, 85, 101, 98, 87, 105, 91]
          }, 
          {
            name: 'Цена спецификации',
            data: [35, 41, 36, 26, 45, 48, 52]
          }],
        percentGraphContent: [
          {name: 'Спецификация №112', spent: 900000, total: 1000000},
          {name: 'Спецификация №113', spent: 500000, total: 900000},
          {name: 'Спецификация №114', spent: 200000, total: 1200000},
          {name: 'Спецификация №115', spent: 900000, total: 1000000},
          {name: 'Спецификация №116', spent: 600000, total: 2000000},
        ],
        graph3Options: {
            chart: {
              type: 'bar',
              height: 350,
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '15%',
                endingShape: 'rounded',
                borderRadius: 4,
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['Янв', 'Фев', 'Мар', 'Апр', 'Май'],
            },
            yaxis: {
              labels: {
                formatter: function(index) {
                  return [index + ' K']
                }
              }
            },
            fill: {
              opacity: 1,
              colors: ['#FFB946']
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val
                }
              }
            }
          },
        graph3Series: [
          {
            name: 'Цена спецификации',
            data: [35, 41, 36, 26, 45]
          }],
        graph4Options: {
          chart: {
              type: 'donut',
          },

          plotOptions: {
            pie: {
              customScale: 1,
              size: '65%',
              offsetY: 30,
              offsetX: 20,
              dataLabels: {
                offset: 35,
              },
            },
            donut: {
              size: '65%',
            }
          },
          dataLabels:{
            style: {
              fontSize: '15px',
              fontWeight: 500,
              colors: ['#323C47']
              },
            dropShadow: {
              enabled: false
              }
            },
          legend:{
            position: 'bottom',
            formatter: (val) => {
              return 'Данные-' + val[7]; 
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
            chart: {
                width: 200
              },
            }
          }]
        },
        graph4Series: [44, 55, 41, 17, 15],
        KPIcontent: [
          {id: Math.random(), image: 'antonova', name: 'Габдулин А.Р', works: '200', done: '150'},
          {id: Math.random(), image: 'antonova', name: 'Антонова Е.И', works: '150', done: '55'},
          {id: Math.random(), image: 'antonova', name: 'Бобкова О.Н', works: '180', done: '67'},
          {id: Math.random(), image: 'antonova', name: 'Бобров С.Ю', works: '300', done: '10'},
          {id: Math.random(), image: '', name: 'Леонидов А.Г', works: '200', done: '13'},
          {id: Math.random(), image: '', name: 'Носик Д.М', works: '200', done: '67'},
          {id: Math.random(), image: '', name: 'Борисов А.Ю', works: '200', done: '78'},
          {id: Math.random(), image: '', name: 'Кудряшов Г.Д.', works: '200', done: '150'},
          {id: Math.random(), image: '', name: 'Прохорова М.Ю.', works: '200', done: '150'},
          {id: Math.random(), image: '', name: 'Молчанов Б.Ф', works: '200', done: '150'},
        ],
        graph6Options: {
            chart: {
              height: 350,
              type: 'radialBar',
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                 hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: false,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  },
                },
                track: {
                  background: '#fff',
                  strokeWidth: '67%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: false,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    show: false,
                    color: '#888',
                    fontSize: '17px'
                  },
                  value: {
                    formatter: function(val) {
                      return parseInt(val) + '%';
                    },
                    color: '#707683',
                    fontSize: '20px',
                    fontWeight: '400',
                    show: true,
                    offsetY: 5
                  }
                }
              }
            },
            fill: {
              colors: [function({ value }) {
                if(value < 50) {
                    return '#F7685B'
                } else if (value >= 55 && value < 65) {
                    return '#FFB946'
                } else {
                    return '#2ED47A'
                }
              }]
            },
            stroke: {
              lineCap: 'round'
            },
            labels: [''],
        },
        graph6Series: [68],
        graph7Options: {
          chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              },
              toolbar: {
                show: false
              }
            },
            dataLabels: {
              enabled: false
            },
            colors: ['#FFB946'],
            stroke: {
              curve: 'straight',
            },
            markers: {
              size: 4,
              strokeColors: '#fff',
              strokeWidth: 1,
            },
            title: {
              text: undefined,
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['10дн', '12дн', '13дн', '14дн', '14дн', '16дн', '18дн', '20дн', '22дн', '24дн', '26дн', '28дн'],
            },
            yaxis: {
              show: false,
            },
            grid: {
              show: false
            }
        },
        graph7Series: [{
              name: "Desktops",
              data: [0, 5, 2, 1, 3, 4, 6, 1, 1, 4, 5, 6]
          }
        ],
        graph8Options: {
            chart: {
              height: 350,
              type: 'radialBar',
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                 hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: false,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  }
                },
                track: {
                  background: '#fff',
                  strokeWidth: '67%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: false,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    show: false,
                    color: '#888',
                    fontSize: '17px'
                  },
                  value: {
                    formatter: function(val) {
                      return parseInt(val) + '%';
                    },
                    color: '#707683',
                    fontSize: '20px',
                    fontWeight: '400',
                    show: true,
                    offsetY: 5
                  }
                }
              }
            },
            fill: {
              colors: [function({ value }) {
                if(value < 50) {
                    return '#F7685B'
                } else if (value >= 55 && value < 65) {
                    return '#FFB946'
                } else {
                    return '#2ED47A'
                }
              }]
            },
            stroke: {
              lineCap: 'round'
            },
            labels: [''],
        },
        graph8Series: [32],
        columns: [
          "position",
          "helicopters",
          "work",
          "workType",
          "quantity",
          "unit",
          "recipient",
          "standards",
        ],
      }
    },
    async mounted() {
      if (!this.contractWorks) {
        this.fetchContractWorks({
          id: this.contractId,
          page: this.page,
          limit: this.limit,
        });
      }
    },
    computed: {
      ...mapGetters("contracts", {
      contractWorks: "contractWorks",
      contracts: "contracts",
      helicoptersFilter: "helicopters",
      workTypesFilter: "workTypes",
      recipientsFilter: "recipients",
      })
    },
    methods: {
      ...mapActions("contracts", {
      fetchContractWorks: "fetchContractWorks",
    }),
    }
  }
</script>

<style lang="scss" scoped>
  .grid-area-2 {
    width: 732px;
  }
  .grid-area-1 {
    width: 356px;
  }
  .reports{
    &__shape{
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    &__graphics{
      display: flex;
      grid-gap: 20px;
      align-content: center;
      flex-wrap: wrap;
      margin-top: 20px;
    }
    &__create{
      display: flex;
      align-items: center;
      justify-content: center;
      background: $accent-blue;
      padding: 13.5px 20.5px;
      color: $white;
      font-weight: 500;
      font-size: 13px;
      letter-spacing: 0.01em;
      border-radius: 4px;
      text-decoration: none;
      & span {
        margin-left: 2px;
      }
      &:hover{
        color: $white;
        box-shadow: 0px 8px 16px rgba(52, 175, 249, 0.2);
      }
    }
  }
  .router-link {
    color: $white;
    &:hover{
      color: $white;
    }
  }
  .router-link-active {
    color: $white;
  }
</style>