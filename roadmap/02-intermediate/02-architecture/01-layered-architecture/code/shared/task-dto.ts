export interface TaskDto {
  readonly id: string;
  readonly title: string;
  readonly status: "todo" | "done";
  readonly createdAt: string;
}
