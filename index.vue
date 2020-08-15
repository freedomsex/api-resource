<script>
import _ from 'underscore';

import resourceActions from './src/resourceActions.vue';
import itemActions from './src/itemActions.vue';

export default {
  // watchQuery: ['user', 'search', 'offset', 'order'],
  watch: {
    '$route.query'() {
      this.load();
    },
  },
  mixins: [
    resourceActions,
    itemActions,
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
