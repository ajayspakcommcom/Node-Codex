export async function publishCommand<TCommand extends object>(
  commandName: string,
  payload: TCommand,
): Promise<void> {
  void { commandName, payload };
}
