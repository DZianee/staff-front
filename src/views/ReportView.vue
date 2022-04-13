<template>
  <div class="ideaView">
    <div class="container-fluid ml-25 mr-25">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Statistic</h1>
      </div>

      <div class="row">
        <div class="col-xl-8 col-lg-7">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-secondary">Number of ideas</h6>
            </div>
            <div class="card-body">
              <div class="chart-area">
                <canvas id="myAreaChart"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-5">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-secondary">Percentage of ideas</h6>
            </div>
            <div class="card-body">
              <div class="chart-pie pt-4 pb-2">
                <canvas id="myPieChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 mb-4">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-secondary">Contributor analysis</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-stripe" id="dataTable" width="99%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Contributor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in departmentReport" :key="item._id">
                      <td>{{ item.departmentName }}</td>
                      <td>{{ item.totalContributor }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mb-4">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-secondary">Top 5 Contributor</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-stripe" width="99%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Ideas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in topFiveReport" :key="item._id">
                      <td>{{ item.userFullname }}</td>
                      <td>{{ item.departmentName }}</td>
                      <td>{{ item.totalContribution }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Chart, registerables } from "chart.js";
import { randomColors } from "../utils/charColors.js";
export default {
  name: "ReportPage",
  components: {},
  data() {
    return {
      departmentReport: [],
      topFiveReport: [],
    };
  },
  methods: {
    initChart(labels, ideaCounts, percents) {
      new Chart(document.getElementById("myAreaChart"), {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              backgroundColor: randomColors,
              data: ideaCounts,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              usePointStyle: true,
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.x !== null) {
                    label += context.parsed.x;
                  }
                  return label;
                },
              },
            },
          },
          indexAxis: "y",
          legend: { display: false },
          title: {
            display: true,
          },
          scales: {
            x: {
              grid: {
                lineWidth: 0.5,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
            y: {
              grid: {
                lineWidth: 0.5,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          },
        },
      });
      new Chart(document.getElementById("myPieChart"), {
        type: "pie",
        data: {
          labels,
          datasets: [
            {
              label: "Idea (percents)",
              backgroundColor: randomColors,
              data: percents,
            },
          ],
        },
        options: {
          title: {
            display: true,
          },
          plugins: {
            tooltip: {
              usePointStyle: true,
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed !== null) {
                    label += `${Number(context.parsed).toFixed(1)} %`;
                  }
                  return label;
                },
              },
            },
          },
        },
      });
    },
  },
  created() {
    Chart.register(...registerables);
    document.title = "Statistic";
  },
  async mounted() {
    try {
      const { status, data } = await this.$axios.get(`api/v1/Department/getIdeaCount`);
      const dpReportRes = await this.$axios.get(`api/v1/Department/getContributorCount`);
      const topFive = await this.$axios.get(`api/v1/User/getTopFiveContributors`);
      if (status == 200) {
        const rawReport = data.content;
        const labels = [];
        const ideaCounts = [];
        const percents = [];
        rawReport.map((item) => {
          labels.push(item.departmentName);
          ideaCounts.push(item.ideaCount);
          percents.push(item.percentage);
        });
        this.initChart(labels, ideaCounts, percents);
      }
      if (dpReportRes.status === 200) {
        this.departmentReport = dpReportRes.data.content;
      }
      if (topFive.status === 200) {
        this.topFiveReport = topFive.data.content;
      }
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.ideaView {
  position: relative;
  left: 270px;
  width: calc(100% - 270px);
}
@media (min-width: 481px) and (max-width: 1025px) {
  .ideaView {
    position: relative;
    left: 80px;
    width: calc(100% - 80px);
  }
}
@media screen and (max-width: 480px) {
  .ideaView {
    position: relative;
    left: 0px;
    top: 70px;
    width: 100%;
  }
}
.table-responsive .table {
  width: 99%;
}
</style>
