<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({
    // Test data
    smoothies: [
      {
        id: '1',
        title: 'Ninja Brew',
        slug: 'ninja-brew',
        ingredients: ['bananas', 'coffee', 'milk']
      },
      {
        id: '2',
        title: 'Morning mood',
        slug: 'morning-mood',
        ingredients: ['mango', 'lime', 'juice']
      }
    ]
  })
};
</script>
