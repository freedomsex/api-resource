<script>
import _ from 'underscore';

export default {
  methods: {
    async createItem(data) {
      let {name, api} = this.resource;
      let {data: entity} = await this.$api.res(name, api).post(data);
      return entity;
    },
    async updateItem(data, params) {
      let {name, api} = this.resource;
      let {data: entity} = await this.$api.res(name, api).put(data, params);
      return entity;
    },
    async removeItem(params) {
      let {name, api} = this.resource;
      await this.$api.res(name, api).delete(params);
    },

    changedItem(item) {
      _.map(this.list, (element, index) => {
        if (item.id == element.id) {
          this.list.splice(index, 1, item);
        }
      });
    },

  },
};
</script>
