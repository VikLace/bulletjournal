<script lang="ts">
  import { TaskType, getTaskTypeSVGPath } from "./../types/task.type.enum";

  export let type: TaskType = null;
</script>

<div id="tasktype_choice">
  <div id="kebab_wrap">
    <div id="kebab">
      <svg id="kebab_svg" viewBox="0 0 16 16">
        <g transform="rotate(90 8 8)">
          <path fill="currentColor" d="M8 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3zM1.5 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3zm13 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3z"/>
        </g>
      </svg>
      <div id="kebab-popup">
        <svg on:click={() => (type = TaskType.Event)} viewBox="0 0 16 16">
          <path fill="currentColor" d={getTaskTypeSVGPath(TaskType.Event)} />
        </svg>
        <svg on:click={() => (type = TaskType.Task)} viewBox="0 0 16 16">
          <path fill="currentColor" d={getTaskTypeSVGPath(TaskType.Task)} />
        </svg>
        <svg on:click={() => (type = TaskType.Note)} viewBox="0 0 16 16">
          <path fill="currentColor" d={getTaskTypeSVGPath(TaskType.Note)} />
        </svg>
      </div>
    </div>
  </div>
  {#if type}
    <svg viewBox="0 0 16 16">
      <path fill="currentColor" d={getTaskTypeSVGPath(type)} />
    </svg>
  {/if}
</div>

<style>
  #tasktype_choice{
    border: 1px solid black;
    border-radius: 3px;
    width: 24px;
    height: 24px;
  }
  #tasktype_choice:hover #kebab{
    display: block;
  }
  #kebab_wrap{
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
  #kebab_svg{
    color: blueviolet;
    position:absolute;
    left:10%; 
    top:10%; 
    width:80%; 
    height:80%;
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
</style>
