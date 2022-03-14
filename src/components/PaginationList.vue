<template>
  <ul class="pagination-content">
    <li>
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage"><i class="bi bi-caret-left-square"></i></button>
    </li>

    <li>
      <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage"><i class="bi bi-caret-left"></i></button>
    </li>

    <!-- Visible Buttons Start -->

    <li>
      <button style="font-weight: bold" type="button" v-if="previousPageGap" :disabled="true">...</button>
    </li>

    <li v-for="page in pages" :key="page.name">
      <button
        class="pagination-content-item"
        type="button"
        :disabled="page.isDisabled"
        @click="onClickPage(page.name)"
        :class="{ paginationactive: isPageActive(page.name) }">
        {{ page.name }}
      </button>
    </li>

    <li>
      <button style="font-weight: bold" type="button" v-if="latterPageGap" :disabled="true">...</button>
    </li>

    <!-- Visible Buttons End -->

    <li>
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage"><i class="bi bi-caret-right"></i></button>
    </li>

    <li>
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage"><i class="bi bi-caret-right-square"></i></button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "PaginationList",
  data() {
    return {
      previousPageGap: false,
      latterPageGap: false,
    };
  },
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }

      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); i++) {
        if (i > 0) {
          range.push({
            name: i,
            isDisabled: i === this.currentPage,
          });
        }
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
  watch: {
    startPage(newValue) {
      if (newValue - 1 > 0) {
        this.previousPageGap = true;
      } else {
        this.previousPageGap = false;
      }
      if (newValue + 2 < this.totalPages) {
        this.latterPageGap = true;
      } else {
        this.latterPageGap = false;
      }
    },
  },
  mounted() {
    if (this.totalPages > 3) {
      this.latterPageGap = true;
    }
  },
};
</script>

<style>
.pagination-content {
  padding: 0;
  list-style-type: none;
  display: flex;
  width: 320px;
  justify-content: space-between;
  align-items: center;
}

.pagination-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40px;
}

.pagination-content-item {
  padding: 6px 10px;
  border-radius: 4px;
}

.paginationactive {
  background-color: #4aae9b;
  color: #ffffff;
}

@media screen and (max-width: 780px) {
  .pagination-container {
    bottom: 82px;
  }
}

@media screen and (max-width: 400px) {
  .pagination-content {
    width: 273px;
  }
}
</style>
