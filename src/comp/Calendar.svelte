<script lang="ts">
  import { date } from "./../stores/date";

  let days: Date[] = [];

  function daysInMonth(m: number, y: number) {
    return m === 2
      ? y & 3 || (!(y % 25) && y & 15)
        ? 28
        : 29
      : 30 + ((m + (m >> 3)) & 1);
  }

  $: $date, fillDates();

  const fillDates = () => {
    days = [];
    if ($date)
    {
      let month: number = $date.getMonth();
      let year: number = $date.getFullYear();
      let fd = ((new Date(year, month, 1)).getDay() || 7) - 1;
      let c = daysInMonth(month + 1, year);
      for (let i = 0; i < c + fd; i++) {
        days[i] = i >= fd ? new Date(year, month, i - fd + 1) : null;
      }
    }
  };
</script>

{#if $date}
<div id="calendar">
  <div id="monthyear">
    <button on:click={() => date.addMonth(-1)}>&leftarrow;</button>
    <div>
      {$date.toLocaleString("default", { month: "long" })}, {$date.getFullYear()}
    </div>
    <button on:click={() => date.addMonth(1)}>&rightarrow;</button>
  </div>
  <div id="days">
    {#each days as day}
      {#if day}
        <div class="day" class:selected={day.getDate() == $date.getDate()} class:today={day.getDate() == new Date().getDate()} on:click={() => $date = day}>
          {day.getDate()}
        </div>
      {:else}
        <div class="noday" />
      {/if}
    {/each}
  </div>
</div>
{/if}

<style>
  #monthyear {
    display: flex;
    flex-direction: row;
  }
  #days {
    display: grid;
    width: 210px;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px 1px;
  }
  .day {
    border: 1px solid black;
    height: 30px;
    width: 30px;
    user-select: none;
    text-align: center;
    line-height: 30px;
    color:rgb(100, 100, 100);
    font-size: large;
  }
  .selected{
    border-color: blueviolet;
    background-color: rgb(138, 43, 226, 0.1);
  }
  .day:hover{
    border-color: blueviolet;
    background-color: rgb(138, 43, 226, 0.2);
  }
  .today{
    font-weight: bolder;
    color:brown;
    border-color: brown;
  }
</style>
