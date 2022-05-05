<script lang="ts">
    import type { TTask } from "./../types/task.intf";

    export let note: TTask;
</script>

<input placeholder="Any notes?" value={note.text} />
