<script lang="ts">
  import type { TCollection } from "../types/collection.cls";
  import { createEventDispatcher } from "svelte";

  export let coll: TCollection;

  const dispatch = createEventDispatcher();
</script>

<div id="collbox">
  <div>
    <input type="text" bind:value={coll.title} />
    <button
      title="Delete"
      on:click={() => {
        coll.Delete().then(() => dispatch("afterdelete", coll.id));
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path
          d="M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9 15 4.41Z"
        />
      </svg>
    </button>
  </div>
  <textarea bind:value={coll.text} />
</div>

<style>
  #collbox {
    height: 200px;
    width: 200px;
    display: flex;
    flex-direction: column;
  }
</style>
