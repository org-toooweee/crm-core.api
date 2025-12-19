import { Entity } from '@libs/ddd/entity';
import { DomainEvent } from '@libs/ddd/domain-event';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent) {
    this._domainEvents.push(domainEvent);
  }

  clearEvents() {
    this._domainEvents = [];
  }
}
