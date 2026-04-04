class AuditRecord {
  constructor(public entityId: string) {}

  describe(): string {
    return `AuditRecord:${this.entityId}`;
  }
}

type AuditLogger = {
  prefix: string;
  buildMessage(record: AuditRecord): string;
};

function createAuditLogger(prefix: string): AuditLogger {
  return {
    prefix,
    buildMessage(record: AuditRecord): string {
      return `${this.prefix} ${record.describe()}`;
    },
  };
}

const record = new AuditRecord("ord_1001");
const logger = createAuditLogger("AUDIT");

console.log("Prototype method:", record.describe());
console.log("Composed logger:", logger.buildMessage(record));
console.log("Prototype chain check:", Object.getPrototypeOf(record) === AuditRecord.prototype);
