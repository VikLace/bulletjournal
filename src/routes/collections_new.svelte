<script lang="ts">
  import { TCollection } from "./../types/collection.cls";
  import { collections } from "./../stores/collections";
  import { currentError } from "./../stores/error";

  //todo: move req field check to tdbrecord?
  const addCollection = () => {
    if (currColl.title && currColl.text)
    {
      $currentError = null;
      collections.addCollection(currColl.title, currColl.text);
      currColl = new TCollection();
    }
    else
      $currentError = "Nav aizpildīti visi obligātie lauki!";
  }

  //todo: move req field check to tdbrecord?
  const updateCollection = () => {
    if(currColl.ref)
    {
      if (currColl.title && currColl.text)
      {
        $currentError = null;
        currColl.Update();
      }
      else
        $currentError = "Nav aizpildīti visi obligātie lauki!";
    }
  }

  const setCurrColl = (coll: TCollection) => {
    if(currColl && !currColl.ref && (currColl.title || currColl.text)) {
      //todo: ask whether to discard/save current new entry
      //alternative: save as draft / save to localStorage and reload on "new entry"
    }
    currColl = coll;
  }

  let currColl: TCollection = new TCollection();
</script>

<div id="collections">
  <div id="left-pane">
    <button id="new-entry" on:click={() => currColl = new TCollection()}>+ new entry</button>
    {#if $collections}
      {#if $collections.length > 0}
        <ul id="coll-list">
          {#each $collections as coll}
            <li on:click={() => setCurrColl(coll)}>
              <div id="list-item-title">{coll.title}</div>
              <div id="list-item-text">{coll.text}</div>
            </li>
          {/each}
        </ul>
      {:else}
        <div id="no-data-frame">Kolekciju saraksts ir tukšs</div>
      {/if}
    {:else}
      <div id="data-loading-frame">Notiek datu ielāde...</div>
    {/if}
  </div>
  <div id="collection-form">
    <div>
      <input id="title-text" type="text" placeholder="Virsraksts" bind:value={currColl.title} on:change={()=>updateCollection()}/>
      {#if !currColl.ref}
      <button on:click={()=>addCollection()}>saglabāt</button>
      {/if}
    </div>
    <textarea id="notes-text" spellcheck="false" placeholder="Vieta piezīmēm" bind:value={currColl.text} on:change={()=>updateCollection()}/>
  </div>
</div>

<style>
  #collections{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
</style>