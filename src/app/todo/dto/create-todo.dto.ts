
/**
 * 创建Todo时不能指定isFinished和actuallyFinishedAt
 *
 * @export
 */
export class CreateTodoDto {

  title: string;

  description: string;

  // isFinished: boolean;

  createdAt: string;

  planToFinishAt: number;

  // actuallyFinishedAt: number;

  parentId?: number;
}
