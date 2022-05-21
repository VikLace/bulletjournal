<script lang="ts">
  import { date } from "./../stores/date";
  import Calendar from "./../comp/Calendar.svelte";
  import Tasks from "./../comp/Tasks.svelte";

  let tasks_visible: boolean = true;
</script>

<div id="planner">
  <div id="calendar" class:fullscreen={!tasks_visible}>
    <Calendar />
  </div>
  <div id="splitter">
    <button on:click={()=>{tasks_visible = !tasks_visible}}>fs</button>
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
    width: 10%;
    background-color: gainsboro;
  }
  #tasks{
    width: 45%;
    background-color: khaki;
  }
  #planner {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 3%;
    height: 100%;
  }
  #planner>*{
    height: 100%;
  }
  #change-day {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 15px;
  }
  #change-day button{
    margin: 0 20px;
  }
</style>
