<script lang="ts">
  import Task from "./Task.svelte";
  import {
    getFirestore,
    collection,
    query,
    where,
    Timestamp,
    getDocs,
    QueryDocumentSnapshot,
    type DocumentData,
  } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import { onMount } from "svelte";

  let tasks: QueryDocumentSnapshot<DocumentData>[] = null;
  onMount(async () => {
    const tasksRef = collection(getFirestore(), "tasks");
    const tasksQuery = query(
      tasksRef,
      where("user_uid", "==", getAuth().currentUser.uid)
    );
    tasks = (await getDocs(tasksQuery)).docs;
  });
</script>

{#if tasks}
  {#each tasks as task}
    <Task text={task.get("text")} />
  {/each}
{/if}
