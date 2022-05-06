<script lang="ts">
  import Tasks from "./../comp/Tasks.svelte";
  import Collections from "./../comp/Collections.svelte";
  import Auth from "./../comp/Auth.svelte";
  import { fbuser } from "./../stores/fbuser";
</script>

{#if $fbuser}
  <h1>Welcome to Your bullet journal, {$fbuser.displayName}!</h1>
  <Tasks />
  <Collections />
{:else}
  <h1>Welcome to bullet journal</h1>
{/if}
<Auth />