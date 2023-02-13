<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by url"
            v-model="url"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchUrl"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Web Page List</h4>
        <ul class="list-group">
          
          <li name="Web Page" class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(webPage, index) in webPages"
            :key="index"
            @click="setActiveWebPage(webPage, index)"
          >  
            {{ webPage.url }}
  
          </li>
        </ul>
  
  
      </div>
      <div class="col-md-6">
        <div v-if="currentWebPage">
          <h4>Page Web</h4>
          <div>
            <label><strong>Url:</strong></label> {{ currentWebPage.url }}
          </div>
  
          <div>
            <label><strong>Link:</strong></label> {{ currentWebPage.itsLink }}
          </div>
  
          <div>
            <label><strong>Ping:</strong></label> {{ currentWebPage.valid }}
          </div>

          <div>
            <label><strong>Date:</strong></label> {{ currentWebPage.createdAt }}
          </div>
  
        </div>
        <div v-else>
          <br />
          <p>Please click on a Web Page...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import WebPageServiceData from "../services/WebPageServiceData";
  
  export default {
    name: "webpage-list",
    data() {
      return {
        webPages: [],
        currentWebPage: null,
        currentIndex: -1,
        url: ""
      };
    },

    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      retrieveWebPage() {
        //WebPageServiceData.getAllHistory()
        WebPageServiceData.getAllHistorybyUserID(this.currentUser.id)
          .then(response => {
            this.webPages = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveWebPage();
        this.currentWebPage = null;
        this.currentIndex = -1;
      },
  
      setActiveWebPage(webpage, index) {
        this.currentWebPage = webpage;
        this.currentIndex = index;
      },
  
      removeAllWebPages() {
        WebPageServiceData.deleteAllbyUserID(this.currentUser.id)
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      searchUrl() {
        WebPageServiceData.findByUrl(this.url)
          .then(response => {
            this.webPages = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveWebPage();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>