<script>
export default {
  methods: {
    cacheName(title) {
      let cache = '';
      let name = '';
      if (this.resource) {
        ({cache, name} = this.resource);
      }
      return cache || title || name;
    },
    cacheItemKey(id, name) {
      return `cached-resource__${this.cacheName(name)}__${id}`;
    },
    cacheListKey(name) {
      return `cached-resource__${this.cacheName(name)}__list`;
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
      if (force || this.isTemplateList || !this.item.id) {
        await this.restoreItem(name);
      }
      if (force || !this.item.id) {
        await this.load();
      }
      this.isTemplateList = false;
      this.cacheItem(name);
    },
    async cachedList(name, force) {
      if (force || this.isTemplateList || !this.list.length) {
        await this.restoreList(name);
      }
      if (force || !this.list.length) {
        await this.load();
      }
      this.isTemplateList = false;
      this.cacheList(name);
    },

    preCacheList(name) {
      if (this.list.length && !this.isTemplateList) {
        this.cacheList(name);
      }
    },
    preCacheItem(name) {
      if (this.item && !this.isTemplateList) {
        this.cacheItem(name);
      }
    },
  },
}
</script>
