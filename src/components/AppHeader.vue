<template>
  <component :is="`h${level}`" v-bind="$attrs">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: ["level"],
};
</script>
