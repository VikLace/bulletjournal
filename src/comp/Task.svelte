<script lang="ts">
import type { TTask } from "./../types/task.intf";


    export let task: TTask;
</script>

<li>
<input type="checkbox" checked={task.done} />
<input placeholder="What needs to be done?" value={task.text} />
</li>

<style>
    li{
        list-style-type: none;
    }
</style>