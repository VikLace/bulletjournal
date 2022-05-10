<script>
import Calendar from "./../comp/Calendar.svelte";
import Tasks from "./../comp/Tasks.svelte";

</script>

<div id="planner">
<Calendar/>
<Tasks/>
</div>

<style>
  #planner{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>