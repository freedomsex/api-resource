<script>
import _ from 'underscore';

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
  created() {
    let filters = JSON.parse(JSON.stringify(this.$route.query));
    this.setFilters(filters);
  },
  methods: {
    clearFilters(filters) {
      this.filters = _.mapObject(this.filters, (value) => {
        if (_.isObject(value)) {
          return _.mapObject(value, () => null);
        }
        return null;
      });
    },
    filter(filters, back) {
      this.clearFilters();
      this.addFilters(filters, back);
    },
    setFilters(filters) {
      this.filters = _.assign(this.filters, filters);
    },
    addFilters(filters, back) {
      this.setFilters(filters);
      this.fetch(back);
    },
    skipFilters(filters, back) {
      let omited = _.omit(this.filters, filters);
      this.filter(omited);
    },
  },
};
</script>
