<template>
  <v-content class="py-2">
    <v-snackbar v-model="snackbar" top color="#407537">
      {{ snackbarText }}
      <v-btn color="white" text @click="snackbar = false">
        Cerrar
      </v-btn>
    </v-snackbar>
    <v-row class="mt-3">
      <v-col cols="6" offset="3">
        <v-text-field
          outlined
          v-model="palabras"
          clearable
          label="Buscar"
          color="white"
          @click:clear="documentos = []"
        ></v-text-field>
      </v-col>
      <v-col cols="2"
        ><v-btn class="mt-2" color="#407537" @click="buscar"
          >Buscar</v-btn
        ></v-col
      >
    </v-row>
    <v-row class="mt-2">
      <v-col cols="6" offset="3">
        <v-data-table
          :headers="headers"
          :items="documentos"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import { truncate } from "../scripts";
export default {
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      palabras: "",
      headers: [
        {
          text: "Ranking 🏅",
          align: "start",
          value: "ranking",
        },
        { text: "Documento 📁", value: "documento.nombre" },
        { text: "Peso 🏋", value: "documento.peso" },
      ],
      documentos: [],
    };
  },
  methods: {
    buscar() {
      this.axios
        .get("api/documentos/buscar", {
          params: this.axiosParams,
        })
        .then((res) => {
          this.documentos = res.data.data.documentos;
          this.snackbar = true;
          this.snackbarText =
            "Búsqueda realizada con éxito, mira los resultados abajo 👇";
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },

  computed: {
    axiosParams() {
      const params = new URLSearchParams();
      params.append("busquedaString", this.palabras);
      return params;
    },
  },
};
</script>
