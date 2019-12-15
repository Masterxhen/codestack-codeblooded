<template>
  <q-page class="flex flex-center">
    <div class="q-pa-xs">
      <div class="q-pa-sm row items-start q-gutter-lg">
        <q-card
          v-for="data in heroes"
          :key="data.id"
          class="my-card"
          style="min-width: 220px"
          align="center"
        >
          <q-card-section class="bg">
            <q-avatar style="margin-top: 10px;" size="110px" class="shadow-3">
              <img :src="data.picture" />
              <q-btn
                round
                color="grey"
                size="xs"
                class="absolute"
                @click="editHero(data)"
                icon="edit"
                style="top: 0; left: 128px; transform: translateY(-90%);"
              />
              <q-btn
                round
                color="grey"
                size="xs"
                class="absolute"
                @click="delHero(data)"
                icon="delete"
                style="top: 0; left: 99px; transform: translateY(-90%);"
              />
            </q-avatar>

            <q-item-section avatar align="center"></q-item-section>
            <q-item-label style="margin-top: 20px;">{{data.name}}</q-item-label>
            <q-item-label caption style="margin-top: 8px;">
              <q-icon :name="showIcon(data.type)"></q-icon>
              {{data.type}}
            </q-item-label>
          </q-card-section>

          <q-card-section align="center" padding>
            <q-btn
              outline
              glossy
              rounded
              color="black"
              @click="showHero(data)"
              label="View Details"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="card">
      <q-card class="text-center" style="width:300px; height:300px;">
        <q-card-section>
          <q-avatar style="margin-top: 10px;" size="110px" class="shadow-3">
            <img :src="hero.picture" />
          </q-avatar>
        </q-card-section>

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{hero.name}}</div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col">{{hero.type}}</div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="open" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">{{edit ? 'Edit Hero' : 'New Hero'}}</div>
        </q-card-section>

        <q-card-section class="row items-start">
          <q-input
            class="q-pa-md col-xs-12"
            v-model="name"
            rounded
            standout="bg-blue-2"
            popup-content-class="bg-white-5"
            label="Hero Name"
          />
          <q-select
            class="q-pa-md col-xs-12"
            rounded
            standout="bg-blue-2"
            popup-content-class="bg-white-5"
            v-model="type"
            :options="['Strength', 'Agility', 'Intelligence']"
            label="Type"
          />
          <q-input
            class="q-pa-md col-xs-12"
            v-model="picture"
            rounded
            standout="bg-blue-2"
            popup-content-class="bg-white-5"
            label="Picture Link"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat label="Close" @click="closeHero()" />
          <q-btn flat :label="edit ? 'Update Hero' : 'Add Hero' " @click="saveHero()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" size="lg" icon="add" @click="open = true" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      heroes: [],
      hero: {},
      name: "",
      type: "",
      open: false,
      edit: false,
      picture: "",
      id: "",
      card: false
    };
  },
  created() {
    this.$bind("heroes", this.$db.collection("heroes"));
  },
  methods: {
    showIcon(i) {
      if (i === "Strength") {
        return "fas fa-fist-raised";
      } else if (i === "Agility") {
        return "fas fa-running";
      } else {
        return "fas fa-brain";
      }
    },
    closeHero() {
      this.open = false;
      this.name = "";
      this.type = "";
      this.picture = "";
      this.edit = false;
    },
    showHero(d) {
      this.card = true;
      this.hero = d;
    },
    editHero(d) {
      this.name = d.name;
      this.type = d.type;
      this.picture = d.picture;
      this.open = true;
      this.id = d.id;
      this.edit = true;
    },
    delHero(d) {
      this.$db
        .collection("heroes")
        .doc(d.id)
        .delete();
    },
    saveHero() {
      if (this.edit === false) {
        this.$db.collection("heroes").add({
          name: this.name,
          type: this.type,
          picture: this.picture
        });
        this.closeHero();
      } else {
        this.$db
          .collection("heroes")
          .doc(this.id)
          .update({
            name: this.name,
            type: this.type,
            picture: this.picture
          });
        this.closeHero();
      }
    }
  }
};
</script>
