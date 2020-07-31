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
      params: null,
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
    this.addFilters(filters);
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
        return _.pick(object, value => value !== '' && !_.isEmpty(value) && !_.isNull(value) && !_.isNaN(value) && !_.isUndefined(value));
      }
      return prune(params);
    },

    load(plain) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
      });
      let {name, api, params} = this.resource;
      if (!plain) {
        params = _.assign({}, params, this.$route.query);
      }
      let response;
      let resource = this.$api.res(name, api);
      if (params.id) {
        response = resource.get(params);
      } else {
        response = resource.load(params);
      }
      return response.then(({ data }) => {
        if (params.id && !this.list) {
          this.item = data;
        } else {
          this.list = data;
        }
      }).finally(() => {
        this.$nuxt.$loading.finish();
      });
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
    addFilters(filters, back) {
      this.filters = _.assign(this.filters, filters);
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
      let data = await this.$api.res(name, api).post(params);
    },
  },
};
</script>
