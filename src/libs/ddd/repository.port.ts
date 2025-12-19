export interface RepositoryPort<Entity> {
  create(entity: Entity): Promise<void>;
  findOneById(id: string): Promise<Entity | null>;
  findAll(): Promise<Entity[]>;
  update(entity: Partial<Entity>): Promise<void>;
  delete(id: string): Promise<boolean>;
}
