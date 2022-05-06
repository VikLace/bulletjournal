<script lang="ts">
  let days: Date[] = [];
  let date = new Date(new Date().setDate(1));

  function daysInMonth(m: number, y: number) {
    return m === 2
      ? y & 3 || (!(y % 25) && y & 15)
        ? 28
        : 29
      : 30 + ((m + (m >> 3)) & 1);
  }

  $: date, fillDates();

  const fillDates = () => {
    days = [];
    let month: number = date.getMonth();
    let year: number = date.getFullYear();
    let fd = (date.getDay() || 7) - 1;
    let c = daysInMonth(month + 1, year);
    for (let i = 0; i < c + fd; i++) {
      days[i] = i >= fd ? new Date(year, month, i - fd + 1) : null;
    }
  };
</script>

<div id="calendar">
  <div id="monthyear">
    <button
      on:click={() => {
        date = new Date(date.setMonth(date.getMonth() - 1));
      }}>&leftarrow;</button
    >
    <div>
      {date.toLocaleString("default", { month: "long" })}, {date.getFullYear()}
    </div>
    <button
      on:click={() => {
        date = new Date(date.setMonth(date.getMonth() + 1));
      }}>&rightarrow;</button
    >
  </div>
  <div id="days">
    {#each days as day}
      {#if day}
        <div class="day">{day.getDate()}</div>
      {:else}
        <div class="noday" />
      {/if}
    {/each}
  </div>
</div>

<style>
  #monthyear {
    display: flex;
    flex-direction: row;
  }
  #days {
    display: grid;
    width: 210px;
    grid-template-columns: repeat(7, 1fr);
  }
  .day {
    border: 1px solid black;
    height: 30px;
    width: 30px;
  }
</style>
