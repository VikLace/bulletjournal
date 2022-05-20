<script>
  import { date } from "./../stores/date";
  import Calendar from "./../comp/Calendar.svelte";
  import Tasks from "./../comp/Tasks.svelte";
</script>

<div id="planner">
  <div id="calendar">
    <Calendar />
  </div>
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
</div>

<style>
  #calendar{
    padding: 50px;
  }
  #planner {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
  #change-day {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 20px;
  }
  #change-day button{
    margin: 0 20px;
  }
  #tasks{
    padding: 50px;
  }
</style>
