<script lang="ts">
  import Collection from "./Collection.svelte";
  import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    DocumentReference,
  } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import { onMount } from "svelte";
  import { TCollection } from "../types/collection.cls";
  import { fbapp } from "./../stores/fbapp";

  let colls: TCollection[] = [];
  const userid = getAuth($fbapp).currentUser.uid;
  const collsRef = collection(getFirestore($fbapp), "collections");
  const collsQuery = query(collsRef, where("user_uid", "==", userid));
  async function reloadColls() {
    colls = [];
    (await getDocs(collsQuery)).docs.forEach((d, i) => {
      colls[i] = new TCollection(d);
    });
  }
  onMount(async () => {
    await reloadColls();
  });

  let newcolltitle: string = null;
  let newcolltext: string = null;
  const addColl = async () => {
    addDoc(collsRef, {
      user_uid: userid,
      title: newcolltitle,
      text: newcolltext,
      last_modified: Date.now(),
    }).then((ref: DocumentReference) => {
      newcolltitle = null;
      newcolltext = null;
      reloadColls(); //todo: instead of fullreload >> getDoc + colls[colls.len] = new?
    });
  };
</script>

<div>
  <form on:submit|preventDefault={addColl}>
    <input type="text" bind:value={newcolltitle} />
    <input type="text" bind:value={newcolltext} />
    <button>add</button>
  </form>
</div>

{#if colls.length > 0}
  <div id="collgrid">
    {#each colls as coll}
      <Collection {coll} on:afterdelete={() => reloadColls()} />
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
