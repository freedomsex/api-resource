<script>
import _ from 'underscore';

import ResourceActions from './src/ResourceActions.vue';
import ItemActions from './src/ItemActions.vue';
import CachedResource from './src/CachedResource.vue';

export default {
  watch: {
    '$route.query'(query, before) {
      if (this.queryFilters.length) {
        if (this.compareQueryFilters(query, before)) {
          this.watchQueryAction();
        }
      } else {
        this.watchQueryAction();
      }
    },
  },
  data: () => ({
    queryFilters: [],
    stopQueryWatch: false,
  }),
  mixins: [
    ResourceActions,
    ItemActions,
    CachedResource
  ],
  methods: {
    watchQueryAction() {
      !this.stopQueryWatch && this.onWatchQuery();
    },
    onWatchQuery() {
      this.load();
    },
    compareQueryFilters(query, before) {
      for (const param in query) {
        if (_.isObject(query[param])) {
          return this.compareQueryFilters(query[param], before[param]);
        } else {
          return query[param] !== before[param];
        }
      }
      return false;
    },
    suggest: _.debounce(function () {
      this.back();
    }, 700),

    // listPatch(item) {
    //   this.list
    // },
  },
};
</script>
