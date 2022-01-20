<script>
import { debounce, isObject } from 'underscore';

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
    layoutItems: null,
    isTemplateList: false,
    stopQueryWatch: false,
    ignoreFilters: false,
    infiniteListData: false,
    watchQueryMetod: 'load',
  }),
  mixins: [
    ResourceActions,
    ItemActions,
    CachedResource
  ],
  created() {
    this.fillDummyItems();
  },
  methods: {
    watchQueryAction() {
      !this.stopQueryWatch && this.onWatchQuery();
    },
    onWatchQuery() {
      this[this.watchQueryMetod]();
    },
    compareQueryFilters(query, before) {
      for (const param in query) {
        if (isObject(query[param])) {
          return this.compareQueryFilters(query[param], before[param]);
        } else {
          return query[param] !== before[param];
        }
      }
      return false;
    },
    fillDummyItems() {
      if (this.list.length) {
        return;
      }
      if (this.layoutItems) {
        let values = new Array(this.layoutItems);
        let i = 0;
        for (let item of values) {
          this.list.push({id: ++i});
        }
        this.isTemplateList = true;
      }
    },
    suggest: debounce(function () {
      this.back();
    }, 700),

    // listPatch(item) {
    //   this.list
    // },
  },
};
</script>
