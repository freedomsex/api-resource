export default {
  data: () => ({
    pagination: {
      batch: 10,
      minimun: 5,
    },
  }),
  methods: {
    countItems() {
      return this.list ? this.list.length : 0;
    },
    moreList() {
      return this.list && (this.countItems >= this.pagination.batch || this.filters.page);
    },
    shortList() {
      return this.countItems <= this.pagination.minimun;
    },
  },
}
