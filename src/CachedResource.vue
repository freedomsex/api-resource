<script>
export default {
  methods: {
    cacheItemKey(id) {
      return `cached-resource__${this.resource.name}__${id}`;
    },
    cacheListKey() {
      return `cached-resource__${this.resource.name}__list`;
    },
    async restoreItem() {
      let key = this.cacheItemKey(this.resource.params.id);
      this.item = await this.$cache.load(key, this.item);
    },
    async restoreList() {
      let key = this.cacheListKey();
      this.list = await this.$cache.load(key, this.list);
    },
    cacheItem() {
      let key = this.cacheItemKey(this.item.id);
      this.$cache.save(key, this.item);
    },
    cacheList() {
      let key = this.cacheListKey();
      this.$cache.save(key, this.list);
    },

    async loadCached(id) {
      this.resource.params.id = id;
      await this.restoreItem();
      await this.load();
      this.cacheItem();
    },
    async cachedList() {
      await this.restoreList();
      await this.load();
      this.cacheList();
    },
  },
}
</script>
