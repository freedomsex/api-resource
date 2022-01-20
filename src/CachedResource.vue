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

    restoreData(name) {
      if (this.resource.params.id) {
        this.restoreItem(name);
      } else {
        this.restoreList(name);
      }
    },

    restoreItem(name) {
      let key = this.cacheItemKey(this.resource.params.id, name);
      this.item = this.$cache.load(key, this.item);
    },
    restoreList(name) {
      let key = this.cacheListKey(name);
      this.list = this.$cache.load(key, this.list);
    },

    async loadCached(id, name, force) {
      this.loadCachedItem(id, name, force); 
      if (force || !this.item.id) {
        await this.load();
      }
      this.isTemplateList = false;
      this.storeCachedItem(name);
      return; 
    },

    async cachedList(name, force) {
      this.loadCachedList(name, force); 
      if (force || !this.list.length) {
        await this.load();
      }
      this.isTemplateList = false;
      this.storeCachedList(name);
      return; 
    },


    loadCachedList(name, force) {
      if (force || this.isTemplateList || !this.list.length) {
        this.restoreList(name);
      }
    },
    loadCachedItem(id, name, force) {
      if (id) {
        this.resource.params.id = id;
      } 
      if (force || this.isTemplateList || !this.item.id) {
        this.restoreItem(name);
      }
    },


    // TODO: Remove this alias after 3.0 - Deprecated
    preCacheList(name) {
      this.restoreCachedList(name);
    },
    preCacheItem(name) {
      this.restoreCachedItem(name);
    },

    restoreCached(name) {
      if (this.resource.params.id) {
        this.restoreCachedItem(name);
      } else {
        restoreCachedList(name);
      }  
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

    // TODO: Remove this alias after 3.0 - Deprecated
    cacheItem(name) {
      this.storeCachedItem(name);
    },
    cacheList(name) {
      this.storeCachedList(name);
    },

    storeCached(name) {
      if (this.resource.params.id) {
        this.storeCachedItem(name);
      } else {
        storeCachedList(name);
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


    reloadCached(id, name) {
      if (id) {
        this.reloadCachedItem(id, name)
      } else {
        this.reloadCachedList(name);
      }
    },

    reloadCachedItem(id, name) {
      this.restoreCachedItem(name);
      this.loadCachedItem(id, name);
    },
    reloadCachedList(name) {
      this.restoreCachedList(name);
      this.loadCachedList(name);
    },

    async refreshCached(id, name, hard) {
      if (id) {
        await this.reloadCachedItem(id, name, hard)
      } else {
        await this.reloadCachedList(name, hard);
      }
      return; 
    },

    async refreshCachedItem(id, name, hard) {
      if (!hard) {
        this.reloadCachedItem(id, name);
      }
      await this.loadCached(id, name, true);
      return; 
    },
    async refreshCachedList(name, hard) {
      if (!hard) {
        this.reloadCachedList(name);
      }
      await this.cachedList(name, true);
      return; 
    },

  },
}
</script>
