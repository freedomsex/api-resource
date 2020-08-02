<script>
import _ from 'underscore';

export default {
  // watchQuery: ['user', 'search', 'offset', 'order'],
  watch: {
    '$route.query'() {
      this.load();
    },
    // '$route'() {
    //   this.load();
    // },
  },
  data: () => ({
    resource: {
      name: null,
      api: null,
      params: {},
      data: null,
      path: null,
      uri: null,
      list: false,
    },
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
    list: [],
    item: {},
  }),
  created() {
    let filters = JSON.parse(JSON.stringify(this.$route.query));
    this.setFilters(filters);
  },
  methods: {
    adaptParams(params) {
      function prune(object) {
        object = _.mapObject(object, value => {
          if (_.isObject(value)) {
            if (_.isEmpty(value)) {
              return null;
            }
            return prune(value);
          }
          return value;
        });
        return _.pick(object, value => value !== '' && (!_.isObject(value) || !_.isEmpty(value)) && !_.isNull(value) && !_.isNaN(value) && !_.isUndefined(value));
      }
      return prune(params);
    },

    async load(plain) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
      });
      let {name, api, params} = this.resource;
      if (!plain) {
        params = _.assign({}, params, this.$route.query);
      }
      let resource = this.$api.res(name, api);
      try {
        if (params.id) {
          let {data} = await resource.get(params);
          this.item = data;
          return data;
        } else {
          let {data} = await resource.load(params);
          this.list = data;
          return data;
        }
      } finally {
        this.$nuxt.$loading.finish();
      }
    },
    reload(reset) {
      if (reset) {
        this.clearFilters();
      }
      let query = this.adaptParams(this.filters);
      this.$router.push({
        path: this.path || this.uri,
        query,
      });
    },
    refresh() {
      this.filters.t = +new Date();
      this.reload();
    },
    next() {
      if (!this.filters.page) {
        this.filters.page = 1;
      }
      this.filters.page = Number(this.filters.page) + 1;
      this.reload();
    },
    back() {
      this.filters.page = null;
      this.reload();
    },
    fetch(back) {
      if (back) {
        this.back();
      } else {
        this.reload();
      }
    },
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
    suggest: _.debounce(function () {
      this.back();
    }, 700),

    // listPatch(item) {
    //   this.list
    // },

    async create(params) {
      let {name, api} = this.resource;
      let {data} = await this.$api.res(name, api).post(params);
      return data;
    },

    async update(id, params) {
      let {name, api} = this.resource;
      let {data} = await this.$api.res(name, api).put(id, params);
      return data;
    },
  },
};
</script>
