<template>
  <aside>
    <div class="mb-4 pb-3 border-b-[1px] text-white border-slate-100/10">
      <h3 class="font-bold mb-2">CATEGORY LIST</h3>
      <ul>
        <li class="mb-3 text-sm">Category One</li>
        <li class="mb-3 text-sm">Category Two</li>
        <li class="mb-3 text-sm">Category Three</li>
        <li class="mb-3 text-sm">Category Four</li>
        <li class="mb-3 text-sm">Category Five</li>
        <li class="mb-3 text-sm">Category Six</li>
      </ul>
    </div>
    <div class="text-white">
      <h3 class="font-bold mb-2">FILTERS</h3>
      <div>
        <h4 class="font-semibold mb-2">Price</h4>
        <div>
          <label class="mr-3" for="minRange"> Min: 0 </label>
          <input type="range" min="0" max="10" id="minRange" class="w-full" />
        </div>
        <div>
          <label class="mr-3" for="maxRange"> Max: 0 </label>
          <input type="range" min="0" max="10" id="maxRange" class="w-full" />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped></style>
