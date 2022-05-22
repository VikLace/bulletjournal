<script lang="ts">
  import Task from "./Task.svelte";
  import { tasks } from "./../stores/tasks";
  import { TTask } from "./../types/task.cls";
  import { curr_filter } from "./../stores/curr_filter";

  let newtask: TTask = new TTask();  
</script>

{#if $tasks}
  <div id="task-form">
    <Task bind:task={newtask}/>
  </div>
  {#if $tasks.length > 0}
    {#each $tasks as task}
      {#if !$curr_filter || $curr_filter == task.type}
      <Task {task}/>
      {/if}
    {/each}
  {/if}
{:else}
  <p>no tasks found</p>
{/if}

<style>
  #task-form{
    position: sticky;
    top: 0;
  }
</style>