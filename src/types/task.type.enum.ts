export enum TaskType {
  Task = 1,
  Event = 2,
  Note = 3
}

// export function getTaskTypeName(value: TaskType): string {
//   let result =
//     value == TaskType.Task ? "Uzdevums" :
//     value == TaskType.Event ? "Notikums" :
//     value == TaskType.Note ? "Piezīme" :
//     "<nezinama vērtība>";
//   return result;
// }

export function getTaskTypeSVGPath(value: TaskType): string {
  switch (value) {
    case TaskType.Task: 
      return "M2.5 2.75a.25.25 0 0 1 .25-.25h10.5a.25.25 0 0 1 .25.25v10.5a.25.25 0 0 1-.25.25H2.75a.25.25 0 0 1-.25-.25V2.75zM2.75 1A1.75 1.75 0 0 0 1 2.75v10.5c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0 0 15 13.25V2.75A1.75 1.75 0 0 0 13.25 1H2.75zm9.03 5.28a.75.75 0 0 0-1.06-1.06L6.75 9.19L5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5z";
    case TaskType.Event: 
      return "M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5zM4 8a4 4 0 1 1 8 0a4 4 0 0 1-8 0z";
    case TaskType.Note: 
      return "M2 7.75A.75.75 0 0 1 2.75 7h10a.75.75 0 0 1 0 1.5h-10A.75.75 0 0 1 2 7.75z";
    default: 
      return "M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25c.09-.656.54-1.134 1.342-1.134c.686 0 1.314.343 1.314 1.168c0 .635-.374.927-.965 1.371c-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486c.609-.463 1.244-.977 1.244-2.056c0-1.511-1.276-2.241-2.673-2.241c-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927c.609 0 1.028-.394 1.028-.927c0-.552-.42-.94-1.029-.94c-.584 0-1.009.388-1.009.94z";
  }
}