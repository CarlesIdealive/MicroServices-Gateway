import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enums/order.enum";

export class StatusOrderDto {
    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Status must be one of the following: ${Object.values(OrderStatusList).join(', ')}`,
    })
    status: OrderStatus;
}