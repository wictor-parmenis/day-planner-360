import { ICreateTaskRepositoryDTO } from '@modules/tasks/useCases/createTask/ICreateTaskDTO';

import { ITasksRepository } from '../ITasksRepository';
import { Task } from '@modules/tasks/entities/Task';
import { DeleteResult } from 'typeorm';
import { Tag } from '@modules/tags/entities/Tag';
import { IListTasksByIntervalDTO } from '@modules/tasks/useCases/listTasksByInterval/IListTasksByIntervalDTO';
import { IUpdateTaskRepositoryDTO } from '@modules/tasks/useCases/updateTask/IUpdateTaskDTO';
import dayjs from 'dayjs';

interface TaskTag {
  taskId: string;
  tagId: string;
}

export class InMemoryTasksRepository implements ITasksRepository {
  private tasks: Task[] = [];
  private tags: Tag[] = [];
  private taskTags: TaskTag[] = [];

  async create(data: ICreateTaskRepositoryDTO): Promise<Task> {
    const task = new Task();
    Object.assign(task, data);

    this.tasks.push(task);

    if (task.tags && task.tags.length) {
      task.tags.forEach((tag) => {
        this.taskTags.push({
          taskId: task.id,
          tagId: tag.id,
        });
      });
    }

    return task;
  }

  async findById(task_id: string): Promise<Task> {
    const taskFound = this.tasks.find((task) => task.id === task_id);
    return taskFound;
  }

  async findByExecutionDate(date_execution: string): Promise<Task> {
    const taskFound = this.tasks.find(
      (task) => task.date_execution === date_execution
    );
    return taskFound;
  }

  async listByTitlePart(titlePart: string): Promise<Task[]> {
    const taskFound = this.tasks.filter((task) =>
      task.title.includes(titlePart)
    );
    return taskFound;
  }

  async deleteTaskById(task_id: string): Promise<DeleteResult> {
    const tasksFiltered = this.tasks.filter((task) => task.id !== task_id);
    this.tasks = tasksFiltered;

    return {
      raw: {},
      affected: 1,
    };
  }

  async listTasksByInterval({
    initial_date,
    final_date,
  }: IListTasksByIntervalDTO): Promise<Task[]> {
    console.log('tasks listTasksByInterval', this.tasks);
    const initialDate = dayjs(initial_date);
    const finalDate = dayjs(final_date);

    const foundListTasks = this.tasks.filter((task) => {
      const executionDateTask = dayjs(task.date_execution);

      console.log({
        finalDate,
        initialDate,
        executionDateTask,
      });

      return (
        executionDateTask.isBefore(finalDate) &&
        executionDateTask.isAfter(initialDate)
      );
    });

    console.log('foundListTasks', foundListTasks);

    await Promise.all(
      foundListTasks.map(async (task) => {
        const tasksTagsOfTasks = this.taskTags.filter(
          (taskTag) => taskTag.taskId === task.id
        );

        const tasksTagsIdsOfTasks = tasksTagsOfTasks.map(
          (taskTagId) => taskTagId.tagId
        );

        const tagsOftask = this.tags.filter((tag) =>
          tasksTagsIdsOfTasks.includes(tag.id)
        );

        Object.assign(task, { tags: tagsOftask });
      })
    );

    return foundListTasks;
  }

  async findByTags(tags_ids: string[]): Promise<Task[] | undefined> {
    const filteredTaskTags = this.taskTags.filter((tasktag) => {
      return tags_ids.includes(tasktag.tagId);
    });

    const tasksFiltered: Task[] = [];
    filteredTaskTags.forEach(async (item) => {
      const task = await this.findById(item.taskId);
      tasksFiltered.push(task);
    });
    return tasksFiltered;
  }

  async updateById({
    date_execution,
    description,
    estimated_duration,
    tags_ids,
    task_id,
  }: IUpdateTaskRepositoryDTO): Promise<Task> {
    const taskFound = await this.findById(task_id);
    const tags = this.tags.filter((tag) => tags_ids.includes(tag.id));
    taskFound.tags = tags;

    Object.assign(taskFound, {
      date_execution,
      description,
      estimated_duration,
      tags,
    });

    this.tasks.filter((item) => item.id !== task_id);
    this.tasks.push(taskFound);
    return taskFound;
  }
}
