<template>
  <v-app-bar app color="#5e0b85">
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <v-btn color="pink" text @click="snackbar = false">
        Cerrar
      </v-btn>
    </v-snackbar>
    <div class="d-flex align-center">
      <v-icon class="mr-2">mdi-school</v-icon>
      <v-toolbar-title>DLC</v-toolbar-title>
    </div>
    <v-spacer></v-spacer>
    <v-btn text for="uploadImage" tag="label" id="labelUploadImage"
      ><v-icon class="mr-2">mdi-file</v-icon>Indexar Documento</v-btn
    >
    <input type="file" @change="onChange" id="uploadImage" class="d-none" />
    <v-progress-circular
      :indeterminate="progress"
      color="white"
    ></v-progress-circular>
  </v-app-bar>
</template>

<style>
#labelUploadImage:hover {
  cursor: pointer;
}
</style>

<script>
import { toBase64 } from "../scripts";
import qs from "qs";
export default {
  data() {
    return {
      progress: false,
      snackbar: false,
      snackbarText: "",
    };
  },
  methods: {
    async onChange(e) {
      const file = e.target.files[0];
      const docBase64 = await toBase64(file);
      const docBase64Stripped = docBase64.replace(
        /^data:text\/[a-z]+;base64,/,
        ""
      );
      this.progress = true;
      this.indexar(file.name, docBase64Stripped);
    },
    indexar(nombre, base64) {
      let requestOptions = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      let body = {
        titulo: nombre,
        documento: base64,
      };

      this.axios
        .post("api/documentos/indexar", qs.stringify(body), requestOptions)
        .then((res) => {
          console.log(res);
          this.snackbar = true;
          this.snackbarText = "Documento indexado exitosamente 😄";
          this.progress = false;
        })
        .catch((e) => {
          console.error(e);
          this.snackbar = true;
          this.snackbarText =
            "El archivo es más grande de lo esperado, por favor mirá la consola del servidor para chequear el estado de la indexación 🙏";
          this.progress = false;
        });
    },
  },
};
</script>
