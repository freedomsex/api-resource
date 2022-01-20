<script>
import {isObject, mapObject, assign, omit } from 'underscore';

export default {
  data: () => ({
    filters: {
      userId: null,
      search: null,
      order: null,
      period: null,
      offset: null,
      all: null,
      hash: null,
      ipaddr: null,
      page: null,
      added: {
        before: null,
        after: null,
      },
      updated: {
        before: null,
        after: null,
      },
      t: null,
    },
  }),
  watch: {
    '$route.query': {
      handler() {
        this.parseFilters();
      },
      immediate: true,
    },
  },
  created() { },
  methods: {
    parseFilters() {
      let filters = JSON.parse(JSON.stringify(this.$route.query));
      this.setFilters(filters);
    },
    clearFilters(filters) {
      this.filters = mapObject(this.filters, (value) => {
        if (isObject(value)) {
          return mapObject(value, () => null);
        }
        return null;
      });
    },
    filter(filters, back) {
      this.clearFilters();
      this.addFilters(filters, back);
    },
    setFilters(filters) {
      this.filters = assign(this.filters, filters);
    },
    addFilters(filters, back) {
      this.setFilters(filters);
      this.fetch(back);
    },
    skipFilters(filters, back) {
      let omited = omit(this.filters, filters);
      this.filter(omited);
    },
  },
};
</script>
