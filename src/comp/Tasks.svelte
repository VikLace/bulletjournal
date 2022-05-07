<script lang="ts">
  import Task from "./Task.svelte";
  import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    DocumentReference,
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import Event from "./Event.svelte";
  import { TTask } from "./../types/task.cls";
  import { TaskType } from "./../types/task.type.enum";
  import Note from "./Note.svelte";
  import { fbuser } from "./../stores/fbuser";
  import { fbapp } from "./../stores/fbapp";

  let tasks: TTask[] = [];

  let tasksRef = null;
  $: $fbapp, (tasksRef = $fbapp ? collection(getFirestore($fbapp), "tasks") : null);

  let tasksQuery = null;
  $: $fbuser, tasksRef,
    (tasksQuery = $fbuser && tasksRef ? query(tasksRef, where("user_uid", "==", $fbuser.uid)) : null);

  async function reloadTasks() {
    tasks = [];
    if (tasksQuery)
      (await getDocs(tasksQuery)).docs.forEach((d, i) => {
        tasks[i] = new TTask(d);
      });
  }
  onMount(async () => {
    await reloadTasks();
  });

  let newtasktype: TaskType = null;
  let newtasktext: string = null;
  const addTask = async () => {
    addDoc(tasksRef, {
      user_uid: $fbuser.uid,
      date: Math.floor(Date.now() / 8.64e7),
      type: newtasktype,
      text: newtasktext,
      last_modified: Date.now(),
    }).then((ref: DocumentReference) => {
      newtasktype = null;
      newtasktext = null;
      reloadTasks(); //todo: instead of fullreload >> getDoc + tasks[tasks.len] = new?
    });
  };
</script>

<div>
  <form on:submit|preventDefault={addTask}>
    <select bind:value={newtasktype}>
      <option value={TaskType.Task}>v</option>
      <option value={TaskType.Event}>o</option>
      <option value={TaskType.Note}>-</option>
    </select>
    <input type="text" bind:value={newtasktext} />
    <button>add</button>
  </form>
</div>

{#if tasks.length > 0}
  <ul>
    {#each tasks as task}
      <li class="li{task.type}">
        {#if task.type == TaskType.Task}
          <Task {task} />
        {:else if task.type == TaskType.Event}
          <Event event={task} />
        {:else if task.type == TaskType.Note}
          <Note note={task} />
        {/if}
        <button title="Delete" on:click={() => task.Delete()}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9 15 4.41Z"
            />
          </svg>
        </button>
      </li>
    {/each}
  </ul>
{:else}
  <p>no tasks found</p>
{/if}

<style>
  .li1 {
    list-style-type: none;
  }
  .li2 {
    list-style: inside;
    list-style-type: circle;
    margin-left: 10px;
  }
  .li3 {
    list-style: inside;
    list-style-type: "-";
    margin-left: 20px;
  }
</style>
