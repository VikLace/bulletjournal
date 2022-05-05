<script lang="ts">
    import type { TTask } from "./../types/task.cls";
    
    export let task: TTask;
</script>

<input type="checkbox" checked={task.done} />
<input placeholder="What needs to be done?" value={task.text} />