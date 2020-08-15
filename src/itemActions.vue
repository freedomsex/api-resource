<script>
export default {
  methods: {
    async create(params) {
      let {name, api} = this.resource;
      let {data} = await this.$api.res(name, api).post(params);
      return data;
    },
    async update(id, params) {
      let {name, api} = this.resource;
      let {data} = await this.$api.res(name, api).put(params, id);
      return data;
    },
  },
};
</script>
