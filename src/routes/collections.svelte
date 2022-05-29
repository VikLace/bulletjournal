<script lang="ts">
  import { TCollection } from "./../types/collection.cls";
  import { collections } from "./../stores/collections";
  import { currentError } from "./../stores/error";
  import { ref, uploadBytes } from "firebase/storage";
  import { fbfiles } from "./../stores/fbfiles";

  //todo: move req field check to tdbrecord?
  const addCollection = () => {
    if (currColl.title && currColl.text)
    {
      $currentError = null;
      collections.addCollection(currColl.title, currColl.text, xfiles);
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

  const deleteCollection = (coll: TCollection) => {
    if (coll === currColl)
      currColl = new TCollection();
    coll.Delete()
  }

  const setCurrColl = (coll: TCollection) => {
    if(currColl && !currColl.ref && (currColl.title || currColl.text)) {
      //todo: ask whether to discard/save current new entry
      //alternative: save as draft / save to localStorage and reload on "new entry"
    }
    currColl = coll;
  }

  let currColl: TCollection = new TCollection();

  let dummy: string;
  let files: FileList;
  let xfiles: File[] = [];
  const addFiles = () => {
    if (files) { 
      if (currColl && currColl.ref){
        let collStorage = ref($fbfiles, currColl.id);
        Array.from(files).forEach((f:File) => {
          let fileStorage = ref(collStorage, f.name);
          uploadBytes(fileStorage, f).then(() => {
              console.log("uploaded file", f.name);
            },
            (error) => {
              console.log("upload error",error.code);
            });
        });
      }
      else
        xfiles = [...xfiles, ...Array.from(files)]; //save for later
      dummy = "";
    }
  }
</script>

<div id="collections">
  <div id="left-pane">
    <div></div>
    <button id="new-entry" on:click={() => currColl = new TCollection()}>+ new entry</button>
    {#if $collections}
      {#if $collections.length > 0}
        {#each $collections as coll}
        <div class="coll-item-wrapper">
          <div class="delete-wrap">
            <svg id="delete-coll" class="coll-button" on:click={() => deleteCollection(coll)} viewBox="0 0 16 16">
              <path fill="currentColor" d="M6.5 1.75a.25.25 0 0 1 .25-.25h2.5a.25.25 0 0 1 .25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 1 0-1.492.15l.66 6.6A1.75 1.75 0 0 0 5.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 0 0-1.492-.149l-.66 6.6a.25.25 0 0 1-.249.225h-5.19a.25.25 0 0 1-.249-.225l-.66-6.6z"/>
            </svg>
          </div>
          <div class="coll-item" class:selected={coll===currColl} on:click={() => setCurrColl(coll)}>
            <div class="list-item-title">{coll.title}:</div>
            <div class="list-item-text">{coll.text}</div>
          </div>
        </div>
        {/each}
      {:else}
        <div id="no-data-frame">Kolekciju saraksts ir tukšs</div>
      {/if}
    {:else}
      <div id="data-loading-frame">Notiek datu ielāde...</div>
    {/if}
  </div>
  {#if currColl}
  <div id="collection-form">
    <div id="form-title">
      <input id="title-text" type="text" placeholder="Virsraksts" bind:value={currColl.title} on:change={()=>updateCollection()}/>
      {#if !currColl.ref}
      <button id="save-button" on:click={()=>addCollection()}>saglabāt</button>
      {/if}
    </div>
    <textarea id="notes-text" spellcheck="false" placeholder="Vieta piezīmēm" bind:value={currColl.text} on:change={()=>updateCollection()}/>
    <input id="file-input" type="file" multiple bind:files bind:value={dummy} on:change={() => addFiles()}/>
    {#if currColl.ref}
      {#if currColl.files.length > 0}
        <div>added files:</div> 
        <ul>
          {#each currColl.files as f}
            <li>{f.name}</li>
          {/each}
        </ul>
      {/if}
    {:else}
      {#if xfiles.length > 0}
        <div>added files:</div> 
        <ul>
          {#each xfiles as f}
            <li>{f.name}</li>
          {/each}
        </ul>
      {/if}
    {/if}
  </div>
  {/if}
</div>

<style>
  #collections{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
  #left-pane{
    display: grid;
    grid-template-columns: 20px 20vw;
    margin-right: 30px;
    row-gap: 10px;
    align-items: center;
  }
  #new-entry{
    font-size: large;
    height: 2em;
    cursor: pointer;
    border: 2px solid rgb(147, 218, 170);
    border-radius: 3px;
    transition-duration: 500ms;
    background-color: white;
  }
  #new-entry:hover{
    background-color: rgb(225, 255, 235);
  }
  .coll-item{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid black;
    border-radius: 3px;
    font-size: large;
    color: rgb(65, 65, 65); 
    height: 2em;
    padding: 0 1ch;
    transition-duration: 500ms;
  }
  .coll-item.selected{
    background-color: rgb(182, 211, 255);
  }
  .coll-item:hover{
    background-color: rgb(138, 185, 255);
    cursor: pointer;
  }
  .coll-item-wrapper{
    display: contents;
  }
  .coll-item-wrapper:hover .coll-button{
    display: block;
  }
  .coll-button{
    display: none;
    width: 20px;
    height: 20px;
  }
  #delete-coll:hover{
    color: red;
  }
  .list-item-title{
    font-weight: bold;
    margin-right: 1ch;
  }
  .list-item-text{
    overflow: hidden;
    white-space: nowrap;
    user-select: none;
    text-overflow: ellipsis;
  }
  #collection-form{
    width: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }
  #form-title{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  #title-text{
    flex-grow: 1;
    height: 2em;
  }
  #save-button{
    height: 2em;
    margin-left: 5px;
  }
  #notes-text{
    resize: none;
    height: 10em;
    margin-top: 5px;
  }
</style>