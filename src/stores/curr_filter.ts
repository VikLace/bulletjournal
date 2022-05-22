import type { TaskType } from "./../types/task.type.enum";
import { writable } from "svelte/store";

export const curr_filter = writable<TaskType>(null);