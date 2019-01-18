<template lang="pug">
div.index.container
  div.card(v-for="smoothie in smoothies" :key="smoothie.id")
    div.card-content
      i.material-icons.delete(@click="deleteSmoothie(smoothie.id)") delete
      h2.indigo-text {{ smoothie.title }}
      ul.ingredients
        li(v-for="ing in smoothie.ingredients" :key="ing")
          span.chip {{ ing }}
    router-link(:to="{ name: 'EditSmoothie', params: { smoothie_slug: smoothie.slug } }")
      span.btn-floating.btn-large.halfway-fab.pink
        i.material-icons.edit edit
</template>

<script>
import db from '../firebase/init';

export default {
  name: 'Index',
  data: () => ({
    smoothies: []
  }),
  created() {
    db.collection('smoothies')
      .get()
      .then(snapshot =>
        snapshot.forEach(doc =>
          this.smoothies.push({
            id: doc.id,
            ...doc.data()
          })
        )
      );
  },
  methods: {
    deleteSmoothie(id) {
      db.collection('smoothies')
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(s => s.id !== id);
        });
    }
  }
};
</script>

<style lang="sass">
.index 
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-gap: 30px
  margin-top: 60px
  h2 
    font-size: 1.8em
    text-align: center
    margin-top: 0
  .ingredients 
    margin: 30px auto
    li 
      display: inline-block
  .delete
    position: absolute
    top: 4px
    right: 4px
    cursor: pointer
    color: #aaa
    font-size: 1.4em
</style>
