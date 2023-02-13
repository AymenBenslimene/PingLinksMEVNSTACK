<template>
  <div v-if="currentWebPage" class="edit-form">
    <h4>Page Web</h4>
    <form>
      <div class="form-group">
        <label for="url">Url</label>
        <input type="text" class="form-control" id="url"
          v-model="currentWebPage.url"
        />
      </div>

      <div class="form-group">
        <label for="url">Lien</label>
        <input type="text" class="form-control" id="itsLink"
          v-model="currentWebPage.itsLink"
        />
      </div>

      
    </form>


    <button class="badge badge-danger mr-2"
      @click="deleteWebPage"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateWebPage"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Web Page...</p>
  </div>
</template>

<script>
import WebPageServiceData from "../services/WebPageServiceData";

export default {
  name: "webPage",
  data() {
    return {
      currentWebPage: null,
      message: ''
    };
  },
  methods: {
    getWebPage(id) {
      WebPageServiceData.get(id)
        .then(response => {
          this.currentWebPage = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateWebPage() {
      WebPageServiceData.update(this.currentWebPage.id, this.currentWebPage)
        .then(response => {
          console.log(response.data);
          this.message = 'The Web Page was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteWebPage() {
      WebPageServiceData.delete(this.currentWebPage.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "webpages" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getWebPage(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>