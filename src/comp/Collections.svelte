<script lang="ts">
  import Collection from "./Collection.svelte";
  import { collections } from "./../stores/collections";
  import { TCollection } from "./../types/collection.cls";

  let newcoll: TCollection = new TCollection();
</script>

<div id="collections">
  {#if $collections}
    <Collection bind:coll={newcoll}/>
    {#if $collections.length > 0}
      {#each $collections as coll}
        <Collection {coll}/>
      {/each}
    {/if}
  {:else}
    <p>no collections found</p>
  {/if}
</div>

<style>
  #collections {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
