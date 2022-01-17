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
      cache: '',
      isPublic: false,
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
    async load(ignoreFilters) {
      this.loading = true;
      this.$nextTick(() => {
        if (process.client) {
          this.$nuxt.$loading.start();
        }
      });
      this.beforeLoad();
      let { params } = this.resource;
      if (!ignoreFilters && !this.ignoreFilters) {
        params = _.assign({}, params, this.$route.query);
      }
      let data = null;
      if (this.resource.params.id) {
        data = await this.loadItem(params);
      } else {
        data = await this.loadList(params);
      }
      this.isTemplateList = false;
      return data;
    },

    async loadItem(params) {
      let {name, api, isPublic} = this.resource;
      let data = null;
      try {
        ({data} = await this.$api.res(name, api, isPublic).get(params));
        this.item = data;
      } catch(error) {
        this.error = error;
        this.afterError(error);
      } finally {
        if (process.client) {
          this.$nuxt.$loading.finish();
        }
        this.loading = false;
      }
      this.afterLoad();
      return data;
    },
    async loadList(params) {
      let {name, api, isPublic} = this.resource;
      let data = null;
      try {
        ({data} = await this.$api.res(name, api, isPublic).load(params));
        if (this.infiniteListData) {
          this.list.push(data);
        } else {
          this.list = data;
        }
      } catch(error) {
        this.error = error;
      } finally {
        if (process.client) {
          this.$nuxt.$loading.finish();
        }
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
    async reload(reset, ignoreFilters) {
      if (reset) {
        this.clearFilters();
      }
      if (this.infiniteListData) {
        return await this.load(ignoreFilters);
      } else {
        this.$router.push(this.nextRoute());
      }
      return null;
    },
    refresh() {
      this.filters.t = +new Date();
      this.reload();
    },
    async next(link) {
      if (!this.filters.page) {
        this.filters.page = 1;
      }
      this.filters.page = Number(this.filters.page) + 1;
      if (this.infiniteListData) {
        this.resource.params.page = this.filters.page;
      }
      return await this.reload();
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
