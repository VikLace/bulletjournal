<script lang="ts">
  import { date } from "./../stores/date";
  import { curr_filter } from "./../stores/curr_filter";
  import Calendar from "./../comp/Calendar.svelte";
  import Tasks from "./../comp/Tasks.svelte";
  import { TaskType, getTaskTypeSVGPath } from "./../types/task.type.enum";

  let tasks_visible: boolean = true;
</script>

<div id="planner">
  <div id="calendar" class:fullscreen={!tasks_visible}>
    <Calendar />
  </div>
  <div id="splitter">
    <button class:active={!tasks_visible} on:click={() => {tasks_visible = !tasks_visible}}>
      {#if tasks_visible}
      <svg viewBox="0 0 1024 1024">
        <rect x="0" y="0" width="1024" height="1024" fill="none" stroke="none" />
        <path fill="currentColor" d="m290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6l43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6L423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"/>
      </svg>
      {:else}
      <svg viewBox="0 0 1024 1024">
        <rect x="0" y="0" width="1024" height="1024" fill="none" stroke="none" />
        <path fill="currentColor" d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6L877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"/>
      </svg>
      {/if}
    </button>
    <button class:active={$curr_filter == TaskType.Event} on:click={() => {if ($curr_filter == TaskType.Event) $curr_filter = null; else $curr_filter = TaskType.Event}}>
      <svg viewBox="0 0 16 16">
        <path fill="currentColor" d={getTaskTypeSVGPath(TaskType.Event)} />
      </svg>
    </button>
    <button class:active={$curr_filter == TaskType.Task} on:click={() => {if ($curr_filter == TaskType.Task) $curr_filter = null; else $curr_filter = TaskType.Task}}>
      <svg viewBox="0 0 16 16">
        <path fill="currentColor" d={getTaskTypeSVGPath(TaskType.Task)} />
      </svg>
    </button>
    <button class:active={$curr_filter == TaskType.Note} on:click={() => {if ($curr_filter == TaskType.Note) $curr_filter = null; else $curr_filter = TaskType.Note}}>
      <svg viewBox="0 0 16 16">
        <path fill="currentColor" d={getTaskTypeSVGPath(TaskType.Note)} />
      </svg>
    </button>
  </div>
  {#if tasks_visible}
  <div id="tasks">
    {#if $date}
    <div id="change-day">
      <button on:click={() => date.addDay(-1)}>&leftarrow;</button>
      <div>
        {$date.getDate()}. {$date.toLocaleString("lv-lv", { month: "long" })}
      </div>
      <button on:click={() => date.addDay(1)}>&rightarrow;</button>
    </div>
    {/if}
    <Tasks />
  </div>
  {/if}
</div>

<style>
  #calendar{
    flex-grow: 1;
    background-color: bisque;
  }
  #splitter{
    min-width: 2%;
    margin: 0 5%;
    background-color: gainsboro;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #splitter button{
    width: 30px;
    margin-bottom: 10px;
  }
  #splitter button.active{
    border-color: cornflowerblue;
    background-color: rgb(138, 172, 236);
  }
  #tasks{
    min-width: 49%;
    background-color: khaki;
    overflow-y: scroll;
  }
  #planner {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 3% 10%;
    height: 100%;
    max-height: 84vh;
  }
  #planner>*{
    height: 100%;
  }
  #change-day {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 15px;
    position: sticky;
    top: 0;
  }
  #change-day button{
    margin: 0 20px;
  }
</style>
