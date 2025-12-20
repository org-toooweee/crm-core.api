export interface RepositoryPort<Entity> {
  insert(entity: Entity): Promise<void>;
  findById(id: string): Promise<Entity | null>;
  findAll(): Promise<Entity>;
  delete(id: string): Promise<boolean>;
}
