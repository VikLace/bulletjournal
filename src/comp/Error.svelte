<script>
  import { currentError } from "./../stores/error";
</script>

{#if $currentError}
<div id="error-message">
  <p>{$currentError}</p>
  <button on:click={() => $currentError = null}>x</button>
</div>
{/if}

<style>
  #error-message{
    background-color: rgba(255, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  #error-message p{
    color: red;
    font-size: small;
  }
  #error-message button{
    margin-left: 15px;
  }
</style>