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
    <div class="weekday">
      <div class="weekday-text">{wd}</div>
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
          {#if $month_tasks && $month_tasks.length > 0}
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
          {/if}
          <div class="day-text">
            {day.getDate()}
          </div>
        </div>
      {:else}
        <div class="noday" />
      {/if}
    {/each}
  </div>
{/if}

<style>
  #monthyear {
    height: 22px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  #monthyear button{
    margin: 0 20px;
  }
  #days {
    width: var(--cal-size);
    height: var(--cal-size);
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    gap: 1px;
    color: rgb(70, 70, 70);
    border-color: rgb(70, 70, 70);
  }
  .weekday{
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .weekday-text{
    margin-bottom: 10%;
  }
  .day {
    border-width: 1px;
    border-style: solid;
    user-select: none;
    font-size: calc(var(--cal-size) / 16);
    font-weight: bolder;
    text-align: right;
    transition-duration: 300ms;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 2fr;
    gap: 1px;
    padding: 1px;
  }
  .past{
    color: rgb(175, 175, 175);
    border-color: rgb(175, 175, 175);
  }
  .day-text{
    line-height: 100%;
    padding-right: 3%;
    grid-column: 1/3;
    grid-row: 3;
  }
  .agg-badge{
    height: calc(var(--cal-size) * 0.03); /*seems to be no other way around grid stretching...*/
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
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
