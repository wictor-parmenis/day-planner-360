import { DeleteResult, getRepository, Repository } from 'typeorm';
import { Task } from '../entities/Task';
import { ITasksRepository } from './ITasksRepository';
import { ICreateTaskRepositoryDTO } from '../useCases/createTask/ICreateTaskDTO';
import { IListTasksByIntervalDTO } from '../useCases/listTasksByInterval/IListTasksByIntervalDTO';
import { IUpdateTaskRepositoryDTO } from '../useCases/updateTask/IUpdateTaskDTO';
import { Tag } from '@modules/tags/entities/Tag';

export class TasksRepository implements ITasksRepository {
  private repository: Repository<Task>;
  private tagsRepository: Repository<Tag>;

  constructor() {
    this.repository = getRepository(Task);
    this.tagsRepository = getRepository(Tag);
  }

  async listByTitlePart(title_part: string): Promise<Task[] | undefined> {
    return this.repository
      .createQueryBuilder('tasks')
      .leftJoinAndSelect('tasks.tags', 'tags')
      .where('tasks.title LIKE :text', { text: `%${title_part}%` })
      .getMany();
  }

  async findByExecutionDate(date_execution: string): Promise<Task | undefined> {
    return this.repository.findOne({
      where: {
        date_execution,
      },
    });
  }

  async findById(task_id: string): Promise<Task | undefined> {
    return this.repository.findOne(task_id, {
      relations: ['tags'],
    });
  }

  async create({
    date_execution,
    description,
    estimated_duration,
    title,
    tags,
  }: ICreateTaskRepositoryDTO): Promise<Task> {
    const task = this.repository.create({
      date_execution,
      description,
      estimated_duration,
      title,
    });

    Object.assign(task, { tags });

    return this.repository.save(task);
  }

  async updateById({
    date_execution,
    description,
    estimated_duration,
    tags_ids,
    task_id,
  }: IUpdateTaskRepositoryDTO): Promise<Task> {
    const taskFound = await this.repository.findOne(task_id);
    const tags = await this.tagsRepository.findByIds(tags_ids);
    taskFound.tags = tags;

    Object.assign(taskFound, {
      date_execution,
      description,
      estimated_duration,
      tags,
    });

    return this.repository.save(taskFound);
  }

  async deleteTaskById(task_id: string): Promise<DeleteResult> {
    return this.repository.delete(task_id);
  }

  async listTasksByInterval({
    initial_date,
    final_date,
  }: IListTasksByIntervalDTO): Promise<Task[]> {
    return this.repository
      .createQueryBuilder('tasks')
      .leftJoinAndSelect('tasks.tags', 'tags')
      .where('tasks.date_execution >= :initial_date', { initial_date })
      .andWhere('tasks.date_execution <= :final_date', { final_date })
      .getMany();
  }

  async findByTags(tags_ids: string[]): Promise<Task[] | undefined> {
    return this.repository
      .createQueryBuilder('tasks')
      .innerJoinAndSelect('tasks.tags', 'tag', 'tag.id IN (:...tags_ids)', {
        tags_ids,
      })
      .getMany();
  }
}
