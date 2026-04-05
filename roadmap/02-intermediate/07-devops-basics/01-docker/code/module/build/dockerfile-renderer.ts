import type { DockerProjectSpec, DockerStage } from "../../shared/docker-types.js";

function renderStage(stage: DockerStage, index: number): string[] {
  const stageHeader = stage.name
    ? `FROM ${stage.baseImage} AS ${stage.name}`
    : `FROM ${stage.baseImage}${index > 0 ? ` AS stage_${index}` : ""}`;

  const lines = [stageHeader];

  if (stage.workdir) {
    lines.push(`WORKDIR ${stage.workdir}`);
  }

  for (const instruction of stage.copyInstructions) {
    lines.push(`COPY ${instruction}`);
  }

  for (const instruction of stage.runInstructions) {
    lines.push(`RUN ${instruction}`);
  }

  if (stage.env) {
    for (const [key, value] of Object.entries(stage.env)) {
      lines.push(`ENV ${key}=${value}`);
    }
  }

  if (stage.command) {
    const serializedCommand = stage.command.map((part) => `"${part}"`).join(", ");
    lines.push(`CMD [${serializedCommand}]`);
  }

  return lines;
}

export function renderDockerfile(spec: DockerProjectSpec): string {
  return spec.stages.flatMap((stage, index) => renderStage(stage, index).concat("")).join("\n").trim();
}
