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

    <!-- Documentos Indexados-->

    <v-badge
      bordered
      color="error"
      overlap
      :content="documentosIndexados.length"
    >
      <v-btn text @click="dialog = true"
        ><v-icon class="mr-2">mdi-file-multiple</v-icon>Ver documentos
        indexados</v-btn
      >
    </v-badge>
    <v-dialog v-model="dialog" width="1024">
      <v-card>
        <v-btn text v-for="(doc, ind) in documentosIndexados" v-bind:key="ind">
          <v-icon class="mr-2" size="small">mdi-file-outline</v-icon>
          {{ doc.nombre }}
        </v-btn>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" text @click="dialog = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Indexar Carpeta -->
    <v-btn text @click="confirmActionDialog = true" class="ml-9">
      <v-icon class="mr-2">mdi-folder</v-icon>Indexar carpeta</v-btn
    >
    <v-dialog v-model="confirmActionDialog" max-width="600px">
      <v-card>
        <v-card-title
          style="background-color: #ba0737;font-family: ProximaNova !important"
          class="title text-uppercase font-weight-bold white--text mb-3"
          >Indexar Carpeta
        </v-card-title>
        <v-card-text>
          ¿Esta seguro que desea continuar?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            text
            class="mr-0 mr-md-2"
            @click="
              indexarCarpeta();
              confirmActionDialog = false;
            "
          >
            Si
          </v-btn>
          <v-btn color="error" text @click="confirmActionDialog = false">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Indexar Documento-->
    <v-btn text for="uploadImage" tag="label" id="labelUploadImage" class="">
      <v-icon class="mr-2">mdi-file-cog</v-icon>Indexar Documento</v-btn
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
      dialog: false,
      confirmActionDialog: false,
      progress: false,
      snackbar: false,
      snackbarText: "",
      documentosIndexados: [],
    };
  },
  created() {
    this.getDocumentos();
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
        .post("api/documentos/indexar/bulk", qs.stringify(body), requestOptions)
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
      this.documentosIndexados.push({
        nombre: nombre,
        url: `documentos/${nombre}`,
      });
    },
    getDocumentos() {
      this.axios
        .get("api/documentos/todos")
        .then((res) => {
          this.documentosIndexados = res.data.data.documentos;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    indexarCarpeta() {
      this.progress = true;
      this.axios
        .post("api/documentos/indexar/carpeta")
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
            "Por favor mirá la consola del servidor para chequear el estado de la indexación 🙏";
          this.progress = false;
        });
    },
  },
};
</script>
