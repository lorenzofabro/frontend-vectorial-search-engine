<template>
  <v-app style="font-family: ProximaNova !important; background-color: #262626">
    <AppBar />
    <v-content>
      <h1 class="text-center mt-2">Motor de Búsqueda Vectorial</h1>
      <Buscar />
    </v-content>
    <Footer />
  </v-app>
</template>

<style>
@font-face {
  font-family: "ProximaNova";
  src: url("~@/assets/ProximaNova-Regular.otf");
}
</style>

<script>
import AppBar from "./components/AppBar";
import Buscar from "./views/Buscar";
import Footer from "./components/Footer";

export default {
  name: "App",

  components: { AppBar, Buscar, Footer },

  data: () => ({
    //
  }),

  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
