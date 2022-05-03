<script lang="ts">
    import type { TTask } from "./../types/task.intf";

    export let note: TTask;
</script>

<li>
    <input placeholder="Any notes?" value={note.text} />
</li>

<style>
    li {
        list-style: inside;
        list-style-type: "-";
        margin-left: 20px;
    }
</style>
