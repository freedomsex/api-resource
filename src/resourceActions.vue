<script>
import pruner from 'params-pruner';
import apiFilters from './apiFilters.vue';

export default {
  mixins: [
    apiFilters,
  ],
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
    list: [],
    item: {},
  }),
  methods: {
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
      let query = pruner(this.filters);
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
  },
};
</script>
