<script>
import _ from 'underscore';

import ResourceActions from './src/ResourceActions.vue';
import ItemActions from './src/ItemActions.vue';
import CachedResource from './src/CachedResource.vue';

export default {
  // watchQuery: ['user', 'search', 'offset', 'order'],
  watch: {
    '$route.query'() {
      this.load();
    },
  },
  mixins: [
    ResourceActions,
    ItemActions,
    CachedResource
  ],
  methods: {
    suggest: _.debounce(function () {
      this.back();
    }, 700),

    // listPatch(item) {
    //   this.list
    // },
  },
};
</script>
