<script>
import db from '../firebase/init';
import slugify from 'slugify';

export default {
  name: 'AddSmoothie',
  data: () => ({
    title: '',
    ingredients: [],
    currentIngredient: '',
    feedback: ''
  }),
  methods: {
    addSmoothie() {
      if (!this.title) {
        this.feedback = 'You must enter a smoothie title';
      } else if (!this.ingredients.length) {
        this.feedback = 'You must enter a minimum of one ingredient';
      } else {
        console.log(this.title, this.ingredients);
        const slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection('smoothies')
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug
          })
          .then(() => {
            this.title = '';
            this.ingredients = [];
            this.feedback = '';
          });
      }
    },
    addIngredient() {
      if (!this.currentIngredient) {
        this.feedback = 'You must enter a value to add an ingredient';
      } else {
        this.ingredients.push(this.currentIngredient);
        this.currentIngredient = '';
        this.feedback = '';
      }
    },
    deleteIngredient(index) {
      this.ingredients.splice(index, 1);
    }
  }
};
</script>

<template lang="pug">
div.add-smoothie.container
  h2.center-align.indigo-text Add New Smoothie Recipe
  form(@submit.prevent="addSmoothie")
    div.field.title
      label(for="title") Smoothie Title:
      input(type="text", name="title" v-model="title")
    div.field(v-for="(ing, i) in ingredients", :key="i")
      label(for="ingredient") Ingredient:
      input(type="text", name="ingredient", v-model="ingredients[i]")
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
      button.btn.pink Add Smoothie
</template>

<style lang="sass">
.add-smoothie 
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