import { writable } from "svelte/store";

export const currentError = writable<string>(null);