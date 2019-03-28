/**
 * 更新Todo时不能指定createdAt
 *
 * @export
 */
export class UpdateTodoDto {

  title: string;

  description: string;

  isFinished: boolean;

  // createdAt: nunber;

  planToFinishAt: number;

  actuallyFinishedAt: number;
}
