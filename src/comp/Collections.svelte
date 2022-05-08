<script lang="ts">
  import Collection from "./Collection.svelte";
  import { collections } from "./../stores/collections";

  let newcolltitle: string = null;
  let newcolltext: string = null;
  const addColl = () => {
    collections.addCollection(newcolltitle, newcolltext);
    newcolltitle = null;
    newcolltext = null;
  }
</script>

{#if $collections}
<div>
  <form on:submit|preventDefault={addColl}>
    <input type="text" bind:value={newcolltitle} />
    <input type="text" bind:value={newcolltext} />
    <button>add</button>
  </form>
</div>
{/if}

{#if $collections && $collections.length > 0}
  <div id="collgrid">
    {#each $collections as coll}
      <Collection {coll}/>
    {/each}
  </div>
{:else}
  <p>no collections found</p>
{/if}

<style>
  #collgrid {
    display: grid;
  }
</style>
