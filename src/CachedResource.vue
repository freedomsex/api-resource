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

    // TODO: Remove this alias after 3.0 - Deprecated
    cacheItem(name) {
      this.storeCachedItem(name);
    },
    cacheList(name) {
      this.storeCachedList(name);
    },

    async loadCached(id, name, force) {
      if (id) {
        this.resource.params.id = id;
      } 
      if (force || this.isTemplateList || !this.item.id) {
        await this.restoreItem(name);
      }
      if (force || !this.item.id) {
        await this.load();
      }
      this.isTemplateList = false;
      this.storeCachedItem(name);
      return; 
    },
    async cachedList(name, force) {
      if (force || this.isTemplateList || !this.list.length) {
        await this.restoreList(name);
      }
      if (force || !this.list.length) {
        await this.load();
      }
      this.isTemplateList = false;
      this.storeCachedList(name);
      return; 
    },

    // TODO: Remove this alias after 3.0 - Deprecated
    preCacheList(name) {
      this.restoreCachedList(name);
    },
    preCacheItem(name) {
      this.restoreCachedItem(name);
    },

    restoreCachedList(name) {
      if (this.list.length && !this.isTemplateList) {
        this.storeCachedList(name);
      }
    },
    restoreCachedItem(name) {
      if (this.item && !this.isTemplateList) {
        this.storeCachedItem(name);
      }
    },

    storeCachedItem(name) {
      let key = this.cacheItemKey(this.item.id, name);
      this.$cache.save(key, this.item);
    },
    storeCachedList(name) {
      let key = this.cacheListKey(name);
      this.$cache.save(key, this.list);
    },

    async refreshCachedItem(name) {
      await this.cachedItem(name, true);
      return; 
    },
    async refreshCachedList(name) {
      await this.cachedList(name, true);
      return; 
    },

  },
}
</script>
