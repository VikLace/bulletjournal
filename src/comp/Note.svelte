<script lang="ts">
  import type { TTask } from "./../types/task.cls";
  export let note: TTask;
</script>

<input placeholder="Any notes?" value={note.text} />
