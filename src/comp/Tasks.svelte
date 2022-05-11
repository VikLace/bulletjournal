<script lang="ts">
  import Task from "./Task.svelte";
  import Event from "./Event.svelte";
  import { TaskType } from "./../types/task.type.enum";
  import Note from "./Note.svelte";
  import { tasks } from "./../stores/tasks";
import TaskTypeBox from "./TaskTypeBox.svelte";

  let newtasktype: TaskType = null;
  let newtasktext: string = null;
  const addTask = () => tasks.addTask(newtasktype, newtasktext);
</script>

<div id="tasks">
  {#if $tasks}
    <div>
      <form on:submit|preventDefault={addTask}>
        <TaskTypeBox bind:type={newtasktype} />
        <input type="text" bind:value={newtasktext} />
        <button>add</button>
      </form>
    </div>
  {/if}

  {#if $tasks && $tasks.length > 0}
    <ul>
      {#each $tasks as task}
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
</div>

<style>
  #tasks{
    padding: 50px;
  }
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
