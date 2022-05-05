<script lang="ts">
import type { TTask } from "./../types/task.intf";


    export let event: TTask;

</script>

<input placeholder="Whats planned?" value={event.text} />