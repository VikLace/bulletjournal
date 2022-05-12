<script lang="ts">
  import { currentError } from "./../stores/error";
  import { tasks } from "./../stores/tasks";
  import { TTask } from "./../types/task.cls";
  import { TaskType, getTaskTypeSVGPath } from "./../types/task.type.enum";

  const addTask = () => {
    if (task.type && task.text)
    {
      $currentError = null;
      tasks.addTask(task.type, task.text);
      task = new TTask();
    }
    else
      $currentError = "Nav aizpildīti visi obligātie lauki!";
  }

  const updateTask = () => {
    if(task.ref)
    {
      if (task.type && task.text)
      {
        $currentError = null;
        task.Update();
      }
      else
        $currentError = "Nav aizpildīti visi obligātie lauki!";
    }
  }

  export let task: TTask = null;
</script>

<div class="task-form">
  <div id="tasktype_choice">
    <div class="relative-wrap">
      <div id="kebab">
        <svg class="svg_80" id="kebab_svg" viewBox="0 0 16 16">
          <g transform="rotate(90 8 8)">
            <path fill="currentColor" d="M8 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3zM1.5 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3zm13 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3z"/>
          </g>
        </svg>
        <div id="kebab-popup">
          <svg on:click={() => {task.type = TaskType.Event; updateTask()}} viewBox="0 0 16 16">
            <path fill="currentColor" d={getTaskTypeSVGPath(TaskType.Event)} />
          </svg>
          <svg on:click={() => {task.type = TaskType.Task; updateTask()}} viewBox="0 0 16 16">
            <path fill="currentColor" d={getTaskTypeSVGPath(TaskType.Task)} />
          </svg>
          <svg on:click={() => {task.type = TaskType.Note; updateTask()}} viewBox="0 0 16 16">
            <path fill="currentColor" d={getTaskTypeSVGPath(TaskType.Note)} />
          </svg>
        </div>
      </div>
    </div>
    <div id="chosen-type-wrap" class="relative-wrap">
      {#if task && task.type == TaskType.Task}
      <input id="done-check" type="checkbox" bind:checked={task.done} on:change={() => updateTask()} />
      {:else}
      <svg class="svg_80" class:no-value={!task.ref} viewBox="0 0 16 16">
        <path fill="currentColor" d={getTaskTypeSVGPath(task.type)} />
      </svg>
      {/if}
    </div>
  </div>
  <input placeholder="Ievadiet uzdevuma/notikuma/piezīmju tekstu" class="task-text-input" class:strikeout={task.done} 
    type="text" bind:value={task.text} on:change={() => updateTask()}
  />
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
  .strikeout{
    text-decoration: line-through;
    font-style: italic;
  }
  #tasktype_choice{
    border: 1px solid black;
    border-radius: 3px;
    width: 24px;
    height: 24px;
  }
  #tasktype_choice:hover #kebab{
    display: block;
  }
  .relative-wrap{
    position: relative;
  }
  #kebab{
    display: none;
    height: 14px;
    width: 14px;
    position: absolute;
    border: 1px solid blueviolet;
    border-radius: 7px;
    left: -10px;
    top: -10px;
    background-color: white;
  }
  #kebab:hover{
    background-color: lightblue;
  }
  .svg_80{
    position:absolute;
    left:10%; 
    top:10%; 
    width:80%; 
    height:80%;
  }
  #kebab_svg{
    color: blueviolet; 
  }
  #kebab:hover #kebab-popup{
    display: flex;
  }
  #kebab-popup{
    position: absolute;
    height: 60px;
    width: 20px;
    left: -27px;
    top: -27px;
    border: 1px solid blueviolet;
    border-radius: 5px;
    display: none;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  #kebab-popup::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent blueviolet;
  }
  #kebab-popup svg:hover{
    background-color: lightblue;
  }
  #chosen-type-wrap{
    height: 100%;
    width: 100%;
  }
  .no-value{
    color: gray;
  }
  #done-check{
    width: 18px;
    height: 18px;
  }
</style>