<template>
  <v-content class="py-2">
    <v-row>
      <v-col cols="6" offset="3">
        <v-text-field
          outlined
          v-model="palabras"
          clearable
          label="Buscar"
          color="white"
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
export default {
  data() {
    return {
      palabras: "",
      headers: [
        {
          text: "Ranking",
          align: "start",
          value: "ranking",
        },
        { text: "Documento", value: "documento.nombre" },
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
          console.log(res);
          this.documentos = res.data.data.documentos;
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
