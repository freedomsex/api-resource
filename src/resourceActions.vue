<script>
import _ from 'underscore';
import pruner from '@freedomsex/params-pruner';
import apiFilters from './apiFilters.vue';
import hooks from './hooks';

export default {
  mixins: [
    hooks,
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
      this.beforeLoad();
      let { params } = this.resource;
      if (!plain) {
        params = _.assign({}, params, this.$route.query);
      }
      if (params.id) {
        return await this.loadList(params);
      } else {
        return await this.loadItem(params);
      }
    },

    async loadList(params) {
      let {name, api} = this.resource;
      try {
        let {data} = await this.$api.res(name, api).get(params);
        this.item = data;
        return data;
      } finally {
        this.$nuxt.$loading.finish();
      }
      this.afterLoad();
    },
    async loadItem(params) {
      let {name, api} = this.resource;
      try {
        let {data} = await this.$api.res(name, api).load(params);
        this.list = data;
        return data;
      } finally {
        this.$nuxt.$loading.finish();
      }
      this.afterLoad();
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
