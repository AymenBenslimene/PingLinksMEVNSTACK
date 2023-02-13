<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="url">Url</label>
        <input
          type="text"
          class="form-control"
          id="url"
          required
          v-model="webPage.url"
          name="url"
        />
      </div>

      <div class="form-group">
        <label for="itsLink">Link</label>
        <input
          type="text"
          class="form-control"
          id="itsLink"
          required
          v-model="webPage.itsLink"
          name="itsLink"
        />

      </div>

      <button @click="saveWebPage" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newWebPage">Add</button>
    </div>
  </div>
</template>

<script>
import WebPageServiceData from "../services/WebPageServiceData";

export default {
  name: "add-webPage",
  data() {
    return {
      webPage: {
        id: null,
        url: "",
        itsLink: ""
      },
      submitted: false
    };
  },

  computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    },
  methods: {
    saveWebPage() {
      var data = {
        url: this.webPage.url,
        itsLink: this.webPage.itsLink,
        userid: this.currentUser.id
      };

      WebPageServiceData.create(data)
        .then(response => {
          this.webPage.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newWebPage() {
      this.submitted = false;
      this.webPage = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>