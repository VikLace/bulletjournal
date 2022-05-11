<script lang="ts">
  import { tasks } from "./../stores/tasks";
  import { TTask } from "./../types/task.cls";
  import TaskTypeBox from "./TaskTypeBox.svelte";

  let error_message: string = null;
  const addTask = () => {
    if (task.type && task.text)
    {
      error_message = null;
      tasks.addTask(task.type, task.text);
      task = new TTask();
    }
    else
      error_message = "Nav aizpildīti visi obligātie lauki!";
  }

  export let task: TTask = null;
</script>

{#if error_message}
<p class="error-message">{error_message}</p>
{/if}
<div class="task-form">
  <TaskTypeBox bind:type={task.type}/>
  <input placeholder="Ievadiet uzdevuma/notikuma/piezīmju tekstu" class="task-text-input" type="text" bind:value={task.text} />
  {#if task.ref}
  <svg id="delete-task" class="task-button" on:click={() => task.Delete()} viewBox="0 0 16 16">
    <path fill="currentColor" d="M6.5 1.75a.25.25 0 0 1 .25-.25h2.5a.25.25 0 0 1 .25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 1 0-1.492.15l.66 6.6A1.75 1.75 0 0 0 5.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 0 0-1.492-.149l-.66 6.6a.25.25 0 0 1-.249.225h-5.19a.25.25 0 0 1-.249-.225l-.66-6.6z"/>
  </svg>
  {:else}
  <svg id="add-task" class="task-button" on:click={() => addTask()} viewBox="0 0 16 16">
    <path fill="currentColor" d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69L5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5z"/>
    <path fill="currentColor" fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1.5 0a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0z"/>
  </svg>
  {/if}
</div>

<style>
  .error-message{
    color: red;
    font-size: small;
  }
  .task-form{
    height: 26px;
    width: 340px;
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    gap: 2px;
    align-items: center;
    padding: 6px 0;
  }
  .task-form:hover .task-button{
    display: block;
  }
  .task-button{
    display: none;
    width: 20px;
    height: 20px;
  }
  #delete-task:hover{
    color: red;
  }
  #add-task:hover{
    color: green;
  }
</style>