<script lang="ts">
  import Task from "./Task.svelte";
  import { tasks } from "./../stores/tasks";
  import { TTask } from "./../types/task.cls";

  let newtask: TTask = new TTask();  
</script>

<div id="tasks">
  {#if $tasks}
    <Task bind:task={newtask}/>
    {#if $tasks.length > 0}
      {#each $tasks as task}
        <Task {task}/>
      {/each}
    {/if}
  {:else}
    <p>no tasks found</p>
  {/if}
</div>