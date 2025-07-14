
import {AppDataSource} from "../../db";
import {EntityTarget, ObjectLiteral, Repository} from "typeorm";

export function getEntityRepository<T extends ObjectLiteral>(
    entity: EntityTarget<T>
): Repository<T> {
    return AppDataSource.getRepository(entity);
}
