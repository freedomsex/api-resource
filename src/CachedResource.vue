<script>
export default {
  methods: {
    cacheItemKey(id, name) {
      return `cached-resource__${name || this.resource.name}__${id}`;
    },
    cacheListKey(name) {
      return `cached-resource__${name || this.resource.name}__list`;
    },
    async restoreItem(name) {
      let key = this.cacheItemKey(this.resource.params.id, name);
      this.item = await this.$cache.load(key, this.item);
    },
    async restoreList(name) {
      let key = this.cacheListKey(name);
      this.list = await this.$cache.load(key, this.list);
    },
    cacheItem(name) {
      let key = this.cacheItemKey(this.item.id, name);
      this.$cache.save(key, this.item);
    },
    cacheList(name) {
      let key = this.cacheListKey(name);
      this.$cache.save(key, this.list);
    },

    async loadCached(id, name, force) {
      this.resource.params.id = id;
      if (force || !this.item.id) {
        await this.restoreItem(name);
        await this.load();
      }
      this.isTemplateList = false;
      this.cacheItem(name);
    },
    async cachedList(name, force) {
      if (force || this.isTemplateList || !this.list.length) {
        await this.restoreList(name);
      }
      if (force) {
        await this.load();
      }
      this.isTemplateList = false;
      this.cacheList(name);
    },
  },
}
</script>
