<script>
import { map } from 'underscore';

export default {
  methods: {
    async createItem(data) {
      let {name, api, isPublic, postPublic} = this.resource;
      let isPublicRequest = isPublic && postPublic;
      let {data: entity} = await this.$api.res(name, api, isPublicRequest).post(data);
      return entity;
    },
    async updateItem(data, params) {
      let {name, api, isPublic, putPublic} = this.resource;
      let isPublicRequest = isPublic && putPublic;
      let {data: entity} = await this.$api.res(name, api, isPublicRequest).put(data, params);
      return entity;
    },
    async removeItem(params) {
      let {name, api, isPublic, deletePublic} = this.resource;
      let isPublicRequest = isPublic && deletePublic;
      await this.$api.res(name, api, isPublicRequest).delete(params);
    },

    changedItem(item, items) {
      let list = items || this.list;
      map(list, (element, index) => {
        if (item.id == element.id) {
          this.rewriteItem(index, item, list);
        }
      });
    },

    rewriteItem(index, item, items) {
      let list = items || this.list;
      if (item) {
        list.splice(index, 1, item);
      } else {
        list.splice(index, 1);
      }
    },

  },
};
</script>
