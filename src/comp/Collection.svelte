<script lang="ts">
  import { collections } from "./../stores/collections";
  import { TCollection } from "../types/collection.cls";
  import { currentError } from "./../stores/error";

  const addCollection = () => {
    if (coll.title && coll.text)
    {
      $currentError = null;
      collections.addCollection(coll.title, coll.text);
      coll = new TCollection();
    }
    else
      $currentError = "Nav aizpildīti visi obligātie lauki!";
  }

  const updateCollection = () => {
    if(coll.ref)
    {
      if (coll.title && coll.text)
      {
        $currentError = null;
        coll.Update();
      }
      else
        $currentError = "Nav aizpildīti visi obligātie lauki!";
    }
  }

  export let coll: TCollection = null;
</script>

<div id="collbox">
  <div id="title">
    <input id="title-text" class:hasvalue={coll.title} type="text" placeholder="Virsraksts" bind:value={coll.title} on:change={() => updateCollection()} />
    {#if coll.ref}
    <svg id="delete-coll" class="coll-button" on:click={() => coll.Delete()} viewBox="0 0 16 16">
      <path fill="currentColor" d="M6.5 1.75a.25.25 0 0 1 .25-.25h2.5a.25.25 0 0 1 .25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 1 0-1.492.15l.66 6.6A1.75 1.75 0 0 0 5.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 0 0-1.492-.149l-.66 6.6a.25.25 0 0 1-.249.225h-5.19a.25.25 0 0 1-.249-.225l-.66-6.6z"/>
    </svg>
    {:else}
    <svg id="add-coll" class="coll-button" on:click={() => addCollection()} viewBox="0 0 16 16">
      <path fill="currentColor" d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69L5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5z"/>
      <path fill="currentColor" fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1.5 0a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0z"/>
    </svg>
    {/if}
  </div>
  <div id="notes">
    <textarea id="notes-text" spellcheck="false" class:hasvalue={coll.text} placeholder="Vieta piezīmēm" bind:value={coll.text} on:change={() => updateCollection()} />
  </div>
</div>

<style>
  #collbox {
    height: 200px;
    width: 200px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
    margin-top: 12px;
    margin-left: 12px;
  }
  #title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
  }
  #notes{
    padding: 0 6px 6px 6px;
    box-sizing: border-box;
    width: 100%;
    flex-grow: 1;
  }
  #notes-text{
    resize: none;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  #collbox:hover .coll-button{
    display: block;
  }
  #title-text{
    width: 100%;
  }
  #title-text.hasvalue:not(active){
    border-color: transparent;
    font-size: large;
    color: rgb(0, 0, 0, 0.8);
  }
  #notes-text.hasvalue:not(active){
    border-color: transparent;
    color: rgb(0, 0, 0, 0.8);
  }
  #collbox:hover #title-text{
    width: 83%;
  }
  .coll-button{
    display: none;
    width: 20px;
    height: 20px;
  }
  #delete-coll:hover{
    color: red;
  }
  #add-coll:hover{
    color: green;
  }
</style>
