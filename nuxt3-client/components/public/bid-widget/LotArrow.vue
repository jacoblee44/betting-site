<template>
  <div class="arrow-box relative bg-orange-500">
    <div class="content">
      <!-- Your content for "Lot 61" goes here -->
      Lot 61
    </div>
    <div class="arrow-right"></div>
  </div>
</template>

<script setup lang="ts">
// Script can be added here if needed
</script>

<style scoped>
.arrow-box {
  height: 30px; /* Setting the height to 30px */
  position: relative; /* Ensures that the absolute positioned arrow is relative to this box */
  display: flex; /* Use flexbox for easy vertical centering */
  align-items: center; /* Center content vertically */
  padding: 0 4px; /* Assuming you want padding, adjust as necessary but keep the box height at 30px */
  margin-right: 12px;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  font-weight: 600;
}

.arrow-right {
  position: absolute;
  right: -5px; /* Adjust so the arrow goes 5px to the right */
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 15px solid transparent; /* Same as before */
  border-bottom: 15px solid transparent; /* Same as before */
  border-left: 5px solid var(--arrow-color, #f97316); /* Reduce the size of the arrow */
}
</style>
