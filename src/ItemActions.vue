<script>
import { map } from 'underscore';

export default {
  methods: {
    async createItem(data) {
      let {name, api, isPublic, postPublic} = this.resource;
      let public = isPublic && postPublic;
      let {data: entity} = await this.$api.res(name, api, public).post(data);
      return entity;
    },
    async updateItem(data, params, putPublic) {
      let {name, api, isPublic} = this.resource;
      let public = isPublic && putPublic;
      let {data: entity} = await this.$api.res(name, api, public).put(data, params);
      return entity;
    },
    async removeItem(params, deletePublic) {
      let {name, api, isPublic} = this.resource;
      let public = isPublic && deletePublic;
      await this.$api.res(name, api, public).delete(params);
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
