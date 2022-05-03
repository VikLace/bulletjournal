<script lang="ts">
import type { TTask } from "./../types/task.intf";


    export let event: TTask;

</script>

<li>
<input placeholder="Whats planned?" value={event.text} />
</li>

<style>
    li{
        list-style: inside;
        list-style-type: circle;
        margin-left: 10px;
    }
</style>