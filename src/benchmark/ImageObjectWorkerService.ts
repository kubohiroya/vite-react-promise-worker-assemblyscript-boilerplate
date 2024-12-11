import { ImageObject } from "./ImageObject";
import {BaseWorkerMessageTypes, CreateRequest, GenericRequest, ProgressMonitor,
    TransferRequest, WorkerMessageTypeItem, WorkerService } from "./WorkerService";

export enum ImageObjectWorkerMessageTypeItem{
  applyAverageFilter = 3
};

export type ImageObjectWorkerMessageTypes = BaseWorkerMessageTypes | ImageObjectWorkerMessageTypeItem.applyAverageFilter;

export type CreateRequestMessagePayload = {
  width: number;
  height: number;
  buffer: ArrayBuffer;
};
export type GenericRequestMessagePayload = {id: number};
export type ApplyAverageFilterRequestMessagePayload = GenericRequestMessagePayload & {iteration: number};;
export type TransferResponseMessagePayload = {
    id: number;
    width: number;
    height: number;
    buffer: ArrayBuffer;
};

export type RequestMessagePayload = GenericRequestMessagePayload | ApplyAverageFilterRequestMessagePayload;
export type ResponseMessagePayload = {id: number};

export type RequestMessages = CreateRequest<CreateRequestMessagePayload>
    | GenericRequest<ImageObjectWorkerMessageTypeItem.applyAverageFilter, ApplyAverageFilterRequestMessagePayload>
    | TransferRequest<GenericRequestMessagePayload>;
export type ResponseMessages = {}


export abstract class ImageObjectWorkerService extends WorkerService<
    ImageObjectWorkerMessageTypes,
    CreateRequestMessagePayload,
    RequestMessagePayload,
    ResponseMessagePayload,
    ImageObject
> {

  public create(
      width: number,
      height: number,
      buffer: ArrayBuffer,
  ): Promise<number> {
    return this.sendCreateRequest(
        {
          width,
          height,
          buffer,
        });
  }

  public applyAverageFilter(
      id: number,
      iteration: number,
      progressMonitor: ProgressMonitor,
  ): Promise<ResponseMessagePayload> {
    return this.sendGenericRequest(
        ImageObjectWorkerMessageTypeItem.applyAverageFilter,
        {
          id,
          iteration,
        },
        progressMonitor,
    );
  }

  public delete(id: number): Promise<ResponseMessagePayload> {
    return this.sendGenericRequest(WorkerMessageTypeItem.delete, {
      id,
    });
  }

  public transfer(id: number): Promise<ImageObject> {
    return this.sendTransferRequest({
      id,
    });
  }

}
