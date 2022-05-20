<script lang="ts">
  import { month_tasks } from "./../stores/tasks_month";
  import { date, monthdate } from "./../stores/date";
  import { fullDays, today, daysInMonth } from './../utils/utils';
  import { getTaskTypeSVGPath } from "./../types/task.type.enum";

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
    <div class="weekday">{wd}</div>
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
          <div class="day-text">
            {day.getDate()}
          </div>
          {#if $month_tasks && $month_tasks.length > 0}
            <div class="agg-badges">
              {#each $month_tasks as mday, d}
                {#if mday && (d == day.getDate())}  
                  {#each mday as sum, t}
                    {#if sum}
                    <div class="agg-badge">
                      <svg viewBox="0 0 16 16">
                        <path fill="currentColor" d={getTaskTypeSVGPath(t)} />
                      </svg>
                      <div>{sum}</div>
                    </div>
                    {/if}
                  {/each}
                {/if}
              {/each}
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
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding-bottom: 20px;
  }
  #days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px 1px;
  }
  .weekday{
    color: rgb(70, 70, 70);
    text-align: center;
  }
  .day {
    --daysize: calc(20vw / 7);
    width: var(--daysize);
    height: var(--daysize);
    border: 1px solid rgb(70, 70, 70);
    user-select: none;
    font-size: calc(var(--daysize)/2);
    font-weight: bolder;
    text-align: right;
    transition-duration: 300ms;
  }
  .past{
    color: rgb(175, 175, 175);
  }
  .future{
    color: rgb(70, 70, 70);
  }
  .day-text{
    width: 70%;
    position: relative;
    left: 25%;
    top: 35%;
  }
  .agg-badges{
    top: -65%;
    left: 3%;
    height: 25%;
    width: 90%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .agg-badge{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 98%;
    margin: 1%;
    width: 48%;
    border: 1px solid rgb(70, 70, 70);
    border-radius: 3px;
    font-size: 40%;
  }
  .agg-badge svg{
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
