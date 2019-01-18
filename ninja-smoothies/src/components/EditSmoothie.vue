<template lang="pug">
div.edit-smoothie.container(v-if="smoothie")
  h2.center-align.indigo-text  Edit {{ smoothie.title }} Smoothie
  form(@submit.prevent="editSmoothie")
    div.field.title
      label(for="title") Smoothie Title:
      input(type="text", name="title" v-model="smoothie.title")
    div.field(v-for="(ing, i) in smoothie.ingredients", :key="i")
      label(for="ingredient") Ingredient:
      input(type="text", name="ingredient", v-model="smoothie.ingredients[i]")
      i.material-icons.delete(@click="deleteIngredient(i)") delete
    div.field.add-ingredient
      label(for="add-ingredient") Add an ingredient:
      input(
        type="text", 
        name="add-ingredient", 
        @keydown.tab.prevent="addIngredient", 
        v-model="currentIngredient"
      )
    div.field.center-align
      p.red-text(v-if="feedback") {{ feedback }}
      button.btn.pink Update Smoothie
</template>

<script>
import db from '../firebase/init';
import slugify from 'slugify';

export default {
  name: 'EditSmoothie',
  created() {
    let ref = db
      .collection('smoothies')
      .where('slug', '==', this.$route.params.smoothie_slug)
      .get()
      .then(snapshot =>
        snapshot.forEach(
          doc =>
            (this.smoothie = {
              id: doc.id,
              ...doc.data()
            })
        )
      );
    // db.collection('smoothies').doc()
  },
  data: () => ({
    smoothie: null,
    currentIngredient: '',
    feedback: ''
  }),
  methods: {
    editSmoothie() {
      if (!this.smoothie.title) {
        this.feedback = 'You must enter a smoothie title';
      } else if (!this.smoothie.ingredients.length) {
        this.feedback = 'You must enter a minimum of one ingredient';
      } else {
        console.log(this.smoothie);
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection('smoothies')
          .doc(this.smoothie.id)
          .update(this.smoothie)
          .then(() => {
            this.$router.push({ name: 'Index' });
          })
          .catch(console.error);
      }
    },
    addIngredient() {
      if (!this.currentIngredient) {
        this.feedback = 'You must enter a value to add an ingredient';
      } else {
        this.smoothie.ingredients.push(this.currentIngredient);
        this.currentIngredient = '';
        this.feedback = '';
      }
    },
    deleteIngredient(index) {
      this.smoothie.ingredients.splice(index, 1);
    }
  }
};
</script>

<style lang="sass">
.edit-smoothie
  margin-top: 60px
  padding: 20px
  max-width: 500px
  h2
    font-size: 2em
    margin: 20px auto
  .field
    margin: 20px auto
    position: relative
  .delete
    position: absolute
    right: 0
    bottom: 16px
    font-size: 1.4em
    color: #aaa
    cursor: pointer
</style>