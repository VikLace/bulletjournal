<script lang="ts">
  import { month_tasks, month_tasks_count } from "./../stores/tasks_month";
  import { date, monthdate } from "./../stores/date";
  import { fullDays, today, daysInMonth } from './../utils/utils';

  let days: Date[] = [];

  $: $monthdate, fillDates();

  const fillDates = () => {
    days = [];
    if ($monthdate) {
      let month: number = $monthdate.getMonth();
      let year: number = $monthdate.getFullYear();
      let fd = (new Date(Date.UTC(year, month, 1)).getDay() || 7) - 1;
      let c = daysInMonth(month + 1, year);
      for (let i = 0; i < c + fd; i++) {
        days[i] = i >= fd ? new Date(Date.UTC(year, month, i - fd + 1)) : null;
      }
    }
  };
</script>

{#if $date}
  <div id="monthyear">
    <button on:click={() => date.addMonth(-1)}>&leftarrow;</button>
    <div>
      {$date.toLocaleString("lv-lv", { month: "long" })}, {$date.getFullYear()}
    </div>
    <button on:click={() => date.addMonth(1)}>&rightarrow;</button>
  </div>
  <div id="days">
    {#each ["P","O","T","C","P","S","Sv"] as wd}
    <div class="weekday">
      <svg class="weekday-text" viewBox="0 0 20 13">
        <text fill="currentColor" text-anchor="middle" x="50%" y="12">{wd}</text>
      </svg>
    </div>
    {/each}
    {#each days as day}
      {#if day}
        <div
          class="day"
          class:selected={fullDays(day) === fullDays($date)}
          class:today={fullDays(day) === fullDays(today())}
          class:past={fullDays(day) < fullDays(today())}
          class:future={fullDays(day) > fullDays(today())}
          on:click={() => $date = day}
        >
          <svg class="day-text" viewBox="0 0 20 13">
            <text fill="currentColor" text-anchor="end" x="100%" y="12">{day.getDate()}</text>
          </svg>
          {#if $month_tasks_count && $month_tasks_count.has(day.getDate())}
          <div class="agg-badge">
            <svg class="badge-text" viewBox="0 0 20 13">
              <text fill="currentColor" text-anchor="middle" x="50%" y="12">{$month_tasks_count.get(day.getDate())}</text>
            </svg>
          </div>
          {/if}
        </div>
      {:else}
        <div class="noday" />
      {/if}
    {/each}
  </div>
{/if}

<style>
  #monthyear {
    box-sizing: border-box;
    height: 25px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  #monthyear button{
    margin: 0 20px;
  }
  #days {
    aspect-ratio: 1 / 1;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    gap: 2px;
    color: rgb(70, 70, 70);
    border-color: rgb(70, 70, 70);
  }
  .weekday{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .weekday-text{
    width: 50%;
  }
  .day {
    position: relative;
    aspect-ratio: 1 / 1;
    border-width: 1px;
    border-style: solid;
    user-select: none;
    transition-duration: 300ms;
  }
  .past{
    color: rgb(175, 175, 175);
    border-color: rgb(175, 175, 175);
  }
  .day-text{
    height: 50%;
    font-weight: bolder;
    position: absolute;
    right: 5%;
    bottom: 5%;
  }
  .agg-badge{
    top: 5%;
    left: 5%;
    position: absolute;
    width: 35%;
    height: 35%;
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-radius: 50%;
    user-select: none;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .badge-text{
    height: 80%;
  }
  .selected {
    border-color: blueviolet;
    color: blueviolet;
    background-color: rgb(138, 43, 226, 0.1);
  }
  .day:hover {
    border-color: blueviolet;
    color: blueviolet;
    background-color: rgb(138, 43, 226, 0.2);
  }
  .today {
    color: brown;
    border-color: brown;
  }
</style>
