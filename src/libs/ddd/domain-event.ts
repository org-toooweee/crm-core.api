export abstract class DomainEvent {
  readonly aggregateId: string;
  readonly occurredAt: Date;

  protected constructor(aggregateId: string) {
    this.aggregateId = aggregateId;
    this.occurredAt = new Date();
  }
}
