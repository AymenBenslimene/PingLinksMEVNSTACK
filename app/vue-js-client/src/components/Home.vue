<template>
    <div class="container">
      <header class="jumbotron">
        <h3>Ping Links</h3>
      </header>
      <div>Service web permettant de vérifier la présence de liens sur des pages web.
      
      Le service web permet de :</div>
        <div>- visiter quotidiennement l'ensemble des pages web fournies</div>
        <div>- vérifier sur chaque page qu'il y a bien un lien pointant vers la destination précisée</div>
        <div>- envoyer une alerte par email à une adresse email prédéfinie lorsque des liens ne sont plus présents sur les pages où ils devraient l'être</div> 
        <div>Le service offre une mise à jour dans un back-office et l'historique de tous les pings effectués et leur résultat : positif ou négatif. </div>

    </div>
  </template>
  
  <script>
  import UserService from "../services/user.service";
  
  export default {
    name: "Home-interface",
    data() {
      return {
        content: "",
      };
    },
    mounted() {
      UserService.getPublicContent().then(
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  };
  </script>