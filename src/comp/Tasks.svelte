<script lang="ts">
  import Task from "./Task.svelte";
  import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import { onMount } from "svelte";
  import Event from "./Event.svelte";
  import { TTask } from "./../types/task.intf";
  import { TaskType } from "./../types/task.type.enum";
  import Note from "./Note.svelte";

  let tasks: TTask[] = [];
  onMount(async () => {
    const tasksRef = collection(getFirestore(), "tasks");
    const tasksQuery = query(
      tasksRef,
      where("user_uid", "==", getAuth().currentUser.uid)
    );
    (await getDocs(tasksQuery)).docs.forEach((d, i) => {
      tasks[i] = new TTask(d);
    });
  });
</script>

{#if tasks.length > 0}
  <ul>
    {#each tasks as task}
      {#if task.type == TaskType.Task}
        <Task {task} />
      {:else if task.type == TaskType.Event}
        <Event event={task} />
      {:else if task.type == TaskType.Note}
        <Note note={task} />
      {/if}
    {/each}
  </ul>
{:else}
  <p>no data found</p>
{/if}
