<script>
import _ from 'underscore';
import Pruner from '@freedomsex/params-pruner';
import ApiFilters from './ApiFilters.vue';
import Hooks from './Hooks';
import Pagination from './Pagination';

export default {
  mixins: [
    Hooks,
    Pagination,
    ApiFilters,
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
    loading: false,
    error: false,
  }),
  computed: {
    nextPage() {
      let route = this.nextRoute();
      if (!route.query.page) {
        route.query.page = 1;
      }
      route.query.page = Number(route.query.page) + 1;
      return route;
    },
  },
  methods: {
    async load(plain) {
      this.loading = true;
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
      });
      this.beforeLoad();
      let { params } = this.resource;
      if (!plain) {
        params = _.assign({}, params, this.$route.query);
      }
      if (this.resource.params.id) {
        return await this.loadItem(params);
      } else {
        return await this.loadList(params);
      }
    },

    async loadItem(params) {
      let {name, api} = this.resource;
      let data = null;
      try {
        ({data} = await this.$api.res(name, api).get(params));
        this.item = data;
      } catch(error) {
        this.error = error;
        this.afterError();
      } finally {
        this.$nuxt.$loading.finish();
        this.loading = false;
      }
      this.afterLoad();
      return data;
    },
    async loadList(params) {
      let {name, api} = this.resource;
      let data = null;
      try {
        ({data} = await this.$api.res(name, api).load(params));
        this.list = data;
      } catch(error) {
        this.error = error;
      } finally {
        this.$nuxt.$loading.finish();
        this.loading = false;
        this.afterError();
      }
      this.afterLoad();
      return data;
    },
    nextRoute() {
      let query = Pruner(this.filters);
      return {
        path: this.path || this.uri,
        query,
      };
    },
    reload(reset) {
      if (reset) {
        this.clearFilters();
      }
      this.$router.push(this.nextRoute());
    },
    refresh() {
      this.filters.t = +new Date();
      this.reload();
    },
    next(link) {
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
